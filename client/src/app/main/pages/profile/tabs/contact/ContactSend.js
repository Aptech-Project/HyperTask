import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ReactTable from "react-table";
import * as Actions from 'app/main/pages/profile/tabs/store/actions/contact.action'
function ContactSend(props) {
    const dispatch = useDispatch();
    // const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
    // const selectedContactIds = useSelector(({ contactsApp }) => contactsApp.contacts.selectedContactIds);
    // const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
    // const user = useSelector(({ contactsApp }) => contactsApp.user);
    const [account, setAccount] = useState([]);
    const user2 = useSelector(state => state.login.findId)
    const userAuth = useSelector(state => state.login.userAuth)
    useEffect(() => {
        dispatch(Actions.fetchSendFriend(userAuth))
    }, [])
    let allsend = useSelector(state => state.friend.listsend)
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
                                        dispatch(Actions.acceptFriend(row.original.id, userAuth));
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
                                        dispatch(Actions.acceptFriend(row.original.id, userAuth));
                                    }}
                                >
                                    Accept
                                </Button>
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
