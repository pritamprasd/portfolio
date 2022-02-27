import React, { useRef, useEffect, useState } from 'react';
import { addNewCodeFile, languages, themes } from './utils';
import * as monaco from 'monaco-editor';
import { Divider, Grid, Text } from '@mantine/core';
import FileManager from '../../../components/FileManager';
import { forceUpdateCodeEditorContent, updateCodeEditorContent, updateEditorLag } from './vsEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const Editor = () => {
    const divEl = useRef<HTMLDivElement>(null);
    const [filename, setFilename] = useState<string>('')
    // const [editorLang, setEditorLang] = useState(languages[0])
    const editorLang = useSelector((state: RootState) => state.vseditor.editorLang);
    const [editorTheme, setEditorTheme] = useState(themes[1])
    const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor>();
    const contentFromStore = useSelector((state: RootState) => state.vseditor.content);
    const forceUpdate = useSelector((state: RootState) => state.vseditor.forceUpdate);
    const dispatch = useDispatch();

    useEffect(() => {
       if(editorInstance !== null){
           editorInstance?.setValue(contentFromStore);
       }
    }, [forceUpdate]);
    
    let editor:monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: contentFromStore,
                language: editorLang,
                theme: editorTheme,
                scrollBeyondLastLine: false,
            });
            editor.onKeyDown(() => {
                const code_local = editor.getValue()
                dispatch(updateCodeEditorContent(code_local));
                localStorage.setItem('code', code_local)
            })
            setEditorInstance(editor);
        }
        return () => {
            editor.dispose();
        };
    }, [editorLang, editorTheme]);

    function saveCodeFile() {
        console.log(`saving code file: ${contentFromStore}`)
        addNewCodeFile(filename, contentFromStore);
    }
    function updateCode() {
        dispatch(updateCodeEditorContent(localStorage.getItem('code') || ''));
        editorInstance?.setValue(localStorage.getItem('code') || '');
    }
    function onLangChange(e:any) {
        dispatch(updateEditorLag(e.target.value))
    }
    function onThemeChange(e:any) {
        setEditorTheme(e.target.value);
    }
    
    return (
        <div>
            <select onClick={onLangChange}>
                {languages.map(l => <option value={l}>{l}</option>)}
            </select>
            <select onClick={onThemeChange}>
                <option value=''>Update Theme</option>
                {themes.map(l => <option value={l}>{l}</option>)}
            </select>
            <Text>Language: {JSON.stringify(editorInstance?.getModel()?.getLanguageId())}</Text>
            <Divider style={{padding: '1rem'}}/>
             <Grid style={{width: '100%', height: '100%'}}>
                <Grid.Col sm={8} span={12}>
                    <div className="Editor" ref={divEl} style={{width: '100%', height: '70vh'}}/>
                </Grid.Col>
                <Grid.Col sm={4} span={12}>
                    <FileManager tableName='vscodeFiles' 
                                 updateEditorContent={forceUpdateCodeEditorContent}
                                 content={contentFromStore}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};