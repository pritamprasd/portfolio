import { SimpleGrid, Tabs, Text } from '@mantine/core';
import React from 'react';
import { data, MusicTypes } from '../../storage/data';
import { RiPlayList2Fill } from 'react-icons/ri'

interface ISongsProps {

}

function Music(props: ISongsProps) {
    return (
        <Tabs>
            <Tabs.Tab label="YT-Playlists" icon={<RiPlayList2Fill />}>
                <Playlist />
            </Tabs.Tab>
            <Tabs.Tab label="Songs" icon={<RiPlayList2Fill />}>
                <IndividualSongs />
            </Tabs.Tab>
            <Tabs.Tab label="Champs" icon={<RiPlayList2Fill />}>
                <Artists/>
            </Tabs.Tab>
        </Tabs>

    );
}

const Artists = () => {
    return(
        <SimpleGrid cols={4}>
        {data.pages['music'].tiles?.filter(m => m.type == MusicTypes.artist)
            .map(m => createYoutubePlaylistIframe(m.id, "300", m.title))}
    </SimpleGrid>
    );
}

const IndividualSongs = () => {
    return (
        <SimpleGrid cols={4}>
            {data.pages['music'].tiles?.filter(m => m.type == MusicTypes.song)
                .map(m => createYoutubePlaylistIframe(m.id, "300", m.title))}
        </SimpleGrid>
    );
}

const Playlist = () => {
    return (
        <SimpleGrid cols={4}
            spacing="lg"
            breakpoints={[
                { maxWidth: 1500, cols: 3, spacing: 'lg' },
                { maxWidth: 1160, cols: 2, spacing: 'md' },
                { maxWidth: 640, cols: 1, spacing: 'lg' },
            ]}>
            {data.pages['music'].tiles?.filter(m => m.type == MusicTypes.playlist)
                .map(m => createYoutubePlaylistIframe(m.id, "400", m.title))}
        </SimpleGrid>
    );
}

export const createYoutubePlaylistIframe = (id: any, height: string, name: string) => {
    return (
        <div>
            <iframe height={height}
                src={"https://www.youtube.com/embed/videoseries?list=" + id}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <Text>{name}</Text>
        </div>
    );
}


export default Music;
