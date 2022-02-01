import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { addNewCodeFile } from './db';
import { FileList } from './filelist'
import { languages, themes } from './const';

export const Editor = () => {
    const divEl = useRef(null);
    const [filename, setFilename] = useState('')
    const [editorLang, setEditorLang] = useState(languages[0])
    const [editorTheme, setEditorTheme] = useState(themes[1])
    const [editorInstance, setEditorInstance] = useState({})
    const [code, setCode] = useState(localStorage.getItem('code'))
    let editor = null;
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
        setCode(localStorage.getItem('code'));
        editorInstance.setValue(localStorage.getItem('code'));
    }
    function onLangChange(e) {
        setEditorLang(e.target.value);
    }
    function onThemeChange(e) {
        setEditorTheme(e.target.value);
    }
    
    return (
        <div>
            <div className="Editor" ref={divEl}> </div>
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