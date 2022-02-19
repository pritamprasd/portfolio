import React, { useState } from 'react';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ToolsPage from '../pages/tools/ToolsPage';

interface IBodyContentProps{
    activePage: string
}

function BodyContent(props: IBodyContentProps) {
    return (
        <div>
            {props.activePage === 'projects' && <ProjectsPage/>}
            {props.activePage === 'tools' && <ToolsPage/>}
        </div>
    );
}

export default BodyContent;