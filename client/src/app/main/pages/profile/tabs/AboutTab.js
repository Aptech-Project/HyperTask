import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';


let initialFieldValues = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    contact: null,
    info: null,
    passwordconfirm: ''
}
function AboutTab() {
    const profile = useSelector(state => state.login.findId)
    const [account, setAccount] = useState(null);
    const [info, setInfo] = useState(null);
    const [edit, setEdit] = useState(false);
    // const dispatch = useDispatch();
    useEffect(() => {
        setAccount([])
    }, []);
    useEffect(() => {
        if (profile !== 'undefined') (
            setAccount(profile)
        )
    }, [profile]);
    useEffect(() => {
        if (account && account !== 'undefined' && account !== []) (
            setInfo(JSON.parse(account.info))
            // initialFieldValues.email = account.email;
        )
    }, [account]);
    if (!account) {
        return null
    }
    if (!info) {
        return null
    }
    console.log("account");
    console.log(account ? JSON.parse(account.info) : "avc");

    const handleSubmit = e => {
        setEdit(!edit)
    }

    const clickEdit = e => {
        if (edit) {

        }
        setEdit(!edit)
    }
    const handleInputChange = e => {

    }
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
                        {edit &&
                            <CardContent>
                                <Formsy
                                    className="flex flex-col justify-center w-full"
                                    onSubmit={handleSubmit}
                                >
                                    <TextField
                                        className="mb-16"
                                        type="text"
                                        name="fullname"
                                        value={account.fullname}
                                        label="Full Name"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
                                        }}
                                        autoComplete='off'
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    // {...(errors.fullname && { error: true, helperText: errors.fullname })}
                                    />
                                    <TextField
                                        className="mb-16"
                                        type="password"
                                        value={account.password}
                                        name="password"
                                        label="Password"
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                        }}
                                        variant="outlined"
                                    // {...(errors.password && { error: true, helperText: errors.password })}
                                    />

                                    <TextField
                                        className="mb-16"
                                        type="password"
                                        value={account.password}
                                        onChange={handleInputChange}
                                        name="passwordconfirm"
                                        label="Confirm Password"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                        }}
                                        variant="outlined"
                                        autoComplete='off'
                                    // {...(errors.passwordconfirm && { error: true, helperText: errors.passwordconfirm })}
                                    />
                                    <Button
                                        id="submit1"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 normal-case"
                                        aria-label="Edit"
                                    >
                                        {!edit ? "Edit" : "Save"}
                                    </Button>
                                </Formsy>
                            </CardContent>
                        }
                    </Card>


                    {/* <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Work
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Occupation</Typography>
                                <Typography>{work.occupation}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Skills</Typography>
                                <Typography>{work.skills}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Jobs</Typography>
                                <table className="">
                                    <tbody>
                                        {work.jobs.map((job) => (
                                            <tr key={job.company}>
                                                <td className="pr-16">
                                                    <Typography>{job.company}</Typography>
                                                </td>
                                                <td>
                                                    <Typography color="textSecondary">{job.date}</Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Contact
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Address</Typography>
                                <Typography>{contact.address}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                                {contact.tel.map((tel) => (
                                    <div className="flex items-center" key={tel}>
                                        <Typography>{tel}</Typography>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Website</Typography>

                                {contact.websites.map((website) => (
                                    <div className="flex items-center" key={website}>
                                        <Typography>{website}</Typography>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Emails</Typography>

                                {contact.emails.map((email) => (
                                    <div className="flex items-center" key={email}>
                                        <Typography>{email}</Typography>
                                    </div>
                                ))}
                            </div>

                        </CardContent>
                    </Card> */}
                </FuseAnimateGroup>
            </div>

            {/* <div className="flex flex-col md:w-320">
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
                                <Button className="normal-case" color="inherit" size="small">See 454 more</Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List className="p-8">
                                {friends.map((friend) => (
                                    <img key={friend.id} className="w-64 m-4" src={friend.avatar} alt={friend.name} />
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    <Card className="w-full mb-16">
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
                    </Card>
                </FuseAnimateGroup>
            </div> */}
        </div>
    );
}

export default AboutTab;
