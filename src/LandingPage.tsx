import React from 'react';
import { useDispatch } from 'react-redux';
import { updateVisiblePage } from './pages/pagesSlice';
import './LandingPage.css'
import { styles } from './storage/data';

function LandingPage() {
    const dispatch = useDispatch();
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '100vh', width: '100%',
            alignItems: 'center', justifyContent: 'center', gap: '1rem'
        }}>
            <div className='circle xxlarge shade1'></div>
            <div className='circle xlarge shade2'></div>
            <div className='circle large shade3'></div>
            <div className='circle mediun shade4'></div>
            <div className='circle small shade5'></div>

            <h1>Portfolio</h1>
            <p style={{ color: styles.primary_error }}>pritam.dev</p>
            <button onClick={() => dispatch(updateVisiblePage('default'))}>Explore</button>
        </div>
    );
}

export default LandingPage;