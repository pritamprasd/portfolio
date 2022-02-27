import { data } from "../storage/data";
import { db } from "../storage/index-db";
import YAML from 'yaml';
// import { detectLang } from 'lang-detector';


export const loadprojects = async() => {
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
        }
    }
}

export const detectLanguage = (code:string) => {
    var detectLang = require('lang-detector');
    try {
        JSON.parse(code);
        return 'json';
    } catch (error) {
    }
    return detectLang(code).toLowerCase();
}

export const jsonToYaml = (json: string) => {
    const doc = new YAML.Document();
    try {
        doc.contents = JSON.parse(json);
        return doc.toString();
    } catch (error) {
        return `Error: ${JSON.stringify(error)}`
    }
}

