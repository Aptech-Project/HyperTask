import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import { useForm } from '@fuse/hooks';
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
import AboutForm from "./AboutForm"
import * as actionsLogin from "app/auth/store/actions/login.actions";

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
    const [account, setAccount] = useState(null);
    const [info, setInfo] = useState(null);
    const [edit, setEdit] = useState(false);
    const [user1, setUser1] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        setAccount([])
    }, []);
    console.log("list")
    console.log(list)
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
    if (!account) {
        return null
    }
    if (!info) {
        return null
    }
    // let p2 = Object.assign({}, person);
    let tmpAccount = Object.assign({}, account)
    tmpAccount.info = info
    console.log("tmpAccount")
    console.log(tmpAccount)
    // if (!user1) {
    //     return null
    // }
    console.log("account");
    // console.log(account ? JSON.parse(account.info) : "avc");
    const clickEdit = e => {
        setEdit(!edit)
    }
    console.log("profile")
    console.log(profile)

    return (
        <div className="md:flex max-w-2xl">

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
                                <Typography className="font-bold mb-4 text-15">Birthday</Typography>
                                <Typography>{info.birthday}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Address</Typography>

                                <Typography>{info.address}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                <Typography>{info.phoneNumber}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Email</Typography>
                                <Typography>{account.email}</Typography>
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
        </div >
    );
}
const mapStateToProps = state => ({
    userList: state.register.listUser
})
// export default AboutTab;
export default connect(mapStateToProps)((AboutTab))
