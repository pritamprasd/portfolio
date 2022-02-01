import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { addNewCodeFile } from './db'; 
import { FileList } from './filelist.jsx'

export const Editor = () => {
    const divEl = useRef(null);
    const [filename, setFilename] = useState('')
    const [editorInstance, setEditorInstance] = useState({})
    const [code, setCode] = useState(localStorage.getItem('code'))
    let editor = null;
    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: code,
                language: 'python'
            });
            
            editor.onKeyDown(() => {
                const code_local = editor.getValue()
                console.log("Val: " + code_local)
                setCode(code_local)
                localStorage.setItem('code', code_local)
            })
            setEditorInstance(editor);
        }
        return () => {
            editor.dispose();
        };
    }, []);

    function saveCodeFile(){
        addNewCodeFile(filename, code);
    }
    function updateCode(){
        setCode(localStorage.getItem('code'));
        editorInstance.setValue(localStorage.getItem('code'));
    }
    return (
        <div>
            <div className="Editor" ref={divEl}> </div>
            <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)}></input>
            <button onClick={saveCodeFile}>Save</button>
            <FileList updateCode={updateCode}/>
        </div>
    );
};