import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from '../store/actions/contact.action'
const AddContact = ({ ...props }) => {

    const dispatch = useDispatch();
    const listSearch = useSelector(state => state.friend.listsearchfriend)
    const [listSearchFriend, setListSearch] = useState([])
    const userAuth = useSelector(state => state.login.userAuth)
    useEffect(() => {
        if (listSearch !== undefined) (
            setListSearch(listSearch)
        )
    }, [listSearch])
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
    const renderListSearch = () => {

        return (
            <div>
                {

                    listSearchFriend.map((record) => {
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
                                                    onClick={() => dispatch(Actions.sendFriend(userAuth, record.id))}
                                                >
                                                    Add Friend
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                            // <Paper >
                            //     <

                            //     Id: {record.id}<br></br>
                            //     Fullname: {record.fullname}<br></br>
                            //     Username: {record.username}

                            // </Paper>
                            // <Card className="w-full" style={{ width: '99%', margin: '5px' }} >
                            //     < CardContent >

                            //     </CardContent>
                            // </Card>
                        )

                    })
                }
            </div >
        )
    }
    return (
        <FuseAnimateGroup
            enter={{
                animation: "transition.slideUpBigIn"
            }}
        >
            <Card className="w-full mb-16" style={{ height: '700px' }}>
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
                        <TextField
                            className="mb-16"
                            type="text"
                            name="search"
                            label="Search"
                            variant="outlined"
                            autoComplete='off'
                            onChange={(event) => dispatch(Actions.searchFriend(event.target.value, userAuth))}
                        />

                    </Formsy>
                </CardContent>
                {renderListSearch()}

            </Card>
        </FuseAnimateGroup>
    );
}
const mapStateToProps = state => ({
    userList: state.register.listUser
})
// export default AboutTab;
export default (AddContact)
