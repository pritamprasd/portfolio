import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { data, styles } from '../data';
import AllPages from '../pages/AllPages';
import Music from '../pages/music/Music';
import { selectVisiblePage } from '../pages/pagesSlice';
import Portfolio from '../pages/portfolio/Portfolio';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ToolsPage from '../pages/tools/ToolsPage';
import { RootState } from '../store';

interface IBodyContentProps{
    activePage: string
}

function BodyContent(props: IBodyContentProps) {
    const currentpage = useSelector((state: RootState) => state.pages.visiblePage)
    console.log('State update? '+ currentpage);
    return (
        <div>
            {currentpage === 'default' && <AllPages/>}
            {currentpage === 'projects' && <ProjectsPage/>}
            {currentpage === 'tools' && <ToolsPage/>}
            {currentpage === 'portfolio' && <Portfolio/>}
            {currentpage === 'music' && <Music/>}
            {data.pages['tools'].tiles?.map(t => t.title).includes(currentpage) && <ToolsPage/>}            
        </div>
    );
}

export default BodyContent;