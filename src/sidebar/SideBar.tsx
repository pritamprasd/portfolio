import { Text } from '@mantine/core';
import React, { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { useDispatch } from 'react-redux';
import { data } from '../data';
import { updateVisiblePage } from '../pages/pagesSlice';

interface ISideBarProps {
    activePage: string,
    clickedPage: Function
}

const navbarTextColor:string = '#A6A7AB';

function SideBar(props: ISideBarProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', color: navbarTextColor}}>
            <Links pageName='projects' clickedPage={props.clickedPage}/>
            <Links pageName='tools' clickedPage={props.clickedPage}/>
        </div>
    );
}

interface ISidebarlinkProp{
    pageName: string,
    clickedPage: Function    
}

function Links(props: ISidebarlinkProp) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>(data.pages[props.pageName].title);
    const [linkIcon, setLinkIcon] = useState<IconType>(data.pages[props.pageName].icon);
    return (
        <div style={{cursor: 'pointer', display: 'flex', flexDirection:'row', alignItems: 'center'}} 
        onClick={() => dispatch(updateVisiblePage(props.pageName))}>
            {linkIcon}
            <Text style={{padding: '0.5rem'}}>{title}</Text>                
        </div>
    );
}

export default SideBar;