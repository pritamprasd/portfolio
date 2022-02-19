import { Code, Paper, SimpleGrid } from '@mantine/core';
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
        {data.pages['projects'].tiles?.map(t => <Tile key={t.title} data={t}/>)}
        </SimpleGrid>
    );
}

interface ITileProps{
    data: TileData
}

function Tile(props: ITileProps) {
    return (
        <Paper padding="md" shadow="xs">
            {props.data.title}
            <Langs repo={props.data.title}/>
        </Paper>
    );
}

interface ILangProps{
    repo: string
}

function Langs(props: ILangProps) {
    const[languages, setLang] = useState<{[key: string]: number}>({});
    useEffect(() => {
        fetch(`https://api.github.com/repos/pritamprasd/${props.repo}/languages`)
        .then(r => r.json())
        .then(r => setLang(r))
        .catch(e => console.error(JSON.stringify(e)));
    }, []);
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {Object.keys(languages).map(k => <Code>{k}</Code>)}
        </div>
    );
}


export default ProjectsPage;