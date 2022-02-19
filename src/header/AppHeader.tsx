import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { AppShell, Burger, Header, MediaQuery, Navbar, SimpleGrid, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import { IconType } from 'react-icons/lib';

interface IAppHeaderProps{
    opened: boolean
}

function AppHeader(props: IAppHeaderProps) {
    const [displayLinks, setDisplayLinks] = useState<boolean>(props.opened)
    return (
        <>
            <Title order={2}>pritam.dev</Title>
            <SimpleGrid cols={2} hidden={displayLinks}>
                <ThemedIcon icon={AiFillGithub} link='https://github.com/pritamprasd' />
                <ThemedIcon icon={AiFillLinkedin} link='https://www.linkedin.com/in/pritamprasd/' />
            </SimpleGrid>
        </>
    );
}

interface ThemedIconProps{
    icon: IconType,
    link: string
}

function ThemedIcon(props: ThemedIconProps){
    return(
        <ThemeIcon>
            <a href={props.link} style={{color: 'inherit'}}>
                <props.icon></props.icon>
            </a>
        </ThemeIcon>
    );
}

export default AppHeader;