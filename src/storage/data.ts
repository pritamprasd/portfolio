import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import { BsFillFileEarmarkPersonFill, BsFillMusicPlayerFill } from 'react-icons/bs'
import { IconType } from 'react-icons/lib';
import { IoMdHome } from 'react-icons/io';
import { RiFlag2Fill } from 'react-icons/ri';
import { jsonBeautify, jsonToYaml } from '../commons/transformers/json_tx';
import { yamlToJson } from '../commons/transformers/yaml_tx';
import { parseJwt, parseJwtHeader } from '../commons/transformers/jwt_tx';

export const navbarTextColor: string = '#A6A7AB';

export enum MusicTypes {
    playlist,
    song,
    artist
}

export type TileData = {
    title: string;
    description?: string;
    features?: string[];
    id?: string;
    type?: MusicTypes;
    name?: string;
}

export type ProjectData = {
    pages: {
        [name: string]: {
            title: string;
            icon: IconType;
            tiles?: TileData[]
        };
    };
};


export const data: ProjectData = {
    pages: {
        'default': {
            title: 'Home',
            icon: IoMdHome,
        },
        'projects': {
            title: 'Projects',
            icon: FaProjectDiagram,
            tiles: [
                {
                    title: 'e-commerce',
                },
                {
                    title: 'crypto-lending',
                },
                {
                    title: 'covid-dashboard',
                },
                {
                    title: 'distributed-systems-demo',
                },
                {
                    title: 'poc-encrypt-flask-reactjs',
                },
                {
                    title: 'cryptography-basics-web',
                },
                {
                    title: 'rq-scheduler-sample ',
                },
                {
                    title: 'therapyApp',
                },
                {
                    title: 'DownloadApplication',
                }
            ]
        },
        'tools': {
            title: 'Tools',
            icon: FaTools,
            tiles: [
                {
                    title: 'vs-code-editor',
                    name: 'Offline Code Editor',
                    description: `VS Code like Online Editor. uses monaco-editor at core.`,
                    features: [
                        'Offline Web based Editor',
                        'Auto language detection',
                        'just paste and convert with Magic button',
                        'File Browser: Uses Browser IndexDB to persist files',
                        'Your data never leaves your browser'
                    ]
                },
                {
                    title: 'text-editor',
                    name: 'Offline Rich Text Editor',
                    description: 'Brower based Rich Text Editor',
                    features: [
                        'Rich Text Editor',
                        'File Browser: Uses Browser IndexDB to persist files',
                        'Your data never leaves your browser'
                    ]
                },
                {
                    title: 'copy-board',
                    name: 'Copy Paste Utility',
                    description: 'A sticky notes board for fast copy.',
                    features: [
                        'Easy Copy Paste while demos',
                        'Easy note taking',
                        'Uses Browser IndexDB to persist files',
                        'Your data never leaves your browser'
                    ]
                },
                {
                    title: 'github-projects-analyzer',
                    name: 'Github Projects Analyzer',
                    description: 'Pulls up Github Public data for a username, and allows set of analytics on it.',
                    features: [
                        'Get your github public repositories in one-click',
                        'Filters: Allow you to filter repos based on language used',
                        'All data persisted in indexDb table for further analytics',
                        'Your data never leaves your browser'
                    ]
                }
            ]
        },
        'portfolio': {
            title: 'Portfolio',
            icon: BsFillFileEarmarkPersonFill,
        },
        'music': {
            title: 'Playlists',
            icon: BsFillMusicPlayerFill,
            tiles: [
                {
                    title: 'Tripieee',
                    id: 'PLzvYkgxrd_WsvgGWs3BTspFgUwtoRLxTW',
                    type: MusicTypes.playlist,
                },
                {
                    title: 'O tunes O',
                    id: 'PLzvYkgxrd_WvdyRX8pYGuFpefMFZ9Diel',
                    type: MusicTypes.playlist,
                },
                {
                    title: 'Axomiya songs',
                    id: 'PLzvYkgxrd_Ws_9FWlbSCgAsvBt9QWNjOx',
                    type: MusicTypes.playlist,
                },
                {
                    title: 'Classics',
                    id: 'PLzvYkgxrd_WvDHGn5Xcz2JsterXSWkIUO',
                    type: MusicTypes.playlist,
                }
            ]
        },
        'about': {
            title: 'About this site',
            icon: RiFlag2Fill,
        }
    }
};

export type Transformers = {
    [lang: string]: {
        [operation: string]: {
            executor: Function,
            output: string
        };
    }
}

export const transformers: Transformers = {
    'json': {
        'To Yaml': {
            executor: jsonToYaml,
            output: 'yaml'
        },
        'Beautify': {
            executor: jsonBeautify,
            output: 'json'
        },
    },
    'yaml': {
        'To Json': {
            executor: yamlToJson,
            output: 'json'
        }
    },
    'jwt': {
        'Parse Payload': {
            executor: parseJwt,
            output: 'json'
        },
        'Parse Header': {
            executor: parseJwtHeader,
            output: 'json'
        }
    }
}

export const styles = {
    primary_accent: '#6577B3',
    primary_error: '#DA244B',
    primary_warn: '#96E800',
}


export const getPageName = (page:string) => {
    switch (page) {
        case 'landing':
            return 'landing-page';
        case 'editor':
            return 'vs-code-editor';
        case 'text-editor':
            return 'text-editor'
        case 'copy':
            return 'copy-board';
        case 'github':
        case 'projects':
            return 'projects';
        default:
            return 'default';
    }
}
