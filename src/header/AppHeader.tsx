import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { AppShell, Burger, Header, MediaQuery, Navbar, SimpleGrid, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';

interface IAppHeaderProps{
    opened: boolean
}

function AppHeader(props: IAppHeaderProps) {
    const [displayLinks, setDisplayLinks] = useState<boolean>(props.opened)
    return (
        <>
            <Title order={2}>pritam.dev</Title>
            <SimpleGrid cols={2} hidden={displayLinks}>
                <ThemeIcon>
                    <a href='https://github.com/pritamprasd' style={{color: 'inherit'}}>
                        <AiFillGithub></AiFillGithub>
                    </a>
                </ThemeIcon>
                <ThemeIcon>
                    <a href='https://www.linkedin.com/in/pritamprasd/' style={{color: 'inherit'}}>
                        <AiFillLinkedin></AiFillLinkedin>
                    </a>
                </ThemeIcon>
            </SimpleGrid>
        </>
    );
}

export default AppHeader;