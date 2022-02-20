import React, { useRef, useEffect, useState } from 'react';
import { addNewCodeFile, languages, themes } from './utils';
import { FileList } from './filelist';
import * as monaco from 'monaco-editor';

export const Editor = () => {
    const divEl = useRef<HTMLDivElement>(null);
    const [filename, setFilename] = useState<string>('')
    const [editorLang, setEditorLang] = useState(languages[0])
    const [editorTheme, setEditorTheme] = useState(themes[1])
    const [editorInstance, setEditorInstance] = useState<any>(null)
    const [code, setCode] = useState<string>(localStorage.getItem('code') || '')
    
    let editor:monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        if (divEl.current) {
            console.log('Reruning... effect')
            editor = monaco.editor.create(divEl.current, {
                value: code,
                language: editorLang,
                theme: editorTheme
            });
            editor.onKeyDown(() => {
                const code_local = editor.getValue()
                setCode(code_local)
                localStorage.setItem('code', code_local)
            })
            setEditorInstance(editor);
        }
        return () => {
            editor.dispose();
        };
    }, [editorLang, editorTheme]);

    function saveCodeFile() {
        addNewCodeFile(filename, code);
    }
    function updateCode() {
        setCode(localStorage.getItem('code') || '');
        editorInstance.setValue(localStorage.getItem('code'));
    }
    function onLangChange(e:any) {
        setEditorLang(e.target.value);
    }
    function onThemeChange(e:any) {
        setEditorTheme(e.target.value);
    }
    
    return (
        <div>
            <div className="Editor" ref={divEl} style={{width: '100%', height: '70vh'}}/>
            <select onClick={onLangChange}>
                {languages.map(l => <option value={l}>{l}</option>)}
            </select>
            <select onClick={onThemeChange}>
                <option value=''>Update Theme</option>
                {themes.map(l => <option value={l}>{l}</option>)}
            </select>
            <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)}></input>
            <button onClick={saveCodeFile}>Save</button>
            <FileList updateCode={updateCode} />
        </div>
    );
};