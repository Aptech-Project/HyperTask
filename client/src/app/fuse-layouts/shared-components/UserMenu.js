import React, { useState, useEffect } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userlogout } from "app/auth/store/actions/login.actions";
import history from "@history";
import * as actions from "app/auth/store/actions/login.actions";
import { showMessage } from 'app/store/actions/fuse';
import { connect } from "react-redux";
import { setUserStatus } from './chatPanel/store/actions';
function UserMenu(props) {

    const user = useSelector(state => state.login.userAuth);
    const profile = useSelector(state => state.login.findId)
    const dispatch = useDispatch();
    const [userMenu, setUserMenu] = useState(null);
    const [avatar, setAvatar] = useState("");

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
    useEffect(() => {
        if (profile && profile !== 'undefined' && profile !== []) {
            setAvatar(JSON.parse(profile.info).avatar)
        }
    }, [profile]);
    const [account, setAccount] = useState([]);
    const user1 = useSelector(state => state.login.findId)
    useEffect(() => {
        if (user !== 'undefined') (
            props.findid(user)
        )
    }, [user])
    useEffect(() => {
        if (user1 !== undefined) (
            setAccount(user1)
        )

    }, [user1])
    return (
        <React.Fragment>

            <Button className="h-64" onClick={userMenuClick}>
                <Avatar className="w-30 h-30" src={avatar || "assets/images/avatars/default-avatar.png"} />
                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {account.fullname}
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
                                props.setUserOffline(user, false)
                                logoutDispatch(userlogout());
                                dispatch(showMessage({ message: 'Log out !!!', variant: "success" }));
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
const mapActionToProps = {
    findid: actions.fetchById,
    setUserOffline: setUserStatus,
}
export default connect(null, mapActionToProps)(UserMenu);
