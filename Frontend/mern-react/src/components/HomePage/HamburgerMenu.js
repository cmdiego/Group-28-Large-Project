import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './HamburgerMenu.css';

export default props => {
    return (
        
        <Menu>
            <a className="menu-item" href="/appointments">Appointments</a>
        </Menu>
    );
};