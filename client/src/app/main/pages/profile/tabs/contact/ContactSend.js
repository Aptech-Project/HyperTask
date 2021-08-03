import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as action from 'app/auth/store/actions/login.actions'
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
                        Header: () => (
                            <Checkbox
                            // onClick={(event) => {
                            //     event.stopPropagation();
                            // }}
                            // onChange={(event) => {
                            //     event.target.checked ? dispatch(Actions.selectAllContacts()) : dispatch(Actions.deSelectAllContacts());
                            // }}
                            // checked={selectedContactIds.length === Object.keys(contacts).length && selectedContactIds.length > 0}
                            // indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                            />
                        ),
                        accessor: "",
                        Cell: row => {
                            return (<Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                            // checked={selectedContactIds.includes(row.value.id)}
                            // onChange={() => dispatch(Actions.toggleInSelectedContacts(row.value.id))}
                            />
                            )
                        },
                        className: "justify-center",
                        sortable: false,
                        width: 64
                    },
                    {
                        accessor: "avatar",
                        Cell: row => (
                            <Avatar className="mr-8" alt={row.original.name} src={row.value} />
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
                        Header: "Company",
                        accessor: "info.phoneNumber",
                        filterable: true
                    },
                    {
                        Header: "Job Title",
                        accessor: "jobTitle",
                        filterable: true
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                        filterable: true
                    },
                    {
                        Header: "Phone",
                        accessor: "phone",
                        filterable: true
                    },
                    {
                        Header: "",
                        width: 128,
                        Cell: row => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        // dispatch(Actions.toggleStarredContact(row.original.id))
                                    }}
                                >
                                    {/* {user.starred && user.starred.includes(row.original.id) ? (
                                        <Icon>star</Icon>
                                    ) : (
                                        <Icon>star_border</Icon>
                                    )} */}
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        // dispatch(Actions.removeContact(row.original.id));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
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
