import { data } from "../storage/data";
import { db } from "../storage/index-db";
import { isValidJwt } from "./transformers/jwt_tx";
import { isYaml } from "./transformers/yaml_tx";
// import { detectLang } from 'lang-detector';


export const loadprojects = async (username: string) => {
    if (username === 'pritamprasd') {
        const projectNames = data.pages['projects'].tiles?.map(p => p.title) || [];
        for (const name of projectNames) {
            const projectInDb: any = await db.table("projects").where("title").equalsIgnoreCase(name).toArray();
            if (projectInDb.length === 0) {
                //TODO: move api calls to a single location: commons/apis/github.py -> able to provide github basic auth in settings.
                const projectData = await fetch(`https://api.github.com/repos/${username}/${name}`).then(r => r.json())
                    .catch(e => console.error("Error: projectData: " + JSON.stringify(e)));
                const projectLangs = await fetch(projectData['languages_url']).then(r => r.json())
                    .catch(e => console.error("Error: projectLangs: " + JSON.stringify(e)));
                await db.table("projects").put({
                    title: name,
                    name: projectData['name'],
                    description: projectData['description'],
                    forks: projectData['forks'],
                    languages: Object.keys(projectLangs),
                    projectUrl: projectData['html_url'],
                    username: username,
                });
            }
        }
    } else {
        const projectInDb: any = await db.table("projects").where("username").equalsIgnoreCase(username).toArray();
        if (projectInDb.length === 0) {
            const allProjects = await fetch(`https://api.github.com/users/${username}/repos`).then(checkResponse).then(r => r.json())
                .catch((e: Error) => alert("Error: " + e.message));
            console.log(`All projects: ${JSON.stringify(allProjects)}`);
            const repos = allProjects.map((p: any) => p['name']);
            console.log(`repos : ${repos}`)
            for (const pName of repos) {
                const repo = allProjects.filter((p: any) => p['name'] === pName)[0];
                console.log(`repo['languages_url'] ${repo}`)
                const projectLangs = await fetch(repo['languages_url']).then(checkResponse).then(r => r.json())
                    .catch((e: Error) => alert("Error langs: " + e.message));
                await db.table("projects").put({
                    title: repo['name'],
                    name: repo['name'],
                    description: repo['description'],
                    forks: repo['forks'],
                    languages: Object.keys(projectLangs),
                    projectUrl: repo['html_url'],
                    username: username,
                });
            }
        }
    }
}

async function checkResponse(response: any) {
    if (!response.ok) {
        throw new Error(` | ${await response.text()}`)
    }
    return response
}

export const detectLanguage = (code: string) => {
    try {
        JSON.parse(code);
        return 'json';
    } catch (error) {
    }
    if(isYaml(code) && code.includes(":")){
        return 'yaml'
    }
    if(isValidJwt(code)){
        return 'jwt'
    }
    var detectLang = require('lang-detector');
    const lang = detectLang(code).toLowerCase();
    return lang === 'unknown' ? 'plaintext': lang;
}

