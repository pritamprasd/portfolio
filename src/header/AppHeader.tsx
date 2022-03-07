import React, { useState } from 'react';
import { BiRefresh } from 'react-icons/bi'
import { Button, Grid, Group, Menu, Modal, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconType } from 'react-icons/lib';
import { styles } from '../storage/data';
import { FcDeleteDatabase } from 'react-icons/fc';
import { ImBin } from 'react-icons/im';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, normalizedTableNames } from '../storage/index-db';

interface IAppHeaderProps {
    opened: boolean
}

function AppHeader(props: IAppHeaderProps) {
    const [openDeleteTables, setOpenDeleteTablesModal] = useState(false);
    const [openClearIndexDB, setOpenClearIndexDB] = useState(false);
    return (<>
        <Modal centered opened={openDeleteTables} onClose={() =>  setOpenDeleteTablesModal(false)} title="Delete data from IndexDb Tables &#10071;&#10071;&#10071;" size="lg">
            <DeleteTables/>
        </Modal>
        <Modal centered opened={openClearIndexDB} onClose={() =>  setOpenClearIndexDB(false)} title="Refresh IndexDB" size="sm">
            <ClearIndexDB/>
        </Modal>
        <Title order={2}>pritam.dev</Title>
        <Menu delay={500} size="md" style={{ 
            height: '70%', 
            marginLeft: 'auto',
            }}>
            <Menu.Label>Site Settings</Menu.Label>
            <Menu.Item icon={<ImBin />} onClick={() => setOpenDeleteTablesModal(true)}
                style={{padding: '0.5rem'}}
            >Clear Data</Menu.Item>
            <Menu.Item icon={<BiRefresh />} onClick={() => setOpenClearIndexDB(true)}
                style={{padding: '0.5rem'}}
            >Refresh IndexDB</Menu.Item>
        </Menu>
    </>
    );
}

function ClearIndexDB() {
    const onRefreshButtonClick = async() => {
        await db.delete();
        alert('IndexDB Refreshed!!!');
        window.location.reload();
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem'}}>
            <Text color='red' size='lg'>Caution: This will erase all saved data!!!</Text>
            <Button onClick={onRefreshButtonClick}>Refresh IndexDB</Button>
        </div>
    );
}

function DeleteTables() {
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
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                            alignItems:'center', margin: '1rem'}}>               
                    <Text><FcDeleteDatabase size="1.5rem"/> {normalizedTableNames[t.name.toString()]}</Text>
                    <Button size="sm" style={{backgroundColor: styles.primary_error, borderRadius: '0.5rem'}} 
                        onClick={() => handleDeleteClick(t.name.toString())}>Delete</Button>
                </div> 
            )}
        </div>
    );
}

export default AppHeader;