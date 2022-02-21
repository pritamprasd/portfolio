import { Button, Dialog, Grid, Input, SimpleGrid, Text, TextInput } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import { db } from '../../../index-db';
import { IoMdTrash, IoMdClipboard, IoMdRemoveCircleOutline } from 'react-icons/io';

function CopyBoard() {
    const [clipboard, setclipboard] = useState<string>('');
    let allclips = useLiveQuery(
        () => db.table("clipboard").toArray()
    );
    const handleInputKeyDown = (e: any) => {
        if (e.keyCode == 13) {
            db.table("clipboard").put({
                text: e.target.value,
                is_deleted: false,
                created_at: Date.now(),
                type: 'text'
            })
            setclipboard('');
        }
    }
    const clearAllClips = () => {
        db.table("clipboard").clear();
        allclips = []
    }
    return (
        <>
            <Grid>
                <Grid.Col span={9}>
                    <TextInput value={clipboard} onKeyDown={handleInputKeyDown} onChange={e => setclipboard(e.target.value)} />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button leftIcon={<IoMdTrash />} onClick={clearAllClips} style={{backgroundClip: '#1981C0'}}> Clear all</Button>
                </Grid.Col>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {allclips && allclips.map(c => <CopyTiles clip={c['text']} id={c['id']} />)}
            </div>
        </>
    );
}

interface IPropCopyTiles {
    clip: string,
    id: number
}

function CopyTiles(p: IPropCopyTiles) {
    const [copied, setcopied] = useState(false);    
    const handleOnCopyClick = () => {
        navigator.clipboard.writeText(p.clip);
        setcopied(true);
        setTimeout(() => setcopied(false), 1000)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', 
            margin: '0.25rem', alignItems: 'center', background: '#1981C0', borderRadius: '2px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '80%', cursor: 'pointer', alignItems: 'center' }}
                onClick={handleOnCopyClick}>
                <IoMdClipboard style={{ float: 'left', color: 'yellow', padding: '0.25rem' }} />
                <Text key={p.clip} style={{ float: 'left', marginLeft: '0.5rem' }}>{p.clip}</Text>
            </div>
            <IoMdRemoveCircleOutline style={{ cursor: 'pointer' , color: 'red', marginRight: '2rem'}} onClick={() => db.table("clipboard").delete(p.id)} />
            <Dialog opened={copied}  onClose={() => setcopied(false)} size="lg" radius="md" 
                transitionDuration={300} transitionTimingFunction="ease" transition="slide-up"
                style={{background: '#1981C0'}}>
                Copied!!
            </Dialog>
        </div>
    );
}

export default CopyBoard;