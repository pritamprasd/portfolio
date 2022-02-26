import React from 'react';
import { db, ICommonFileData } from '../storage/index-db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { styles } from '../storage/data';

interface IFileManagerProps {
    tableName: string;
    updateEditorContent: Function;
}
function FileManager(p: IFileManagerProps) {
    let allfiles = useLiveQuery(
        () => db.table(p.tableName).toArray()
    );
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {allfiles?.map(f => <FileTiles files={f}
                updateEditorContent={p.updateEditorContent}
                tableName={p.tableName} />)}
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
