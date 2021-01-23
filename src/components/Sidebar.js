import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import {SidebarData} from './SidebarData';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from './img/src_avatar.svg'
function Sidebar() {

    const [visible, setVisible] = useState(false);

    return(
        <body id="body-pd">
        <header className="header" id="header">
            <div className="header__toggle" onClick={() => setVisible(prev => !prev)}>
                <i className='bx bx-menu' id="header-toggle"><MenuIcon/></i>
                {visible ? 'TRUE' : 'FALSE'}
            </div>

            <div className="header__img">
                <img src={Avatar} alt=""/>
            </div>
        </header>
        <div className="l-navbar" id="nav-bar">
        <nav className= "nav" >
        <div className="Sidebar">
            <ul className="SidebarList">
            {SidebarData.map((val,key) =>{
                return(
                    <li className="Row" id={window.location.pathname == val.link ? "active" : ""} key={key} onClick={() => {window.location.pathname = val.link}}>
                        {" "}
                        <div id = "icon">{val.icon}</div>{" "}
                        <div id = "title">{val.title}</div>
                    </li>
                )
            })}
            </ul>
        </div>
        </nav>
        </div>
        </body>
    )
}

export default Sidebar;