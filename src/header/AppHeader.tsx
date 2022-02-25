import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { SimpleGrid, ThemeIcon, Title} from '@mantine/core';
import { IconType } from 'react-icons/lib';
import { styles } from '../data';

interface IAppHeaderProps{
    opened: boolean
}

function AppHeader(props: IAppHeaderProps) {
    const [displayLinks, setDisplayLinks] = useState<boolean>(props.opened)
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Title order={2}>pritam.dev</Title>
        </div>
    );
}

export default AppHeader;