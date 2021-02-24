import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import { AiFillBook } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

export const SidebarData = [
    {
        title:"Zamówienia",
        icon:<AiFillBook />,
        link:"/home",
    },
    {
        title:"Relacje",
        icon:<AiOutlineUser />,
        link:"/relation",
    },
    {
        title:"Towary",
        icon:<AiFillDatabase />,
        link:"/analiytics",
    }
];