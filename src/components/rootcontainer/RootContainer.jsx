import React from 'react';
import MainContent from '../maincontent/MainContent';
import SideBar from '../sidebar/SideBar';
import './RootContainer.scss'

function RootContainer(props) {
    return (
        <div className="rootContainer">
            <SideBar/>
            <MainContent/>
        </div>
    );
}

export default RootContainer;