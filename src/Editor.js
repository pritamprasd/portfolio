import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';

// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: function(_moduleId, label) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};

export const Editor = () => {
    const divEl = useRef(null);
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
                console.log("Val: "+ code_local)
                setCode(code_local)
                localStorage.setItem('code', code_local)
            })
        }
        return () => {
            editor.dispose();
        };
    }, []);
    return (
        <div className = "Editor" ref={divEl}> </div>
    );
};