import { Paper, SimpleGrid } from '@mantine/core';
import { data, TileData } from '../../data';
import React, { useState } from 'react';
import { Editor } from './vs-code/Editor';
import CopyBoard from './copy-board/CopyBoard';

interface IToolsProps{
    activeTool: string
}

function ToolsPage(props: IToolsProps) {
    const [activeTool, setActiveTool] = useState<string>(props.activeTool);
    return (
        <>
            {activeTool === '' &&
                <SimpleGrid cols={3}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 755, cols: 2, spacing: 'md' },
                        { maxWidth: 600, cols: 1, spacing: 'sm' },
                    ]}>
                    {data.pages['tools'].tiles?.map(t => <ToolsTile key={t.title} data={t} updateActiveTool={(e: string) => setActiveTool(e)} />)}
                </SimpleGrid>
            }
            {activeTool==='vs-code-editor' && <Editor/>}
            {activeTool==='copy-board' && <CopyBoard/>}
        </>

    );
}

interface IProjectTileProps {
    data: TileData;
    updateActiveTool: Function
}

function ToolsTile(props: IProjectTileProps) {
    return (
        <Paper padding="md" shadow="xs" onClick={() => props.updateActiveTool(props.data.title)}>
            {props.data.title}
        </Paper>
    );
}

export default ToolsPage;