import React, { useState, useEffect } from 'react';
import "../css/Sidebar.css";
import {SidebarData} from './SidebarData';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from './img/src_avatar.svg'
import Logo1 from './img/favicon1.ico'
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
                <div>
                    <div className="nav__list">
                        <a className="nav__logo">
                            <img className='nav__logo-icon' src={Logo1}></img>
                            <span className="nav__logo-name">T-EDI</span>
                        </a>
                        {SidebarData.map((val,key) =>{
                            return(
                                <a className="nav__link" id={window.location.pathname == val.link ? "active" : ""} key={key} onClick={() => {window.location.pathname = val.link}}>
                                    {" "}
                                    <div id = "nav__icon">{val.icon}</div>
                                    <div id = "nav__name">{val.title}</div>
                                </a>
                            )
                        })}}
                    </div>
                </div>
            </nav>
        </div>
        </body>
    )
}

export default Sidebar;