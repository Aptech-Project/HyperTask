import React from 'react';
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
class ProfileTabs extends React.PureComponent {
    state = { activeIndex: 0 }

    handleChange = (_, activeIndex) => this.setState({ activeIndex })
    render() {
        const { activeIndex } = this.state;
        let condTabOrientation;
        if (isWidthDown("xs", this.props.width)) {
            condTabOrientation = "block";
        } else if (isWidthDown("sm", this.props.width)) {
            condTabOrientation = "block";
        } else if (isWidthDown("md", this.props.width)) {
            condTabOrientation = "block";
        }
        else {
            condTabOrientation = "flex";
        }
        console.log(condTabOrientation)
        return (
            <div
                style={{
                    display: condTabOrientation
                }}
            >
                <Card style={{ display: 'block', marginBottom: '10px', height: '100%' }}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <VerticalTabs
                            value={activeIndex}
                            onChange={this.handleChange}
                        >
                            <MyTab label='All Friend' />
                            <MyTab label='Add Friend' />
                            <MyTab label='Invitation Sent' />
                            <MyTab label='Invitation Received' />
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