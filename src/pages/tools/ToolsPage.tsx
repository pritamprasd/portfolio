import { Paper, SimpleGrid } from '@mantine/core';
import { data, TileData } from '../../data';
import React, { useState } from 'react';
import { Editor } from './vs-code/Editor';
import CopyBoard from './copy-board/CopyBoard';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisiblePage } from '../pagesSlice';
import { RootState } from '../../store';

interface IToolsProps{
 
}

function ToolsPage(props: IToolsProps) {   
    const currentpage = useSelector((state: RootState) => state.pages.visiblePage)
    return (
        <>
            {currentpage  === 'tools' &&
                <SimpleGrid cols={3}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 755, cols: 2, spacing: 'md' },
                        { maxWidth: 600, cols: 1, spacing: 'sm' },
                    ]}>
                    {data.pages['tools'].tiles?.map(t => <ToolsTile key={t.title} data={t}/>)}
                </SimpleGrid>
            }
            {currentpage ==='vs-code-editor' && <Editor/>}
            {currentpage ==='copy-board' && <CopyBoard/>}
        </>
    );
}

interface IProjectTileProps {
    data: TileData;
}

function ToolsTile(props: IProjectTileProps) {
    const dispatch = useDispatch();
    return (
        <Paper padding="md" shadow="xs" onClick={() => dispatch(updateVisiblePage(props.data.title))}>
            {props.data.title}
        </Paper>
    );
}

export default ToolsPage;