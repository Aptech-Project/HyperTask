import React, { useState, useEffect } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userlogout } from "app/auth/store/actions/login.actions";
import Snackbar from '@material-ui/core/Snackbar';
import history from "@history";
import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';
function UserMenu(props) {
    const user = useSelector(state => state.login.userAuth);
    const dispatch = useDispatch();
    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };
    const logoutDispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {
        if (user === 'undefined') {
            setIsAdmin(true)
        }
        if (user !== 'undefined') {
            setIsAdmin(false)
        }
    }, [user])
    const [account, setAccount] = useState([]);
    useEffect(() => {
        if (user !== 'undefined') (
            axios.get(`http://localhost:4000/api/v1/get-user/${user}`)
                .then(function (response) {
                    setAccount(response.data)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        )

    }, [])
    return (
        <React.Fragment>

            <Button className="h-64" onClick={userMenuClick}>
                {
                    isAdmin ? (
                        <Avatar className="" alt="user photo" >
                            <Icon style={{ fontSize: '30px' }}>person</Icon>
                        </Avatar>
                    )
                        :
                        (
                            <Avatar className="">
                                <Icon style={{ fontSize: '30px' }}>person</Icon>
                            </Avatar>
                        )
                }
                <div className="hidden md:flex flex-col ml-12 items-start">
                    {
                        isAdmin ? (
                            <Typography component="span" className="normal-case font-600 flex">
                                Account
                            </Typography>
                        )
                            :
                            (
                                <Typography component="span" className="normal-case font-600 flex">
                                    {account.fullname}
                                </Typography>
                            )
                    }

                    <Typography className="text-11 capitalize" color="textSecondary">
                        {/* {user.role.toString()} */}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                {isAdmin ? (
                    <React.Fragment>
                        <MenuItem component={Link} to="/login">
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Login" />
                        </MenuItem>
                        <MenuItem component={Link} to="/register">
                            <ListItemIcon className="min-w-40">
                                <Icon>person_add</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Register" />
                        </MenuItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile" />
                        </MenuItem>
                        <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Inbox" />
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                logoutDispatch(userlogout());
                                dispatch(showMessage({ message: 'Log out !!!' }));
                                history.push({
                                    pathname: "/login",
                                });
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout" />
                        </MenuItem>
                    </React.Fragment>
                )}
            </Popover>
        </React.Fragment>
    );
}

export default UserMenu;
