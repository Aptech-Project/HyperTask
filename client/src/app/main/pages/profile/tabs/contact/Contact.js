import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from "react-table";
import * as action from 'app/auth/store/actions/login.actions'
import * as Actions from 'app/main/pages/profile/tabs/store/actions/contact.action'
import Button from '@material-ui/core/Button';
function ContactsList(props) {
    const dispatch = useDispatch();
    const [account, setAccount] = useState([]);
    const user2 = useSelector(state => state.login.findId)
    const [open, setOpen] = React.useState(false);
    const userAuth = useSelector(state => state.login.userAuth)
    const [id, setId] = React.useState();
    const handleClickOpen = (idF) => {
        setOpen(true);
        setId(idF);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(Actions.fetchAllFriend(userAuth))
    }, [])

    let allfriend = useSelector(state => state.friend.listfriend)
    // useEffect(() => {
    //     action.fetchById(1)
    // }, [])
    // useEffect(() => {
    //     if (user2 !== undefined) (
    //         setAccount(user2)
    //     )
    // }, [user2])
    // console.log(JSON.parse(user2.contact))
    const [friend, setFriend] = useState([])
    const [filteredData, setFilteredData] = useState(null);
    console.log(allfriend)

    useEffect(() => {
        dispatch(action.check())
    }, []);
    useEffect(() => {
        if (allfriend !== undefined) (
            setFriend(allfriend)
        )
    }, [allfriend])
    // console.log(user1)
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
                        width: 75,
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
                                            Remove the invitation you sent
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                                            onClick={() => {
                                                handleClose();
                                                dispatch(Actions.removeFriend(id, userAuth));
                                            }}
                                            color="primary">
                                            Remove
                                        </Button>
                                        <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
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

export default ContactsList;
