import { Code, Container, Group, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { data, TileData } from '../../data';

function ProjectsPage() {
    return (
        <SimpleGrid cols={3}
            spacing="lg"
            breakpoints={[
                { maxWidth: 755, cols: 2, spacing: 'md' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
            {data.pages['projects'].tiles?.map(t => <Tile key={t.title} data={t} />)}
        </SimpleGrid>
    );
}

interface ITileProps {
    data: TileData
}

function Tile(props: ITileProps) {
    return (
        <Paper padding="md" shadow="xs">
            <ProjectInfo title={props.data.title} />
            <Langs title={props.data.title} />
        </Paper>
    );
}

interface ILangProps {
    title: string
}

function ProjectInfo(props: ILangProps) {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        fetch(`https://api.github.com/repos/pritamprasd/${props.title}`)
            .then(r => r.json())
            .then(r => {
                setTitle(r['name']);
                setDesc(r['description']);
                setUrl(r['html_url'])
            })
            .catch(e => console.error(JSON.stringify(e)));
    }, []);
    return (
        <>
            <div style={{ cursor: 'pointer' }}
                onClick={() => window.location.replace(url)}>
                <Title order={3}>{title}</Title>
            </div>
            <Text size="sm" color="red">{desc}</Text>
        </>
    );
}

function Langs(props: ILangProps) {
    const [languages, setLang] = useState<{ [key: string]: number }>({});
    useEffect(() => {
        fetch(`https://api.github.com/repos/pritamprasd/${props.title}/languages`)
            .then(r => r.json())
            .then(r => setLang(r))
            .catch(e => console.error(JSON.stringify(e)));
    }, []);
    return (
        <Group>
            {Object.keys(languages).map(k => <Code>{k}</Code>)}
        </Group>
    );
}


export default ProjectsPage;