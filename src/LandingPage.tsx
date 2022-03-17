import { Button, Grid } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateVisiblePage } from './pages/pagesSlice';
import './LandingPage.css'
import { styles } from './storage/data';

function LandingPage() {
    const dispatch = useDispatch();
    var Coder = require('./assets/pngs/man_working.png');
    return (
        <div style={{display:'flex', flexDirection: 'column', height: '100vh', width: '100%', 
                        alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
            {/* <img src={Coder} /> */}
            <h1>Portfolio</h1>
            <p style={{color: styles.primary_error}}>pritam.dev</p>
            <button onClick={() => dispatch(updateVisiblePage('default'))}>Explore</button>
        </div>
    );
}

export default LandingPage;