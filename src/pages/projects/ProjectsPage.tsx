import { Button, Code, Divider, Group, Paper, SegmentedControl, SimpleGrid, Text, Title } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { data, styles, TileData } from '../../data';
import { db, IProjectData } from '../../index-db';

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
        const loadprojects = async() => {
            const projectNames = data.pages['projects'].tiles?.map(p => p.title) || [];
            for(const name of projectNames){
                const projectInDb:any = await db.table("projects").where("title").equalsIgnoreCase(name).toArray();
                if(projectInDb.length === 0){
                    const projectData = await fetch(`https://api.github.com/repos/pritamprasd/${name}`).then(r => r.json())
                                            .catch(e => console.error("Error 1: " +JSON.stringify(e)));;
                    console.log(`r['lang_url']: ${projectData['languages_url']}`)
                    const projectLangs = await fetch(projectData['languages_url']).then(r => r.json())
                                            .catch(e => console.error("Erro 1: " +JSON.stringify(e)));;
                    console.log(`lan: ${JSON.stringify(projectLangs)}`)                    
                    await db.table("projects").put({
                        title: name,
                        name: projectData['name'],
                        description: projectData['description'],
                        forks: projectData['forks'],
                        languages: Object.keys(projectLangs),
                        projectUrl: projectData['html_url'],
                    })
                }else{
                    console.table(projectInDb.length)
                }
            }
        }
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
                        <kbd style={{
                            backgroundColor: props.langs.get(l) ? styles.primary_error : 'gray', 
                            cursor: 'pointer',  padding: '0.15rem'
                        }} onClick={() => handleOnClick(l)} key={l} contentEditable={false}>
                            {l}
                        </kbd>
                    );
                })
            }
            <Button size="xs" onClick={handleUnselectAll} > Unselect All</Button>
        </Group>
    );
}

interface IProjectTileProps {
    projectData: IProjectData;
}

function ProjectTile(props: IProjectTileProps) {
    return (
        <Paper padding="md" shadow="xs" style={{backgroundColor: styles.primary_accent}}>
            <div style={{ cursor: 'pointer' }}
                onClick={() => window.location.replace(props.projectData.projectUrl)}>
                <Title order={3} style={{color: styles.primary_warn}}>{props.projectData.title}</Title>
            </div>
            <Text size="sm">{props.projectData.description}</Text>
            <Divider color="yellow" style={{margin: '1rem'}}/>
            <Group style={{bottom: '0rem'}}>
                {Object.keys(props.projectData.languages).map((k:any) => 
                    <Code style={{backgroundColor: styles.primary_error, padding: '0.1rem'}}>{props.projectData.languages[k]}</Code>)}
            </Group>
        </Paper>
    );
}

export default ProjectsPage;