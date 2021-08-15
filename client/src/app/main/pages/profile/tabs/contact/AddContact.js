import React, { useEffect, useState, useRef } from 'react';
import { Avatar, AppBar, TextField, Button, Card, CardContent, Icon, Toolbar, Typography, Box } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from '../store/actions/contact.action'
import { getContacts } from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
import { IconButton } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const AddContact = ({ ...props }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            maxWidth: '99%',
            marginTop: '5px'
        },
        image: {
            width: 90,
            height: 90,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));
    const classes = useStyles();
    const [textsearch, setTextSearch] = useState('')
    const dispatch = useDispatch();
    const listSearch = useSelector(state => state.friend.listsearchfriend)
    const friendQR = useSelector(state => state.friend.findId)
    const [listSearchFriend, setListSearch] = useState([])
    const userAuth = useSelector(state => state.login.userAuth)
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [scanResultFile, setScanResultFile] = useState('');
    const [findFriendQR, setFindFriendQR] = useState(null);
    const handleClickOpen = () => {
        dispatch(Actions.fetchById(0, userAuth))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const qrRef = useRef(null);
    useEffect(() => {
        dispatch(Actions.searchFriend("", userAuth));
    }, [])
    const handleErrorFile = (error) => {
        console.log(error);
    }
    useEffect(() => {
        if (listSearch !== undefined) (
            setListSearch(listSearch)
        )
    }, [listSearch])
    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result);
            dispatch(Actions.fetchById(result, userAuth))
        }
    }
    useEffect(() => {
        if (friendQR !== undefined) (
            setFindFriendQR(friendQR)
        )
    }, [handleScanFile])
    //Render List Search Friend
    const renderListSearch = () => {
        if (!listSearchFriend.length) {
            return (
                <div>
                    <div className="flex flex-1 items-center justify-center">
                        <Icon className="text-20" style={{ fontSize: 100 }} color="action">search</Icon>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <Typography color="textSecondary" variant="h5">
                            No friends found !
                        </Typography>
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    {
                        listSearchFriend.map((record, index) => {
                            return (
                                <div className={classes.root} key={record.id}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image}>
                                                    <Avatar style={{ height: 70, width: 70 }} src={record.info ? record.info : "assets/images/avatars/Velazquez.jpg"}
                                                    ></Avatar>
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1">
                                                            {record.fullname}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {record.email}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ float: "right", fontSize: "10px", marginTop: '30px' }}
                                                        onClick={() => {
                                                            dispatch(
                                                                showMessage({
                                                                    message: "Add new friend success !",
                                                                    variant: "success",
                                                                    autoHideDuration: 2000,
                                                                    anchorOrigin: {
                                                                        vertical: "top",
                                                                        horizontal: "right",
                                                                    },
                                                                })
                                                            );
                                                            dispatch(Actions.sendFriend(userAuth, record.id, textsearch));
                                                            dispatch(getContacts(userAuth))
                                                            setListSearch(listSearch)
                                                        }}
                                                    >
                                                        Add Friend
                                                    </Button>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </div>
                            )

                        })
                    }
                </div >
            )
        }
    }
    const renderRelationShip = () => {
        if (findFriendQR.labels === 'friend') {
            return (
                <p>Friend</p>
            )
        }
        else if (findFriendQR.labels === 'send') {
            return (
                <p>Friend request received</p>
            )
        }
        else if (findFriendQR.labels === 'receive') {
            return (
                <p>Friend request sent</p>
            )
        }
        else if (findFriendQR.labels === '[]') {
            return (
                <p>No request sent yet</p>

            )
        }
        else if (findFriendQR.labels === 'none') {
            return (
                <p>No request sent yet</p>

            )
        }
        else if (findFriendQR.labels === 'youraccount') {
            return (
                <p>This account is yours</p>
            )
        }
    }
    //Render function of button
    const renderButton = () => {
        if (findFriendQR.labels === 'friend') {
            return (
                <Button
                    style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                    onClick={() => {
                        handleClickOpen1()
                    }}
                    color="primary">
                    Remove
                </Button>
            )
        }
        else if (findFriendQR.labels === 'send') {
            return (
                <Button
                    style={{ fontSize: 10, backgroundColor: '#3c4454', color: 'white' }}
                    onClick={() => {
                        dispatch(
                            showMessage({
                                message: "Accepted friend request successfully !",
                                variant: "success",
                                autoHideDuration: 2000,
                                anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                },
                            })
                        );
                        handleClose();
                        dispatch(Actions.acceptFriend(findFriendQR.id, userAuth));
                    }}
                    color="primary">
                    Accept
                </Button>
            )
        }
        else if (findFriendQR.labels === 'receive') {
            return (
                <Button
                    style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                    onClick={() => {
                        handleClickOpen1()
                    }}
                    color="primary">
                    Remove
                </Button>
            )
        }
        else if (findFriendQR.labels === '[]') {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right", fontSize: "10px", marginTop: '30px' }}
                    onClick={() => {
                        dispatch(
                            showMessage({
                                message: "Add new friend success !",
                                variant: "success",
                                autoHideDuration: 2000,
                                anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                },
                            })
                        );
                        handleClose();
                        dispatch(Actions.sendFriend(userAuth, findFriendQR.id, textsearch));
                    }}
                >
                    Add Friend
                </Button>
            )
        }
        else if (findFriendQR.labels === 'none') {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right", fontSize: "10px", marginTop: '30px' }}
                    onClick={() => {
                        dispatch(
                            showMessage({
                                message: "Add new friend success !",
                                variant: "success",
                                autoHideDuration: 2000,
                                anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                },
                            })
                        );
                        handleClose();
                        dispatch(Actions.sendFriend(userAuth, findFriendQR.id, textsearch));
                    }}
                >
                    Add Friend
                </Button>
            )
        }
    }
    //Render QRCODE
    const renderQR = () => {
        if (findFriendQR) {
            return (
                <Paper
                    style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        <Avatar style={{ height: 70, width: 70 }} src={findFriendQR.info}
                        ></Avatar>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        <h3>{findFriendQR ? findFriendQR.fullname : 'Not Found'}</h3>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        <p>{findFriendQR ? findFriendQR.email : 'Not Found'}</p>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        {renderRelationShip()}
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 30 }}
                    >
                        {renderButton()}
                    </Box>
                </Paper>
            )
        } else {
            return (
                <Paper
                    style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        No friend found
                    </Box>
                </Paper>
            )
        }

    }

    return (
        <FuseAnimateGroup
            enter={{
                animation: "transition.slideUpBigIn"
            }}
        >
            <Card className="w-full mb-16" style={{ height: '730px' }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar className="pl-16 pr-8">
                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                            Add new friend
                        </Typography>
                    </Toolbar>
                </AppBar>
                < CardContent >
                    <Formsy
                        className="flex flex-col justify-center w-full"
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={11}>
                                <TextField
                                    className="mb-16"
                                    type="text"
                                    name="search"
                                    label="Search"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete='off'
                                    onChange={(event) => {
                                        dispatch(Actions.searchFriend(event.target.value, userAuth));
                                        setTextSearch(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton style={{ marginTop: -10 }} onClick={() => { handleClickOpen(); }}><img src="assets/images/etc/qr.jpg" /></IconButton>
                            </Grid>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Addfriend by QR Code"}</DialogTitle>
                                <DialogContent style={{ width: 600 }}>
                                    <Button
                                        style={{ fontSize: 10, backgroundColor: '#006600', color: 'white', marginBottom: 5 }}
                                        onClick={onScanFile}
                                    >
                                        Scan QR Code
                                    </Button>
                                    <div>
                                        <Grid container component="span" spacing={1}>
                                            <Grid item xs={6}>
                                                <QrReader
                                                    ref={qrRef}
                                                    delay={300}
                                                    style={{ width: '100%' }}
                                                    onError={handleErrorFile}
                                                    onScan={handleScanFile}
                                                    legacyMode
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                {renderQR()}
                                            </Grid>
                                        </Grid>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={open1}
                                onClose={handleClose1}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle>{""}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete this person
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                                        onClick={() => {
                                            dispatch(Actions.removeFriendSend(findFriendQR.id, userAuth));
                                            handleClose1();
                                            handleClose()
                                            dispatch(
                                                showMessage({
                                                    message: "Successfully deleted !",
                                                    variant: "success",
                                                    autoHideDuration: 2000,
                                                    anchorOrigin: {
                                                        vertical: "top",
                                                        horizontal: "right",
                                                    },
                                                })
                                            );
                                        }}
                                        color="primary">
                                        Remove
                                    </Button>
                                    <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose1} color="primary" autoFocus>
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Formsy>
                </CardContent>
                {renderListSearch()}
            </Card>
        </FuseAnimateGroup>
    );
}
export default AddContact
