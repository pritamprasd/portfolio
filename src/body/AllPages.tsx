import { Paper, SimpleGrid, ThemeIcon, Title } from '@mantine/core';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { useDispatch } from 'react-redux';
import { styles, data } from '../data';
import { updateVisiblePage } from '../pages/pagesSlice';

interface IAllPagesProp{

}

function AllPages(props: IAllPagesProp) {
    return (
        <SimpleGrid cols={4}
            spacing="lg"
            breakpoints={[
                { maxWidth: 1200, cols: 3, spacing: 'md' },
                { maxWidth: 850, cols: 2, spacing: 'md' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
            {Object.keys(data.pages)
                .filter(p => p !== 'default')
                .map(p => <PagesTile title={data.pages[p].title} pageId={p} icon={data.pages[p].icon}/>)
            }
        </SimpleGrid>
    );
}

interface IPageTileProp {
    title: string;
    icon: IconType;
    pageId: string;
}

function PagesTile(props: IPageTileProp) {
    const dispatch = useDispatch();
    return (
        <Paper style={{
            backgroundColor: styles.primary_accent, padding: '0.5rem'
            }} onClick={() => dispatch(updateVisiblePage(props.pageId))}>
            <props.icon style={{
                color: styles.primary_warn, 
                backgroundColor: styles.primary_accent,
            }}/>
            <Title order={2} style={{color: styles.primary_error}}>{props.title}</Title>
        </Paper>
    );
}

export default AllPages;