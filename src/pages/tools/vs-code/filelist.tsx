import React, { useRef, useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import './filelist.css';
import { db } from './db';

interface IFileListProps{
    updateCode: Function
}

export const FileList = (props: IFileListProps) => {
    const[rerender, setRerender] = useState(Date.now())
    const allcode = useLiveQuery(
        () => db.table("vscodeFiles").toArray()
    );
    return (
        <div>
            {allcode && allcode.map(
                code => <FileNameTime 
                        reRenderList={setRerender} 
                        id={code.id} codeInfo={code} key={code.name} 
                        updateCode={props.updateCode}
                    />
                )}
        </div>
    );
}

interface IFileNameProps{
    reRenderList: Function;
    id: number;
    codeInfo: any;
    updateCode: Function;
}

const FileNameTime = (props: IFileNameProps) =>{
    function emitCodeUpdateEvent(){
        localStorage.setItem('code', props.codeInfo.content)
        props.updateCode();
    }
    function deleteCode(){        
        db.table("vscodeFiles").delete(props.id);
        props.reRenderList(Date.now())
    }
    return(
        <div className='filetile'>
            <div onClick={emitCodeUpdateEvent}>{props.codeInfo.name}</div>
            <button className='delete-button' onClick={deleteCode}>X</button>
        </div>
    );
}