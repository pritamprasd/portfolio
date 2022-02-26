import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Button, Grid, Group, Menu, Modal, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconType } from 'react-icons/lib';
import { styles } from '../storage/data';
import { BsGearWideConnected } from 'react-icons/bs';
import { ImBin } from 'react-icons/im';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, normalizedTableNames } from '../storage/index-db';

interface IAppHeaderProps {
    opened: boolean
}

function AppHeader(props: IAppHeaderProps) {
    const [opened, setOpened] = useState(false);
    return (<>
        <Modal centered opened={opened} onClose={() =>  setOpened(false)} title="Delete data from IndexDb Tables &#10071;&#10071;&#10071;" size="lg">
            <DeleteIndexDbModal/>
        </Modal>
        <Title order={2}>pritam.dev</Title>
        <Menu delay={500} size="md" style={{ 
            height: '70%', 
            marginLeft: 'auto',
            }}>
            <Menu.Label>Site Settings</Menu.Label>
            <Menu.Item icon={<ImBin />} onClick={() => setOpened(true)}>Clear IndexDB</Menu.Item>
        </Menu>
    </>
    );
}

function DeleteIndexDbModal() {
    let allTables = useLiveQuery(
        () => db.tables
    );
    const handleDeleteClick = (tableName: string) => {
        db.table(tableName)
        .clear()
        .then(() => alert(`${tableName} deleted`))
        .catch((e) => alert(`${tableName} can not be deleted!. Error: ${JSON.stringify(e)}`))
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {allTables?.map(t=> 
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '1rem'}}>               
                    <Text>&#9888; {normalizedTableNames[t.name.toString()]}</Text>
                    <Button size="sm" style={{backgroundColor: styles.primary_error, borderRadius: '0.5rem'}} 
                        onClick={() => handleDeleteClick(t.name.toString())}>Delete</Button>
                </div> 
            )}
        </div>
    );
}

export default AppHeader;