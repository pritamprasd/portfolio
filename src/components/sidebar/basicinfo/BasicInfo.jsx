import React from 'react';
import './BasicInfo.scss'

function BasicInfo(props) {
    return (
        <div>
            <div className="name">Pritam Prasad</div>
            <div className="profession">Web Developer</div>
            <div className="location">Bengaluru, India</div>
            <div className="email">mail@pritamprasad.com</div>
        </div>
    );
}

export default BasicInfo;