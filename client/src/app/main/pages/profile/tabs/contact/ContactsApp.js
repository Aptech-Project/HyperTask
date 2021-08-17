import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core';
import Contact from './Contact'
import ContactRequest from './ContactRequest';
import ContactSend from './ContactSend'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import AddContact from './AddContact';
import QRCode from 'qrcode';
function ProfileTabs(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleChange = (activeIndex) => {
        setActiveIndex(activeIndex)
    }
    const user = useSelector(state => state.login.userAuth);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        setUserId(user)
    }, [user])
    let condTabOrientation;
    if (isWidthDown("xs", props.width)) {
        condTabOrientation = "block";
    } else if (isWidthDown("sm", props.width)) {
        condTabOrientation = "block";
    } else if (isWidthDown("md", props.width)) {
        condTabOrientation = "block";
    }
    else {
        condTabOrientation = "flex";
    }
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const response = await QRCode.toDataURL(user.toString());
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        }
        generateQrCode()
    }, [user])
    return (
        <div
            style={{
                display: condTabOrientation
            }}
        >
            <Card style={{ display: 'block', marginBottom: '10px', height: '100%', width: "250px" }}>
                {imageUrl ? (
                    <a href={imageUrl} download>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={imageUrl}
                            title="Contemplative Reptile"
                            style={{ marginTop: 10 }}
                        />
                    </a>) : null}
                <CardContent>
                    <VerticalTabs
                        value={activeIndex}
                        onChange={() => handleChange(activeIndex)}
                    >
                        <MyTab label='All Contact' onClick={() => { setActiveIndex(0) }} />
                        <MyTab label='Add Contact' onClick={() => setActiveIndex(1)} />
                        <MyTab label='Sent Invitation' onClick={() => setActiveIndex(2)} />
                        <MyTab label='Received Invitation' onClick={() => setActiveIndex(3)} />
                    </VerticalTabs>

                </CardContent>
            </Card>

            {activeIndex === 0 && <TabContainer><Contact /></TabContainer>}
            {activeIndex === 1 && <TabContainer><AddContact /></TabContainer>}
            {activeIndex === 2 && <TabContainer><ContactRequest /></TabContainer>}
            {activeIndex === 3 && <TabContainer><ContactSend /></TabContainer>}

        </div>
    )
}

const VerticalTabs = withStyles(theme => ({
    [theme.breakpoints.down('xs')]: {
        flexContainer: {
            flexDirection: 'row',
            width: '100%',
        },
    },
    [theme.breakpoints.down('sm')]: {
        flexContainer: {
            flexDirection: 'row',
            width: '100%'
        },
    },
    [theme.breakpoints.up('md')]: {
        flexContainer: {
            flexDirection: 'row',
            width: '100%'
        },
    },
    [theme.breakpoints.up('lg')]: {
        flexContainer: {
            flexDirection: 'column',
            width: '100%'
        },
    },

    indicator: {
        display: 'none',
    },
}))(Tabs)

const MyTab = withStyles(theme => ({
    selected: {
        color: '#41a9e6',
        borderBottom: '2px solid #41a9e6'
    },
}))(Tab);

function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingLeft: 24, paddingRight: 26, width: '100%' }}>
            {props.children}
        </Typography>
    );
}

export default withWidth()(ProfileTabs);