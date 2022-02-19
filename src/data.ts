import { FaTools, FaProjectDiagram } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

type ProjectData = {
    pages: {
        [name: string]: {
            title: string;
            icon: IconType;
        };
    };
};
export const data: ProjectData = {
    pages: {
        'projects': {
            title: 'Projects',
            icon: FaProjectDiagram
        },
        'tools': {
            title: 'Tools',
            icon: FaTools
        }
    }
};
