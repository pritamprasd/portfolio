import { Paper, SimpleGrid, Title } from '@mantine/core';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { useDispatch } from 'react-redux';
import { styles, data } from '../storage/data';
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
                .map(p => <PagesTile title={data.pages[p].title} pageId={p} key={p} icon={data.pages[p].icon}/>)
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
        <Paper shadow="xl" padding="md" radius="md" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '1rem'
            }} onClick={() => dispatch(updateVisiblePage(props.pageId))}>
            <props.icon style={{
                color: styles.primary_error,
                height: '40%',
                width: '40%',
                marginBottom: '2rem'
            }}/>
            <Title order={2} style={{
                color: styles.primary_accent, 
                textShadow: '0 0 32px rgb(192 219 255 / 25%), 0 0 16px rgb(65 120 255 / 24%)'
            }}>{props.title}</Title>
        </Paper>
    );
}

export default AllPages;