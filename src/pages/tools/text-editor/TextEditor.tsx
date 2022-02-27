import React, { useEffect, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import { Button, Grid, SimpleGrid, Text, TextInput } from '@mantine/core';
import { db } from '../../../storage/index-db';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { updateTextEditorContent } from './textEditorSlice';
import FileManager from '../../../components/FileManager';


function TextEditorPage() {
    const content = useSelector((state: RootState) => state.texteditor.content);
    return (
        <Grid style={{width: '100%', height: '100%'}}>
            <Grid.Col sm={8} span={12}><TextEditor content={content}/></Grid.Col>
            <Grid.Col sm={4} span={12}><FileManager tableName='textEditorFiles' 
                                                    updateEditorContent={updateTextEditorContent}
                                                    content={content}
                                        /></Grid.Col>
        </Grid>
    );
}

interface ITextEditorProps{
    content: string
}
function TextEditor(p: ITextEditorProps) {
    const [editorContent, setEditorContent] = useState(p.content || '');
    const dispatch = useDispatch();
    function setEditorContentExternal(e: string){
        console.log(`onchnage text editor happended : ${e}`)
        setEditorContent(e);
        dispatch(updateTextEditorContent(e));
    }
    useEffect(()=> {
        setEditorContent(p.content);
    }, [p.content])
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <RichTextEditor value={editorContent} onChange={(e) => setEditorContentExternal(e.toString())} />
        </div>
    );
}

export default TextEditorPage;