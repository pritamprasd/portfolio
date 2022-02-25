import { Card, Divider, List, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { data, styles, TileData } from '../../data';
import React, { useState } from 'react';
import { Editor } from './vs-code/Editor';
import CopyBoard from './copy-board/CopyBoard';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisiblePage } from '../pagesSlice';
import { RootState } from '../../store';
import { TiTick } from 'react-icons/ti';

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
            {currentpage === 'vs-code-editor' && <Editor />}
            {currentpage === 'copy-board' && <CopyBoard />}
        </>
    );
}

interface IProjectTileProps {
    data: TileData;
}

function ToolsTile(props: IProjectTileProps) {
    const dispatch = useDispatch();
    return (
        <Paper shadow="sm" padding="lg" style={{ backgroundColor: styles.primary_accent, cursor: 'pointer' }} onClick={() => dispatch(updateVisiblePage(props.data.title))}>
            <Text size="lg" weight={700} style={{ color: styles.primary_error }}>{props.data.title}</Text>
            <Text size="xs" >{props.data.description}</Text>
            <Divider style={{margin: '0.2rem'}}/>
            <List size="xs" icon={
                <ThemeIcon color="teal" size={16} radius="lg">
                    <TiTick size={14} />
                </ThemeIcon>
            }>
                {props.data.features?.map(f => <List.Item>{f}</List.Item>)}
            </List>
        </Paper>
    );
}

export default ToolsPage;