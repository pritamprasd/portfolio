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
            {data.pages['projects'].tiles?.map(t => <ProjectTile key={t.title} data={t} />)}
        </SimpleGrid>
    );
}

interface IProjectTileProps {
    data: TileData
}

function ProjectTile(props: IProjectTileProps) {
    return (
        <Paper padding="md" shadow="xs">
            <ProjectInfo title={props.data.title} />
            <ProjectLangs title={props.data.title} />
        </Paper>
    );
}

interface IProjectLangProps {
    title: string
}

function ProjectInfo(props: IProjectLangProps) {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const localurl = `https://api.github.com/repos/pritamprasd/${props.title}`;
    useEffect(() => {
        const repo: string = localStorage.getItem(url) || '';
        if (repo === '') {
            fetch(localurl)
                .then(r => r.json())
                .then(r => {
                    localStorage.setItem(url, JSON.stringify(r))
                    setTitle(r['name']);
                    setDesc(r['description']);
                    setUrl(r['html_url'])
                })
                .catch(e => console.error(JSON.stringify(e)));
        } else {
            const r = JSON.parse(repo);
            setTitle(r['name']);
            setDesc(r['description']);
            setUrl(r['html_url'])
        }
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

function ProjectLangs(props: IProjectLangProps) {
    const [languages, setLang] = useState<{ [key: string]: number }>({});
    const url = `https://api.github.com/repos/pritamprasd/${props.title}/languages`;
    useEffect(() => {
        const langs: string = localStorage.getItem(url) || ''
        if (langs === '') {
            fetch(url)
                .then(r => r.json())
                .then(r => {
                    setLang(r)
                    localStorage.setItem(url, JSON.stringify(r))
                })
                .catch(e => console.error(JSON.stringify(e)));
        } else {
            setLang(JSON.parse(langs));
        }
    }, []);
    return (
        <Group>
            {Object.keys(languages).map(k => <Code>{k}</Code>)}
        </Group>
    );
}


export default ProjectsPage;