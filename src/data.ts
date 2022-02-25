import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import {BsFillFileEarmarkPersonFill, BsFillMusicPlayerFill} from 'react-icons/bs'
import { IconType } from 'react-icons/lib';
import { IoMdHome } from 'react-icons/io';
import { features } from 'process';
import { RiFlag2Fill } from 'react-icons/ri';

export const navbarTextColor:string = '#A6A7AB';

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
        'default':{
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
                    description: `VS Code like Editor Online. uses monaco-editor at core.`,
                    features:[
                        'Offline Web based Editor',
                        'Uses Browser IndexDB to persist files',
                        'Your data never leaves your browser'
                    ]
                },
                {
                    title: 'copy-board',
                    description: 'A sticky notes board for fast copy.',
                    features:[
                        'Easy Copy Paste while demos',
                        'Easy note taking',
                        'Uses Browser IndexDB to persist files',
                        'Your data never leaves your browser'
                    ]
                }                
            ]
        },
        'portfolio':{
            title: 'Portfolio',
            icon: BsFillFileEarmarkPersonFill,            
        },
        'music':{
            title: 'Playlists',
            icon: BsFillMusicPlayerFill,
            tiles:[
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
        'about':{
            title: 'About this site',
            icon: RiFlag2Fill,
        }
    }
};

export const styles = {
    primary_accent: '#7865dc',
    primary_error: '#962f5a',
    primary_warn: '#bd9417',
}
