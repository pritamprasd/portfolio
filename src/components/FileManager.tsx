import React, { useEffect, useState } from 'react';
import { db, ICommonFileData } from '../storage/index-db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { styles } from '../storage/data';
import { Button, TextInput } from '@mantine/core';
import { RootState } from '../store/store';

interface IFileManagerProps {
    tableName: string;
    updateEditorContent: Function;
    content: string;
}

function FileManager(p: IFileManagerProps) {
    const [filename, setFilename] = useState<string>('newfile.txt');
    let allfiles = useLiveQuery(
        () => db.table(p.tableName).toArray()
    );
    const handleKeydown = (e:any) => {
        if (e.keyCode == 13) {
            saveFile();
            setFilename('');
        }
    }
    const saveFile = () => {
        console.log(`saving new file: ${p.content}`)
        db.table(p.tableName).put({
            name: filename,
            content: p.content,
            is_deleted: false,
            created_at: Date.now(),
            modified_at: Date.now()
        });
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {allfiles?.map(f => <FileTiles files={f}
                updateEditorContent={p.updateEditorContent}
                key={f.name}
                tableName={p.tableName} />)}
            <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5rem' }}>
                <TextInput placeholder='Filename' required
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)} 
                    onKeyDown={handleKeydown}/>
                <Button style={{ width: '8rem', marginLeft: '0.2rem' }}
                    onClick={saveFile} >
                    Save</Button>
            </div>
        </div>
    );
}
interface IFileTileProps {
    files: ICommonFileData;
    updateEditorContent: Function;
    tableName: string;
}
function FileTiles(p: IFileTileProps) {
    const dispatch = useDispatch();
    const bigInvalidId = 10000000;
    return (
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            margin: '0.5rem'
        }}>
            <div onClick={() => dispatch(p.updateEditorContent(p.files.content))} style={{
                cursor: 'pointer'
            }}>
                {p.files.name}
            </div>
            <AiFillDelete style={{
                color: styles.primary_error,
                cursor: 'pointer'
            }} onClick={() => db.table(p.tableName).delete(p.files.id || bigInvalidId)} />
        </div>
    );
}

export default FileManager;
