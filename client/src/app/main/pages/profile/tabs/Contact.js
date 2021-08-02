import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, Checkbox, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ReactTable from "react-table";
// import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';

function ContactTab() {
    const [data, setData] = useState(null);
    const profile = useSelector(state => state.login.findId)
    const [account, setAccount] = useState();
    const [info, setInfo] = useState(null);
    const [allUser, setAllUser] = useState(null);
    // const selectedContactIds = useSelector(({ contactsApp }) => contactsApp.contacts.selectedContactIds);
    // const selectedContactIds = useSelector(state => state.contacts.selectedContactIds);

    let listUser = useSelector(state => state.login.listUser);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        if (listUser !== undefined) (
            setAllUser(listUser)
        )

    }, [listUser])
    console.log("listUser")
    console.log(listUser)
    useEffect(() => {
        axios.get('/api/profile/about').then(res => {
            setData(res.data);
        });
    }, []);
    useEffect(() => {
        if (profile !== 'undefined') (
            setAccount(profile)
        )
    }, [profile])
    useEffect(() => {
        console.log("account")
        console.log(account)
        if (account && account !== 'undefined' && account !== []) (
            setInfo(JSON.parse(account.info))
        )
    }, [account]);

    if (!account) {
        return null
    }
    console.log('account.contact')
    // console.log(account.contact.split(","))

    if (!info) {
        return null
    }

    if (!data) {
        return null;
    }

    const { general, work, contact, groups, friends } = data;

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
                                    Friends
                                </Typography>
                                {/* <Button className="normal-case" color="inherit" size="small">See more</Button> */}
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            {/* <List className="p-8">
                                {friends.map((friend) => (
                                    <img key={friend.id} className="w-64 m-4" src={friend.avatar} alt={friend.name} />
                                ))}
                            </List> */}
                            <ReactTable
                                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"

                                columns={[
                                    {
                                        Header: () => (
                                            <Checkbox
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                }}
                                                onChange={(event) => {
                                                    // event.target.checked ? dispatch(Actions.selectAllContacts()) : dispatch(Actions.deSelectAllContacts());
                                                }}
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
                                        // Header: () => (
                                        //     selectedContactIds.length > 0 && (
                                        //         <ContactsMultiSelectMenu />
                                        //     )
                                        // ),
                                        Header: "Avatar",
                                        accessor: "avatar",
                                        // Cell: row => (
                                        //     <Avatar className="mr-8" alt={row.original.name} src={row.value} />
                                        // ),

                                        className: "justify-center",
                                        width: 64,
                                        sortable: false
                                    },
                                    {
                                        Header: "Full Name",
                                        accessor: "name",
                                        filterable: true,
                                        className: "font-bold"
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
                                                {/* <IconButton
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        // dispatch(Actions.toggleStarredContact(row.original.id))
                                                    }}
                                                >
                                                    {user.starred && user.starred.includes(row.original.id) ? (
                                                        <Icon>star</Icon>
                                                    ) : (
                                                        <Icon>star_border</Icon>
                                                    )}
                                                </IconButton> */}
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
                            />
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
        </div>
    );
}

export default ContactTab;
