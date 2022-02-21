import { Paper, SimpleGrid, Text } from '@mantine/core';
import { data, styles, TileData } from '../../data';
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
                <SimpleGrid cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 1200, cols: 3, spacing: 'md' },
                        { maxWidth: 850, cols: 2, spacing: 'sm' },
                        { maxWidth: 600, cols: 1, spacing: 'lg' },
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
        <Paper padding="md" shadow="xs" style={{backgroundColor: styles.primary_accent, cursor: 'pointer'}} onClick={() => dispatch(updateVisiblePage(props.data.title))}>
            <Text size="lg" weight={700} style={{color: styles.primary_warn}}>{props.data.title}</Text>
            <Text size="sm" >{props.data.description}</Text>
        </Paper>
    );
}

export default ToolsPage;