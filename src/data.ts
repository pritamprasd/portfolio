import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export type TileData = {
    title: string,
    repo: string
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
                    repo: 'https://github.com/pritamprasd/e-commerce'
                },
                {
                    title: 'crypto-lending',
                    repo: 'https://github.com/pritamprasd/crypto-lending'
                },
                {
                    title: 'covid-dashboard',
                    repo: 'https://github.com/pritamprasd/covid-dashboard'
                }
            ]
        },
        'tools': {
            title: 'Tools',
            icon: FaTools
        }
    }
};
