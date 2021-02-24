import React, {useState, useEffect} from 'react';
import "../css/SideBar.scss";
import {SidebarData} from './SidebarData';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from './img/src_avatar.svg'
import Logo1 from './img/favicon1.ico'
import {useDispatch} from "react-redux";
import action from "./action/ChangeWidthAction";
import NotifyMe from './NotifyMe';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {

    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    const [showCount, setShowCount] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [raedIndex, setReadIndex] = useState(0);
    const [sortedByKey, setSortedByKey] = useState(false);
    const [email, setEmail] = useState("");
    const [notification, setNotification] = useState([]);


    const data = []

    useEffect(() => {


    }, [data]);

    const showSidebar = () => {
        setVisible(prev => !prev)
        dispatch(action(!visible))
    }

    // const logout = () => {
    //     axios
    //         .post(`http://localhost:8080/api/logout`)
    //         .then((response) => {
    //             console.log("response.data")
    //         })
    //    // this.props.history.push('/login');
    // }


    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`)
            .then((response) => {
                // console.log(response.data)
                setEmail(response.data.email)
            })
        axios
            .get(`http://localhost:8080/api/notifications/users/${localStorage.getItem("userId")}`)
            .then((response) => {
                //setEmail(response.data.email)
                setNotification(response.data)
                console.log(response)
            })
    }, [])

    const updateNotification = (props) => {
        let tempArray = [];
        props.forEach(data => {
            let temp = this.createData(data.creationDate, data.content, data.reader)
            tempArray.push(temp)
        })
        setNotification(tempArray);
    }
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }

    return (
        <div id="body-pd" className={`myBody ${visible ? 'body-pd' : ''}`}>
            <header className={`${visible ? 'header body-pd' : "header"}`} id="header">
                <div className="header__toggle" onClick={() => showSidebar()}>
                    <i className='bx bx-menu' id="header-toggle"> {visible ? <MenuIcon/> : <CloseIcon/>}</i>
                </div>
                <div className="header-container-not-btn">
                    <NotifyMe className="notify-button"
                              data={notification}
                              storageKey='notific_key'
                              notific_key='creationDate'
                              notific_value='content'
                              heading='Notification Alerts'
                              sortedByKey={false}
                              showDate={true}
                              size={40}
                              color="white"
                    />

                    <div className="header__img">
                        {/*<a>{email}</a>*/}
                        <DropdownButton className="dropdownButton" bsPrefix="dropdown-toggle btn btn-secondary"
                                        id="dropdown-header__img-button" title={email}>
                            <Dropdown.Item className="dropdownButton" as="button">Action</Dropdown.Item>
                            <Dropdown.Item className="dropdownButton" as="button">Another action</Dropdown.Item>
                            <Dropdown.Item className="dropdownButton" as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        {/*<img src={Avatar} alt=""/>*/}
                    </div>
                </div>
            </header>
            <div className={`${visible ? 'l-navbar show' : "l-navbar"}`} id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav__list">
                            <a className="nav__logo">
                                <img className='nav__logo-icon' src={Logo1}></img>
                                <span className="nav__logo-name">T-EDI</span>
                            </a>
                            {SidebarData.map((val, key) => {
                                return (
                                    <a className="nav__link" id={window.location.pathname == val.link ? "active" : ""}
                                       key={key} onClick={() => {
                                        window.location.pathname = val.link
                                    }}>
                                        {" "}
                                        <div id="nav__icon">{val.icon}</div>
                                        <div id="nav__name">{val.title}</div>
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