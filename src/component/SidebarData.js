import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';

export const SidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/home",
    },
    {
        title:"Mailbox",
        icon:<MailIcon />,
        link:"/relation",
    },
    {
        title:"Analytics",
        icon:<AssessmentIcon />,
        link:"/analiytics",
    },
    {
        title:"Dashboard",
        icon:<DashboardIcon />,
        link:"/dashboard",
    },
    {
        title:"Friends",
        icon:<GroupIcon />,
        link:"/friends",
    }
];