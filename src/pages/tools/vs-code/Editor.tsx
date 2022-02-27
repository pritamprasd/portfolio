import React, { useRef, useEffect, useState } from 'react';
import { languages, themes } from './utils';
import * as monaco from 'monaco-editor';
import { Code, Divider, Grid, Select, Space, Text } from '@mantine/core';
import FileManager from '../../../components/FileManager';
import { forceUpdateCodeEditorContent, updateCodeEditorContent, updateEditorLag } from './vsEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { styles } from '../../../storage/data';
import { detectLanguage } from '../../../commons/utils';

export const Editor = () => {
    const divEl = useRef<HTMLDivElement>(null);
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
                updateEditorCode(editor.getValue());
            })
            editor.onDidPaste((e) =>{
                updateEditorCode(editor.getValue());
                dispatch(updateEditorLag(detectLanguage(editor.getValue())))
            })
            setEditorInstance(editor);
        }
        return () => {
            editor.dispose();
        };
    }, [editorLang, editorTheme]);
    function onLangChange(e:any) {
        dispatch(updateEditorLag(e.target.value))
    }
    function onThemeChange(e:any) {
        setEditorTheme(e.target.value);
    }
    function updateEditorCode(code_local: string) {
        dispatch(updateCodeEditorContent(code_local));
        localStorage.setItem('code', code_local);
    }
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', 
                        justifyContent: 'flex-start', alignItems: 'center', paddingBottom: '1rem',
                        paddingRight: '1rem'}}>
                <Select onClick={onLangChange} label="Editor Language" data={languages.map(l => {
                    return {
                        label: l,
                        value: l
                    }
                })} value={editorLang} onChange={e => dispatch(updateEditorLag(e || ''))}
                />
                <Select onClick={onThemeChange} label="Editor Theme" data={themes.map(l => {
                    return {
                        label: l,
                        value: l
                    }
                })} value={editorLang} onChange={e => setEditorTheme(e || '')}
                style={{padding: '0.5rem'}}
                />
                <Text style={{marginLeft: 'auto', marginRight: '0'}}>Detected Language:     
                    <Code key={editorInstance?.getModel()?.getLanguageId()} 
                        style={{backgroundColor: styles.primary_error}}>
                        {editorInstance?.getModel()?.getLanguageId()}
                    </Code>
                </Text>
            </div>
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
