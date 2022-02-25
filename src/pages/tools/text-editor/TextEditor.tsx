import React, { useEffect, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import { Button, Grid, SimpleGrid, Text, TextInput } from '@mantine/core';
import { db, ITextEditorFiles } from '../../../index-db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateTextEditorContent } from './textEditorSlice';
import { RiDeleteBackFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { styles } from '../../../data';


function TextEditorPage() {
    return (
        <Grid style={{width: '100%', height: '100%'}}>
            <Grid.Col sm={8} span={12}><TextEditor/></Grid.Col>
            <Grid.Col sm={4} span={12}><FileManager/></Grid.Col>
        </Grid>
    );
}

interface ITextEditorProps{
}
function TextEditor(props: ITextEditorProps) {
    const content = useSelector((state: RootState) => state.texteditor.content);
    const [editorContent, setEditorContent] = useState(content || '');
    useEffect(()=> {
        setEditorContent(content);
    }, [content])
    const [filename, setFilename] = useState('newfile.txt');
    const dispatch = useDispatch();
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <RichTextEditor value={editorContent} onChange={setEditorContent}/>
            <div style={{display: 'flex', flexDirection: 'row', margin: '0.5rem'}}>
                <TextInput placeholder='Filename' required onChange={(e) => setFilename(e.target.value)}/>
                <Button style={{width: '8rem', marginLeft: '0.2rem'}} 
                   onClick={() => {
                        db.table('textEditorFiles').put({
                            name: filename,
                            content: editorContent,
                            is_deleted: false,
                            created_at: Date.now(),
                            modified_at: Date.now()
                        });
                   }} >
                Save</Button>
            </div>
        </div>
    );
}



interface IFileManagerProps{
}
function FileManager(p: IFileManagerProps) {
    let allfiles = useLiveQuery(
        () => db.table("textEditorFiles").toArray()
    ); 
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {allfiles?.map(f => <FileTiles files={f}/>)}
        </div>
    );
}

interface IFileTileProps{
    files: ITextEditorFiles;
}
function FileTiles(p: IFileTileProps) {
    const dispatch = useDispatch();
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0.5rem'}}>
            <div onClick={() => dispatch(updateTextEditorContent(p.files.content))}>
                {p.files.name}
            </div>
            <AiFillDelete style={{color: styles.primary_error}} 
                onClick={() => db.table("textEditorFiles").delete(p.files.id || 10000000)}/>
        </div>
        
    );
}

export default TextEditorPage;