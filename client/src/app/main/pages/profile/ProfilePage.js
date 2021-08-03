import React, { useState, useEffect } from 'react';
import { Avatar, Button, Tab, Tabs, Typography, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import TimelineTab from './tabs/TimelineTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import AboutTab from './tabs/about/AboutTab';
import SecurityTab from './tabs/security/SecurityTab';
import CardsTab from './tabs/cards/CardsTab';
import ContactTab from './tabs/contact/ContactsApp';
import withReducer from "app/store/withReducer";
import reducer from "./tabs/store/reducers";

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "./tabs/store/actions/about.action";

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height: 320,
        minHeight: 320,
        [theme.breakpoints.down('md')]: {
            height: 240,
            minHeight: 240
        }
    }
}));

function ProfilePage() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const user = useSelector(state => state.login.userAuth);
    const profile = useSelector(state => state.login.findId)
    const [account, setAccount] = useState(null);
    const [info, setInfo] = useState(null);
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
        }
    }, [account]);
    if (!account) {
        return null
    }
    if (!info) {
        return null
    }
    console.log("addressaddress")
    console.log(info.avatar.replaceAll(" ", "%20"))
    return (
        <FusePageSimple
            classes={{
                header: classes.layoutHeader,
                toolbar: "px-16 sm:px-24"
            }}
            header={
                <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                    <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            {/* <Avatar className="w-96 h-96" src={info.avatar ? info.avatar : "assets/images/avatars/Velazquez.jpg"} */}
                            <Avatar className="w-96 h-96" src={info.avatar ? info.avatar.replaceAll(" ", "%20") : "assets/images/avatars/Velazquez.jpg"}
                            />
                        </FuseAnimate>

                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="md:ml-24" variant="h4" color="inherit">{account.fullname}</Typography>
                        </FuseAnimate>

                    </div>
                    {/* 
                    <div className="flex items-center justify-end">
                        <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                        <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                    </div> */}
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
                        }} label="Contact " />
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Security " />
                </Tabs>
            }
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 && (
                        <AboutTab />
                    )}
                    {selectedTab === 1 &&
                        (
                            <TimelineTab />
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
        />
    )
}
export default withReducer("ProfilePage", reducer)(ProfilePage);

