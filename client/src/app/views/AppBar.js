import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import App1 from 'app/views/login'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    nav: {
        backgroundColor: 'rgba(192, 192, 192, 0.6);'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static" className={classes.nav}>

                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" color='black'>
                            <Link to="/" style={{
                                textDecoration: 'none', color: 'black'
                            }}>HyperTask</Link>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <Button color="inherit"
                            size="large"
                            style={{
                                backgroundColor: 'midnightblue', color: 'white'
                            }}
                        ><Link to="/login" style={{
                            textDecoration: 'none', color: 'white'
                        }}>Register</Link></Button>&nbsp;

                        <Button color="inherit"
                            size="large"
                            style={{
                                backgroundColor: 'midnightblue', color: 'white'
                            }}
                        ><Link to="/login" style={{
                            textDecoration: 'none', color: 'white'
                        }}>Login</Link></Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path="/login">
                        <App1 />
                    </Route>
                </Switch>
            </div>

        </Router>
    );
}
