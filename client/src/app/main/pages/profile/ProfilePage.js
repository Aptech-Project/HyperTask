import React, { useState, useEffect } from 'react';
import { Tooltip, Avatar, Button, Tab, Tabs, Typography, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimateGroup, FusePageSimple, FuseAnimate } from '@fuse';
import ActivityTab from './tabs/activity/ActivityTab';
import AboutTab from './tabs/about/AboutTab';
import SecurityTab from './tabs/security/SecurityTab';
import CardsTab from './tabs/cards/CardsTab';
import ContactTab from './tabs/contact/ContactsApp';
import withReducer from "app/store/withReducer";
import reducer from "./tabs/store/reducers";

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "./tabs/store/actions/about.action";
import WidgetNow from 'app/main/apps/dashboards/project/widgets/WidgetNow';

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height: 160,
        minHeight: 160,
        [theme.breakpoints.down('md')]: {
            height: 120,
            minHeight: 120
        }
    },
    headerIcon: {
        position: 'absolute',
        top: 0,
        left: 320,
        opacity: .04,
        fontSize: 160,
        width: 160,
        height: 160,
        pointerEvents: 'none'
    }
}));

function ProfilePage() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const user = useSelector(state => state.login.userAuth);
    const profile = useSelector(state => state.login.findId)
    const [account, setAccount] = useState(null);
    const [info, setInfo] = useState(null);
    const [avatar, setAvatar] = useState("");
    const [openAvatar, setOpenAvatar] = useState(false);
    useEffect(() => {
        if (profile !== 'undefined') (
            setAccount(profile)
        )
    }, [profile])
    function handleTabChange(event, value) {
        setSelectedTab(value);
    }
    useEffect(() => {
        if (account && account !== 'undefined' && account !== []) {
            setInfo(JSON.parse(account.info))
            setAvatar(JSON.parse(account.info).avatar)
        }
    }, [account]);
    if (!account) {
        return null
    }
    if (!info) {
        return null
    }
    function changeTab() {
        setSelectedTab(3);
    }
    function ClickAvatar() {
        setOpenAvatar(true)
    }
    function closeAvatar() {
        setOpenAvatar(false)
    }
    return (
        <FusePageSimple
            classes={{
                header: classes.layoutHeader,
                toolbar: "px-16 sm:px-24",
                rightSidebar: "w-288",
            }}
            header={
                <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                    <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <div>
                                {selectedTab == 0 && <Tooltip title="Upload Avatar" placement="bottom">
                                    <Avatar style={{ cursor: "pointer" }} className="w-96 h-96" onClick={ClickAvatar} src={avatar || "assets/images/avatars/default-avatar.png"} />
                                </Tooltip>}
                                {selectedTab != 0 && <Avatar className="w-96 h-96" src={avatar || "assets/images/avatars/default-avatar.png"} />}
                            </div>
                        </FuseAnimate>

                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="md:ml-24" variant="h4" color="inherit">{account.fullname}</Typography>
                        </FuseAnimate>

                        <FuseAnimate duration={400} delay={600}>
                            <Typography variant="h6" color="inherit" className="font-lignt mt-8 sm:mt-16 text-right max-w-md mx-auto md:items-start md:flex-shrink-0 md:flex-1 md:text-right">
                                <span className="opacity-75">
                                    View and edit your information, friends list, manage your activities, all in one place!
                                </span>
                            </Typography>
                        </FuseAnimate>

                        <Icon className={classes.headerIcon}>ballot</Icon>

                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    classes={{
                        root: "h-64 w-full border-b-1"
                    }}
                >
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Profile" />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Activity " />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Cards " />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Contacts " />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Security " />
                </Tabs>
            }
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 && (
                        <AboutTab onChangeTab={changeTab} openAvatar={openAvatar} closeAvatar={closeAvatar} />
                    )}
                    {selectedTab === 1 && (
                        <ActivityTab />
                    )}
                    {selectedTab === 2 && (
                        <CardsTab />
                    )}
                    {selectedTab === 3 && (
                        <ContactTab />
                    )}
                    {selectedTab === 4 && (
                        <SecurityTab />
                    )}
                </div>
            }
            rightSidebarContent={
                <FuseAnimateGroup
                    className="w-full"
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <div className="widget w-full p-12">
                        <WidgetNow />
                    </div>
                    <div className="widget w-full p-12">
                        {/* TODO: Add Note widget */}
                    </div>
                </FuseAnimateGroup>
            }
        />
    )
}
export default withReducer("ProfilePage", reducer)(ProfilePage);

