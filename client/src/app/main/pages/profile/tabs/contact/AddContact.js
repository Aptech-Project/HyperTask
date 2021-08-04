import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
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
    const renderListSearch = () => {
        return (
            <div>
                {
                    listSearchFriend.map((record) => {
                        return (
                            <Card className="w-full" style={{ width: '99%', margin: '5px' }} key={record.id}>
                                < CardContent >
                                    Id: {record.id}<br></br>
                                    Fullname: {record.fullname}<br></br>
                                    Username: {record.username}
                                    <Button
                                        variant="contained"
                                        color="success"
                                        style={{ float: "right" }}
                                        onClick={() => dispatch(Actions.sendFriend(userAuth, record.id))}
                                    >
                                        Add Friend
                                    </Button>
                                </CardContent>
                            </Card>
                        )

                    })
                }
            </div >
        )
    }
    return (
        <div className="md:flex max-w">

            <div className="flex flex-col flex-1 md:pr-32">
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
                                    autoComplete='off'
                                    onChange={(event) => dispatch(Actions.searchFriend(event.target.value))}
                                />

                            </Formsy>
                        </CardContent>
                        {renderListSearch()}

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
export default (AddContact)
