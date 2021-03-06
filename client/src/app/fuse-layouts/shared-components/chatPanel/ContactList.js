import React, {useEffect, useMemo, useRef} from 'react';
import {Button, Avatar, Divider, Tooltip} from '@material-ui/core';
import {FuseScrollbars, FuseAnimateGroup} from '@fuse';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';
import {makeStyles} from '@material-ui/styles';
import { deserializeObject } from 'app/main/common/CommonFunctions';

const useStyles = makeStyles(theme => ({
    root         : {
        background: theme.palette.background.default
    },
    contactButton: {
        width           : 70,
        minWidth        : 70,
        flex            : '0 0 auto',
        '&.active:after': {
            position              : 'absolute',
            top                   : 8,
            right                 : 0,
            bottom                : 8,
            content               : "''",
            width                 : 4,
            borderTopLeftRadius   : 4,
            borderBottomLeftRadius: 4,
            backgroundColor       : theme.palette.primary.main
        }
    },
    unreadBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 4,
        left           : 10,
        borderRadius   : 9,
        padding        : '0 5px',
        fontSize       : 11,
        textAlign      : 'center',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText,
        boxShadow      : '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
        zIndex         : 10
    },
    status       : {
        position    : 'absolute',
        width       : 15,
        height      : 15,
        bottom      : 4,
        left        : 44,
        border      : '2px solid ' + theme.palette.background.default,
        borderRadius: '50%',
        zIndex      : 10,

        '&.online': {
            backgroundColor: '#4CAF50'
        },

        '&.offline': {
            backgroundColor: '#646464'
        }
    }
}));

function ContactList(props)
{
    const dispatch = useDispatch();
    const contacts = useSelector(({chatPanel}) => chatPanel.contacts.entities);
    const selectedContactId = useSelector(({chatPanel}) => chatPanel.contacts.selectedContactId);
    const onlineUser = useSelector(({chatPanel}) => chatPanel.contacts.onlineUser?.content);
    const user = useSelector(({chatPanel}) => chatPanel.user);

    useEffect(() => {
        setInterval(() => dispatch(Actions.getOnlineUser()), 2000);
    },[dispatch])

    const classes = useStyles();
    const contactListScroll = useRef(null);

    const handleContactClick = (contactId) => {
        dispatch(Actions.openChatPanel());
        dispatch(Actions.getChat(contactId));
        scrollToTop();
    };

    const scrollToTop = () => {
        contactListScroll.current.scrollTop = 0;
    };

    const findStatus = (contactId) => {
        let status = "offline"
        if (onlineUser && onlineUser.includes(contactId)) {
            status = "online";
        }
        return status;
    }

    const ContactButton = ({contact}) => {
        return (
            <Tooltip title={contact.name} placement="left">
                <Button
                    onClick={() => handleContactClick(contact.id)}
                    className={clsx(classes.contactButton, {'active': (selectedContactId === contact.id)})}
                >
                    {contact.unread && (
                        <div className={classes.unreadBadge}>{contact.unread}</div>
                    )}
                    <div className={clsx(findStatus(contact.id), classes.status)}/>
                    <Avatar
                        src={contact.avatar}
                        alt={contact.name}
                    >
                        {!contact.avatar || contact.avatar === '' ? contact.name[0] : ''}
                    </Avatar>
                </Button>
            </Tooltip>
        )
    };

    return (
        Object.keys(user).length ? 
            <FuseScrollbars
                className={clsx(classes.root, "flex flex-shrink-0 flex-col overflow-y-auto py-8")}
                ref={contactListScroll}
            >

                    {(contacts.length > 0 && (
                        <React.Fragment>
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.expandIn"
                                }}
                                className="flex flex-col flex-shrink-0"
                            >
                                
                                
                                {(user && user.conversations) &&
                                user.conversations.map(chat => {
                                    const contact = contacts.find((_contact) => _contact.id == chat.contactId);
                                    return contact ? (
                                        <ContactButton key={contact.id} contact={contact}/>
                                    ) : null;
                                })}
                                <Divider className="mx-24 my-8"/>
                                {contacts.map(contact => {
                                    const chatContact = user.conversations.find((_chat) => _chat.contactId == contact.id);
                                    return !chatContact ? <ContactButton key={contact.id} contact={contact}/> : '';
                                })}
                            </FuseAnimateGroup>
                        </React.Fragment>
                    ))}
            </FuseScrollbars>
            : null
    );
}

export default ContactList;

