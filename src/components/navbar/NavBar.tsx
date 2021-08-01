import React from 'react'
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="logo">
                        <span className="link-text">Portfolio</span>
                        <svg width="40" height="40" viewBox="0 0 118 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M54.5 7L104.5 48.5L54.5 88" stroke="#363636" stroke-width="16"/>
                            <path d="M4 7L54 48.5L4 88" stroke="#919191" stroke-width="12"/>
                        </svg>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0312 27.1875L33.9688 0.5H36.0312L18.875 28.7188V46H17.1875V28.7188L0.03125 0.5H2.28125L18.0312 27.1875Z" fill="#FEFEFE"/>
                        </svg>
                        <span className="link-text">Playlist</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.2188 32.4062H6.9375L1.875 46H0.03125L17.0625 0.5H19.125L36.1562 46H34.3125L29.2188 32.4062ZM7.5625 30.7188H28.5938L18.0938 2.53125L7.5625 30.7188Z" fill="#FEFEFE"/>
                        </svg>
                        <span className="link-text">Apps</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <svg width="24" height="32" viewBox="0 0 56 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2812 43.1875L16.3438 35.6875L27.0938 0.5H28.9688L39.6562 35.6875L41.6875 43.1875L43.8125 35.6875L53.1875 0.5H55.0312L42.7812 46H40.875L29.5938 8.0625L28 3.25L26.4688 8.0625L15.0938 46H13.1875L0.90625 0.5H2.78125L12.2188 35.6875L14.2812 43.1875Z" fill="#FEFEFE"/>
                        </svg>
                        <span className="link-text">WebAPI Examples</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.2188 32.4062H6.9375L1.875 46H0.03125L17.0625 0.5H19.125L36.1562 46H34.3125L29.2188 32.4062ZM7.5625 30.7188H28.5938L18.0938 2.53125L7.5625 30.7188Z" fill="#FEFEFE"/>
                        </svg>
                        <span className="link-text">Articles</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
