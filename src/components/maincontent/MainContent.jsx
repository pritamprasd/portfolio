import React from 'react';
import ContentPage from './contentpage/ContentPage';
import './MainContent.scss'
import TopHeader from './topheader/TopHeader';

function MainContent(props) {
    return (
        <div className="main-content">
            <TopHeader title="Portfolio"/>
            <ContentPage/>
        </div>
    );
}

export default MainContent;