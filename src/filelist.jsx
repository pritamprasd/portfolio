import React, { useRef, useEffect, useState } from 'react';
import { getAllCode, db } from './db'
import { useLiveQuery } from 'dexie-react-hooks';
import './filelist.css';


export const FileList = (props) => {
    const[rerender, setRerender] = useState(Date.now())
    const allcode = useLiveQuery(
        () => db.files.toArray()
    );
    return (
        <div>
            {allcode && allcode.map(code => <FileNameTime reRenderList={setRerender} id={code.id} codeInfo={code} key={code.name} updateCode={props.updateCode}></FileNameTime>)}
        </div>
    );
}

const FileNameTime = (props) =>{
    function emitCodeUpdateEvent(){
        localStorage.setItem('code', props.codeInfo.content)
        props.updateCode();
    }
    function deleteCode(){
        db.files.delete(props.id)
        props.reRenderList(Date.now())
    }
    return(
        <div className='filetile'>
            <div onClick={emitCodeUpdateEvent}>{props.codeInfo.name}</div>
            <button className='delete-button' onClick={deleteCode}>X</button>
        </div>
    );
}