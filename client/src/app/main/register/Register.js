import React, { useState } from 'react'
import { Card, CardContent, Tab, Tabs, Typography, Icon } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Auth0RegisterTab from './tabs/Auth0RegisterTab';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import history from '@history';
const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText,
        backgroundImage: `url('assets/images/backgrounds/dark-material-bg.jpg')`,
        backgroundSize: 'cover',
    }
}));

function Register() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    let user = useSelector(state => state.login.userAuth);
    if (user !== 'undefined') {
        history.push({
            pathname: "/",
        });
    }
    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/hypertask.svg" alt="logo" />
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="max-w-612 mt-16">
                        Join Our Community!
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="h5" color="inherit" className="max-w-500 font-light pt-16">
                    Create an account and discovering the usability and convenience we designed for you!
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-100 ">

                        <Typography variant="h6" className="text-center md:w-full mb-32">CREATE AN ACCOUNT</Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="mb-32"
                        >
                            <Tab
                                icon={<Icon style={{ fontSize: '50px' }}>account_circle</Icon>}
                                className="min-w-0"
                                label="HyperTask"
                            />
                        </Tabs>
                        {selectedTab === 0 && <Auth0RegisterTab />}

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Already have an account?</span>
                            <Link className="font-medium" to="/login">Login</Link>
                        </div>

                        <div className="flex flex-col items-center">
                        </div>
                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Register;
