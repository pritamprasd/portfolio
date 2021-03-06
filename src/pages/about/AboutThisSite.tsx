import { Box, Divider, List, Space, Text } from '@mantine/core';
import React from 'react';
import { SiMinutemailer } from 'react-icons/si';
import { CgWebsite } from 'react-icons/cg';
import { AiFillGithub } from 'react-icons/ai';


function AboutThisSite() {
    return (
        <div>
            <Text>
                After working for sometime in backend side of code, thought of giving frontend a try.
                And whats best than building self portfolio along with some cool in browser tools.
                Bdt, as you already have gussed, I'm terrible in UX &#128513;
                <Space h="lg" />
                <Box>Also, all the data used here are either consumed through public APIs(Github API) or
                    generated by user, So you can be rest assure if you clone this repo and modify it,
                    there won't be much issue.</Box>
                <Space h="lg" />
                <List>
                    <List.Item>The site is built on React with Typescript</List.Item>
                    <List.Item>Deployed via Cloudflare pipeline</List.Item>
                    <List.Item>Uses IndexDB heavily</List.Item>
                </List>
                <Text variant="link" component="a" href="https://github.com/pritamprasd/portfolio">
                    <AiFillGithub /> https://github.com/pritamprasd/portfolio
                </Text>
            </Text>
            <Divider style={{ padding: '0.3rem', margin: '0.3rem' }} />
            <Text>Open Source projects used:</Text>
            <List>
                <List.Item>Monaco Editor: https://github.com/microsoft/monaco-editor</List.Item>
                <List.Item>Mantine components library: https://github.com/mantinedev/mantine</List.Item>
                <List.Item>Dexie lib: https://github.com/dexie/Dexie.js</List.Item>
            </List>
            <Divider style={{ padding: '0.3rem', margin: '0.3rem' }} />
            <Text>Bookmarks</Text>
            <List>
                <List.Item>Code Editor: <a href='/?p=editor'>pritam.dev/?p=editor</a></List.Item>
                <List.Item>Text Editor: <a href='/?p=text-editor'>pritam.dev/?p=text-editor</a></List.Item>
                <List.Item>Copy Board: <a href='/?p=copy'>pritam.dev/?p=copy</a></List.Item>
            </List>
            <Divider style={{ padding: '0.3rem', margin: '0.3rem' }} />
            <Text>Extrenal Assets used:</Text>
            <List>
                <List.Item>https://codepen.io/vaibhavarora/pen/xmpxjp</List.Item>
            </List>
            <Divider style={{ padding: '0.3rem', margin: '0.3rem' }} />
            <Text color="dimmed">
                <Text>Contact:</Text>
                <Text><SiMinutemailer /> mail: mail@pritam.dev</Text>
                <Text><CgWebsite /> site: pritam.dev</Text>
                <Text><AiFillGithub /> github: github.com/pritamprasd</Text>
            </Text>
        </div>
    );
}

export default AboutThisSite;