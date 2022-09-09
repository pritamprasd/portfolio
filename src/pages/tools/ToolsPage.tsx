import { Divider, List, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { data, styles, TileData } from '../../storage/data';
import React from 'react';
import { Editor } from './vs-code/Editor';
import CopyBoard from './copy-board/CopyBoard';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisiblePage } from '../pagesSlice';
import { RootState } from '../../store/store';
import { TiTick } from 'react-icons/ti';
import TextEditorPage from './text-editor/TextEditor';

interface IToolsProps {

}

function ToolsPage(props: IToolsProps) {
    const currentpage = useSelector((state: RootState) => state.pages.visiblePage)
    return (
        <>
            {currentpage === 'tools' &&
                <SimpleGrid cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 1200, cols: 3, spacing: 'md' },
                        { maxWidth: 850, cols: 2, spacing: 'md' },
                        { maxWidth: 500, cols: 1, spacing: 'md' },
                    ]}>
                    {data.pages['tools'].tiles?.map(t => <ToolsTile key={t.title} data={t} />)}
                </SimpleGrid>
            }
            {currentpage === 'vs-code-editor' && <Editor key={currentpage}/>}
            {currentpage === 'copy-board' && <CopyBoard key={currentpage}/>}
            {currentpage === 'text-editor' && <TextEditorPage key={currentpage}/>}
        </>
    );
}

interface IProjectTileProps {
    data: TileData;
}

function ToolsTile(props: IProjectTileProps) {
    const dispatch = useDispatch();
    return (
        <Paper shadow="sm" padding="lg" style={{ cursor: 'pointer' }} 
            onClick={() => dispatch(updateVisiblePage(props.data.title))}>
            <Text size="lg" weight={700} style={{ color: styles.primary_error }}>{props.data.name}</Text>
            <Text size="xs" >{props.data.description}</Text>
            <Divider style={{margin: '0.4rem'}} label="main features" labelPosition="center"/>
            <List size="xs" icon={
                <ThemeIcon color="teal" size={16} radius="lg">
                    <TiTick size={14} />
                </ThemeIcon>
            }>
                {props.data.features?.map(f => <List.Item key={f}>{f}</List.Item>)}
            </List>
        </Paper>
    );
}

export default ToolsPage;