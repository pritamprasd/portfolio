import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export type TileData = {
    title: string,
    description?: string
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
                }
            ]
        },
        'tools': {
            title: 'Tools',
            icon: FaTools,
            tiles: [
                {
                    title: 'vs-code-editor',
                },
                {
                    title: 'copy-board',
                }                
            ]
        }
    }
};

export const styles = {
    primary_accent: '#7865dc',
    primary_error: '#962f5a',
    primary_warn: '#bd9417',
}
