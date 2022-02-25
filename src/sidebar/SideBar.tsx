import { SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import { useDispatch } from 'react-redux';
import { data, navbarTextColor, styles } from '../data';
import { updateVisiblePage } from '../pages/pagesSlice';
import { closeNavbar } from './navbarSlice';

interface ISideBarProps {
    activePage: string;
    clickedPage: Function;
}

function SideBar(props: ISideBarProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', color: navbarTextColor, height: '100vh'}}>
            <Links pageName='default' clickedPage={props.clickedPage}/>
            <Links pageName='portfolio' clickedPage={props.clickedPage}/>
            <Links pageName='projects' clickedPage={props.clickedPage}/>
            <Links pageName='tools' clickedPage={props.clickedPage}/>
            <Links pageName='music' clickedPage={props.clickedPage}/>
            <SimpleGrid cols={2} style={{marginTop: 'auto', justifyItems: 'center'}}>
                <ThemedIcon icon={AiFillGithub} link='https://github.com/pritamprasd' />
                <ThemedIcon icon={AiFillLinkedin} link='https://www.linkedin.com/in/pritamprasd/' />
            </SimpleGrid>
        </div>
    );
}

interface ThemedIconProps{
    icon: IconType,
    link: string
}

function ThemedIcon(props: ThemedIconProps){
    return(
        <ThemeIcon style={{backgroundColor: styles.primary_accent}}>
            <a href={props.link} style={{color: 'inherit'}}>
                <props.icon></props.icon>
            </a>    
        </ThemeIcon>
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
        onClick={() => {
            dispatch(updateVisiblePage(props.pageName))
            dispatch(closeNavbar());
        }}>
            <ThemeIcon style={{backgroundColor: styles.primary_accent}}>{linkIcon}</ThemeIcon>
            <Text style={{padding: '0.5rem'}}>{title}</Text>                
        </div>
    );
}

export default SideBar;