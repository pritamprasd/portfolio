import React, { useEffect, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import { Button, Grid, SimpleGrid, Text, TextInput } from '@mantine/core';
import { db } from '../../../storage/index-db';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { updateTextEditorContent } from './textEditorSlice';
import { RiDeleteBackFill } from 'react-icons/ri';
import FileManager from '../../../components/FileManager';


function TextEditorPage() {
    return (
        <Grid style={{width: '100%', height: '100%'}}>
            <Grid.Col sm={8} span={12}><TextEditor/></Grid.Col>
            <Grid.Col sm={4} span={12}><FileManager tableName='textEditorFiles' 
                                                    updateEditorContent={updateTextEditorContent}
                                        /></Grid.Col>
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
            <RichTextEditor value={editorContent} onChange={setEditorContent} />
            <div style={{display: 'flex', flexDirection: 'row', margin: '0.5rem'}}>
                <TextInput placeholder='Filename' required 
                    onChange={(e) => setFilename(e.target.value)}/>
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

export default TextEditorPage;