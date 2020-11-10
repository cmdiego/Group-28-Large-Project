import React, { useState } from 'react';
import './Home.css';
import HamburgerMenu from './HamburgerMenu';
function Home () {
    return (
        <div id="outer-container">
            <HamburgerMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
                <h1>Home Page</h1>
            </div>
        </div>
    );
}

export default Home;