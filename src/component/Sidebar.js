import React, { useState, useEffect } from 'react';
import "../css/Sidebar.css";
import {SidebarData} from './SidebarData';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from './img/src_avatar.svg'
import Logo1 from './img/favicon1.ico'
import {useDispatch} from "react-redux";
import action from "./action/ChangeWidthAction";
import NotifyMe from 'react-notification-timeline';
import axios from "axios";

function Sidebar() {

    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    const [showCount, setShowCount] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [raedIndex, setReadIndex] = useState(0);
    const [sortedByKey, setSortedByKey] = useState(false);


    const data =  [
        {
            "update":"70 new employees are shifted",
            "timestamp":1596119688264
        },
        {
            "update": "Time to Take a Break, TADA!!!",
            "timestamp":1596119686811
        },
        {
            "update":"70 new employees are shifted",
            "timestamp":1596119688264
        },
        {
            "update": "Time to Take a Break, TADA!!!",
            "timestamp":1596119686811
        }
    ]

    // useEffect(() => {
    //     // if (!sortedByKey) {
    //     //     data.sort((a, b) => b[key] - a[key]);
    //     // }
    //
    //     let readItemLs = reactLocalStorage.getObject(storageKey);
    //     let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs['id'] : '';
    //
    //     let readIndex = (readMsgId === '') ? data.length :
    //         data.findIndex(
    //             elem =>
    //                 elem[key] === readMsgId);
    //
    //
    //     readIndex === -1 ? readIndex = data.length : readIndex;
    //     setReadIndex(readIndex);
    //
    //     (data.length && readIndex) > 0 ?
    //         setShowCount(true) : setShowCount(false);
    //     setMessageCount(readIndex);
    //
    // }, [data]);

    const showSidebar = () => {
        setVisible(prev => !prev)
        dispatch(action(!visible))
    }

    const logout = () => {
        axios
            .post(`http://localhost:8080/api/logout`)
            .then((response) => {
                console.log("response.data")
            })
       // this.props.history.push('/login');
    }

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }

    return(
        <div id="body-pd" className={ `myBody ${visible ? 'body-pd' : '' }`}>
        <header className={ `${visible ? 'header body-pd' : "header" }`} id="header">
            <div className="header__toggle" onClick={() => showSidebar()}>
                <i className='bx bx-menu' id="header-toggle"> {visible ? <MenuIcon/> : <CloseIcon/> }</i>
            </div>
            <NotifyMe
                data={data}
                storageKey='notific_key'
                notific_key='timestamp'
                notific_value='update'
                heading='Notification Alerts'
                sortedByKey={false}
                showDate={true}
                size={32}
                color="yellow"
            />
            <div className="header__img" onClick={() => logout()}>

                {/*<div className="notification-container">*/}
                {/*    <div className =*/}
                {/*             {*/}
                {/*                 showCount ?*/}
                {/*                     'notification notify show-count' :*/}
                {/*                     'notification notify'*/}
                {/*             }*/}
                {/*         data-count={messageCount}*/}
                {/*         onClick={event => handleClick(event)}>*/}
                {/*        <Bell color="yellow" size={64} />*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                        })}
                    </div>
                </div>
            </nav>
        </div>
        </div>
    )
}

export default Sidebar;