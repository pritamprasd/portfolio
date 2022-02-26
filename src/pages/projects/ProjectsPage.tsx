import { Button, Code, Divider, Group, Paper, SegmentedControl, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { data, styles, TileData } from '../../data';
import { db, IProjectData } from '../../index-db';
import { loadprojects } from '../../utils';
import { themes } from '../tools/vs-code/utils';

function ProjectsPage() { 
    const[langFilter, setlangFilter] = useState<Map<string, boolean>>();
    let allprojects = useLiveQuery(
        () => db.table("projects").toArray()
    );  

    useEffect(()=> {
        const lans:string[] = allprojects?.flatMap((p:IProjectData) => [...p.languages]) || [];        
        const distinct_langs = lans.filter((item, pos) => lans.indexOf(item)== pos);
        const m: Map<string, boolean> = new Map();
        for(const l of distinct_langs){
            m.set(l, true);
        }
        setlangFilter(m);
    },[allprojects]);

    useEffect(() => {
        loadprojects();        
    }, [])   

    return (<>
        <ProjectFilter langs={langFilter || new Map()} updateActiveLangs={setlangFilter}/>
        <Divider style={{padding: '0.25rem'}}/>
        <SimpleGrid cols={4}
            spacing="lg"
            breakpoints={[
                { maxWidth: 1200, cols: 3, spacing: 'md' },
                { maxWidth: 850, cols: 2, spacing: 'md' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
            {allprojects
                ?.filter(p=> Object.entries(p.languages).map(([_, l]) => l)
                                .filter((l:any) => langFilter?.get(l)).length != 0)
                                .map(p => <ProjectTile key={p.title} projectData={p}/>)
            }
        </SimpleGrid>
    </>);
}

interface IProjectFilters{
    langs: Map<string, boolean>;
    updateActiveLangs: Function;
}


function ProjectFilter(props: IProjectFilters) {
    const handleOnClick = (l:string) => {
        console.log(l);
        const newLangs:Map<string,boolean> = new Map(props.langs);
        newLangs.set(l, !newLangs.get(l));
        props.updateActiveLangs(newLangs);
    }
    const handleUnselectAll = () => {
        const newLangs = new Map(props.langs);
        newLangs.forEach((value, key, map) => map.set(key, false));
        props.updateActiveLangs(newLangs);
    }
    return (
        <Group style={{bottom: '0rem' , padding: '0.5rem'}}>            
            {
                Array.from(props.langs.keys()).map(l => {
                    return(
                        <div style={{
                            backgroundColor: props.langs.get(l) ? styles.primary_error : 'gray', 
                            cursor: 'pointer',  padding: '0.20rem', borderRadius: '0.2rem'
                        }} onClick={() => handleOnClick(l)} key={l} contentEditable={false}>
                            {props.langs.get(l) ? <div>&#129488; {l}</div>: <div>&#128565; {l}</div>}
                        </div>
                    );
                })
            }
            <Button size="sm" onClick={handleUnselectAll} > Unselect All</Button>
        </Group>
    );
}

interface IProjectTileProps {
    projectData: IProjectData;
}

function ProjectTile(props: IProjectTileProps) {
    return (
        <Paper padding="md" shadow="xs">
            <div style={{ cursor: 'pointer' }}
                onClick={() => window.location.replace(props.projectData.projectUrl)}>
                <Title order={3} style={{color: styles.primary_accent}}>{props.projectData.title}</Title>
            </div>
            <Text size="sm">{props.projectData.description}</Text>
            <Divider my="xs" label="frameworks/languages" labelPosition="center" style={{
                marginTop: '1rem',
            }}/>
            <Group style={{
                    // bottom: '0rem',
                    margin: 'auto 0'
                }}>
                {Object.keys(props.projectData.languages).map((k:any) => 
                    <Code style={{backgroundColor: styles.primary_error, padding: '0.1rem'}} key={props.projectData.languages[k]}>
                        {props.projectData.languages[k]}</Code>)}
            </Group>
        </Paper>
    );
}

export default ProjectsPage;