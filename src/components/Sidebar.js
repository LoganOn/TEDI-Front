import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import {SidebarData} from './SidebarData';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from './img/src_avatar.svg'
import bxMenu from '@iconify-icons/bx/bx-menu';
function Sidebar() {

    const [visible, setVisible] = useState(true);

    return(
        <body id="body-pd" className={ `${visible ? 'body-pd' : '' }`}>
        <header className={ `${visible ? 'header body-pd' : "header" }`} id="header">
            <div className="header__toggle" onClick={() => setVisible(prev => !prev)}>
                <i className='bx bx-menu' id="header-toggle"> {visible ? <MenuIcon/> : <CloseIcon/> }</i>
            </div>

            <div className="header__img">
                <img src={Avatar} alt=""/>
            </div>
        </header>
        <div className={ `${visible ? 'l-navbar show' : "l-navbar"}`} id="nav-bar">
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