import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ReactTable from "react-table";
import * as Actions from 'app/main/pages/profile/tabs/store/actions/contact.action'
function ContactSend(props) {
    const dispatch = useDispatch();
    // const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
    // const selectedContactIds = useSelector(({ contactsApp }) => contactsApp.contacts.selectedContactIds);
    // const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
    // const user = useSelector(({ contactsApp }) => contactsApp.user);
    const userAuth = useSelector(state => state.login.userAuth)
    const [open, setOpen] = React.useState(false);
    const [openAcp, setOpenAcp] = React.useState(false);
    const [id, setId] = React.useState();
    const handleClickOpen = (idF) => {
        setOpen(true);
        setId(idF);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [idAcp, setIdAcp] = React.useState();
    const handleClickOpenAcp = (idFAcp) => {
        setOpenAcp(true);
        setIdAcp(idFAcp);
    };

    const handleCloseAcp = () => {
        setOpenAcp(false);
    };
    useEffect(() => {
        dispatch(Actions.fetchSendFriend(userAuth))
    }, [])
    let allsend = useSelector(state => state.friend.listsend)
    const [friend, setFriend] = useState([])
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        if (allsend !== undefined) (
            setFriend(allsend)
        )
    }, [allsend])
    console.log(allsend)
    useEffect(() => {
        // function getFilteredArray(entities, searchText) {
        //     const arr = Object.keys(entities).map((id) => entities[id]);
        //     if (searchText.length === 0) {
        //         return arr;
        //     }
        //     return FuseUtils.filterArrayByString(arr, searchText);
        // }

        // if (contacts) {
        setFilteredData(friend);

    }, [friend]);


    if (!filteredData) {
        return null;
    }
    // if (filteredData.length === 0) {
    //     return (
    //         <div className="flex flex-1 items-center justify-center h-full">
    //             <Typography color="textSecondary" variant="h5">
    //                 There are no contacts!
    //             </Typography>
    //         </div>
    //     );
    // }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                // dispatch(Actions.openEditContactDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={friend}
                columns={[
                    {
                        accessor: "avatar",
                        Cell: row => (
                            <Avatar className="mr-8" src={row.original.info ? row.original.info : "assets/images/avatars/Velazquez.jpg"} />
                        ),
                        className: "justify-center",
                        width: 64,
                        sortable: false
                    },
                    {
                        Header: "Full Name",
                        accessor: "fullname",
                        filterable: true,
                        className: "font-bold"
                    },
                    {
                        Header: "Username",
                        accessor: "username",
                        filterable: true,
                        className: "font-bold"
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                        filterable: true
                    },
                    {
                        Header: "",
                        width: 145,
                        Cell: row => (
                            <div className="flex items-center">
                                <Button variant="contained"
                                    size="small"
                                    style={{ backgroundColor: 'rgb(180, 0, 0)', color: 'white', fontSize: 11 }}
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        handleClickOpen(row.original.id);
                                    }}
                                >
                                    Remove
                                </Button>&nbsp;
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    style={{ fontSize: 11 }}
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        handleClickOpenAcp(row.original.id);
                                    }}
                                >
                                    Accept
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle>{""}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Decline a friend request from this person
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                                            onClick={() => {
                                                handleClose();
                                                dispatch(Actions.removeFriendReceive(id, userAuth));
                                            }}
                                            color="primary">
                                            Remove
                                        </Button>
                                        <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={openAcp}
                                    onClose={handleCloseAcp}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle>{""}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Accept a friend request from this person
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            style={{ fontSize: 10, backgroundColor: '#3c4454', color: 'white' }}
                                            onClick={() => {
                                                handleCloseAcp();
                                                dispatch(Actions.acceptFriend(row.original.id, userAuth));
                                            }}
                                            color="primary">
                                            Accept
                                        </Button>
                                        <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleCloseAcp} color="primary" autoFocus>
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="No contacts found"
            />
        </FuseAnimate>
    );
}

export default ContactSend;
