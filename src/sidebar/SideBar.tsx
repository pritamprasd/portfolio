import { SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import { useDispatch } from 'react-redux';
import { data, navbarTextColor, styles } from '../storage/data';
import { updateVisiblePage } from '../pages/pagesSlice';
import { closeNavbar } from './navbarSlice';
import { GrDocumentPerformance } from 'react-icons/gr';

interface ISideBarProps {
    activePage: string;
    clickedPage: Function;
}

function SideBar(props: ISideBarProps) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', color: navbarTextColor, height: '100vh'}}>
            {/* <Links pageName='default' clickedPage={props.clickedPage}/> */}
            {Object.keys(data.pages).map(p => <Links key={p} pageName={p} clickedPage={props.clickedPage}/>)}
            <SimpleGrid cols={3} style={{marginTop: 'auto', justifyItems: 'center'}}>
                <ThemedIcon key={'11111'} icon={AiFillGithub} link='https://github.com/pritamprasd' />
                <ThemedIcon key={'22222'}  icon={AiFillLinkedin} link='https://www.linkedin.com/in/pritamprasd/' />
                <ThemedIcon key={'22222'}  icon={GrDocumentPerformance} link='https://bit.ly/pritamprasad'/>
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