import { Divider, List, Text } from '@mantine/core';
import React from 'react';
import {SiMinutemailer} from 'react-icons/si';
import {CgWebsite} from 'react-icons/cg';
import { AiFillGithub } from 'react-icons/ai';

function AboutThisSite() {
    return (
        <div>
            <Text>
            After working for sometime in backend side of code, thought of giving frontend a try. 
            And whats best than building self portfolio along with some cool in browser tools.
            Bdt, as you already have gussed, I'm terrible in UX &#128513;
            </Text>
            <Divider style={{padding: '0.2rem'}}/>
            <Text>Open Source projects used:</Text>
            <List>
                <List.Item>Monaco Editor: https://github.com/microsoft/monaco-editor</List.Item>
                <List.Item>Mantine components library: https://github.com/mantinedev/mantine</List.Item>
            </List>
            <Divider style={{padding: '0.2rem'}}/>
            <Text color="dimmed">
                Contact Details:
                <Text><SiMinutemailer/> mail: mail@pritam.dev</Text>
                <Text><CgWebsite/> site: pritam.dev</Text>
                <Text><AiFillGithub/> github: github.com/pritamprasd</Text>
            </Text>
            
            
        </div>
    );
}

export default AboutThisSite;