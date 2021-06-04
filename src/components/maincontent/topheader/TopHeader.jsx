import React from 'react';
import './TopHeader.scss'

function TopHeader(props) {
    return (
        <div className="top-header">
            <div className="title">{props.title}</div>
        </div>
    );
}

export default TopHeader;