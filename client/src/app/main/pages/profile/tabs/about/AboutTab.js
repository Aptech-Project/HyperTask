import React, { useEffect, useState } from 'react';
import { Tooltip, DialogActions, Dialog, Avatar, AppBar, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import { useForm } from '@fuse/hooks';
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
import AboutForm from "./AboutForm"
import * as actionsLogin from "app/auth/store/actions/login.actions";
import * as Action from '../store/actions/about.action';

let initialFieldValues = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    contact: null,
    info: null,
    passwordconfirm: ''
}
const AboutTab = ({ ...props }) => {

    const profile = useSelector(state => state.login.findId)
    const list = useSelector(state => state.ProfilePage.about)
    const uploadData = useSelector(state => state.ProfilePage.about.uploadData)
    let allfriend = useSelector(state => state.ProfilePage.about.listfriend)
    const [account, setAccount] = useState(null);
    const [info, setInfo] = useState(null);
    const [edit, setEdit] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);
    const [user1, setUser1] = useState(null)
    const [open, setOpen] = useState(false);
    const [friends, setFriends] = useState([])
    function closeComposeDialog() {
        setAvatar(info.avatar)
        setOpen(false)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        setAccount([])
        dispatch(Action.fetchAllFriend(localStorage.getItem('user_authenticated')))
    }, []);
    useEffect(() => {
        if (profile !== 'undefined') (
            setAccount(profile)
        )
    }, [profile,]);
    useEffect(() => {
        if (account && account !== 'undefined' && account !== []) {
            setInfo(JSON.parse(account.info))
            setEdit(false)
        }
    }, [account]);
    useEffect(() => {
        setAvatar(uploadData.fileUrl)
    }, [uploadData]);
    useEffect(() => {
        if (info) {
            setAvatar(info.avatar)
        }
    }, [info]);
    useEffect(() => {
        if (allfriend !== undefined) (
            setFriends(allfriend)
        )
    }, [allfriend])
    if (!account) {
        return null
    }
    if (!info) {
        return null
    }
    // let p2 = Object.assign({}, person);
    let tmpAccount = Object.assign({}, account)
    tmpAccount.info = info
    const clickEdit = e => {
        setEdit(!edit)
    }
    const openUploadImage = e => {
        setOpen(true)
    }
    function handleUploadChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setIsChangeAvatar(true)
        dispatch(Action.uploadFile(file, account))
    }
    function handleSubmit(event) {
        event.preventDefault();
        let userUpload = account
        userUpload.info = JSON.parse(userUpload.info)
        userUpload.info.avatar = avatar
        userUpload.info = JSON.stringify(userUpload.info)
        dispatch(Action.uploadAvatar(userUpload))
        setOpen(false)
        setIsChangeAvatar(false)
    }
    function onClickFriend() {
        props.onChangeTab()
    }
    return (
        <div className="md:flex max-w">

            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    General Information
                                </Typography>
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
                                    type="file"
                                    onChange={handleUploadChange}
                                />
                                <Tooltip title="Upload Avatar" placement="bottom">
                                    <Button
                                        onClick={openUploadImage}>
                                        <Icon fontSize="large" color="action">cloud_upload</Icon>

                                    </Button>
                                </Tooltip>
                            </Toolbar>

                        </AppBar>

                        {!edit && <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Full Name</Typography>
                                <Typography>{account.fullname}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Gender</Typography>
                                <Typography>{info.gender}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Email</Typography>
                                <Typography>{account.email}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                <Typography>{info.phoneNumber}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Address</Typography>
                                <Typography>{info.address}</Typography>
                            </div>

                            <Button
                                id="submit1"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16 normal-case"
                                aria-label="Edit"
                                onClick={clickEdit}
                            >
                                {!edit ? "Edit" : "Save"}
                            </Button>
                        </CardContent>}
                        {edit && <AboutForm account={tmpAccount} />}
                    </Card>
                </FuseAnimateGroup>
            </div>
            <div className="flex flex-col md:w-320">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Friends
                                </Typography>
                                <Button className="normal-case" onClick={onClickFriend} color="inherit" size="small">See {friends.length} more</Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List className="p-8">
                                {friends.map((friend) => (
                                    <Tooltip title={friend.fullname} placement="bottom">
                                        {/* <Avatar className="w-64 m-4" src={friend.info || "assets/images/avatars/default-avatar.png"} /> */}
                                        {/* <img key={friend.id} className="w-64 m-4" src={friend.info} alt={friend.fullname} /> */}
                                        <img key={friend.id} className="w-64 m-4" src={friend.info} alt={friend.fullname} style={{ width: "64px", height: "64px" }} />

                                    </Tooltip>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    {/* <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Joined Groups
                                </Typography>
                                <Button className="normal-case" color="inherit" size="small">See 6 more</Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List className="p-0">
                                {groups.map((group) => (
                                    <ListItem key={group.id}>
                                        <Avatar alt={group.name}>{group.name[0]}</Avatar>
                                        <ListItemText
                                            primary={(
                                                <div className="">
                                                    <Typography className="inline font-medium" color="secondary" paragraph={false}>
                                                        {group.name}
                                                    </Typography>

                                                    <Typography className="inline ml-4" paragraph={false}>
                                                        {group.category}
                                                    </Typography>
                                                </div>
                                            )}
                                            secondary={group.members}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <Icon>more_vert</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card> */}
                </FuseAnimateGroup>
            </div>
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                open={open}
                onClose={closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={10}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            Upload avatar
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} />
                        <Typography variant="h6" color="inherit" className="pt-8">

                        </Typography>
                    </div>
                </AppBar>
                <DialogActions className="justify-between pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isChangeAvatar}
                    >
                        Save
                    </Button>
                    <IconButton
                    // onClick={handleRemove}
                    >
                        <label
                            htmlFor="button-file"
                        >
                            <Icon fontSize="large" color="action">cloud_upload</Icon>
                        </label>
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div >
    );
}
const mapStateToProps = state => ({
    userList: state.register.listUser
})
// export default AboutTab;
export default connect(mapStateToProps)((AboutTab))
