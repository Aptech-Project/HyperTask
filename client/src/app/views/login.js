import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { Hidden } from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        height: '100%',
        width: '80%',
        textAlign: 'center',
        marginLeft: '10%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        backgroundColor: "#011f4b",
        minHeight: '80vh',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
        color: 'white'
    }
}));




export default function LoginPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Hidden only={['md', 'xs', 'sm']}>
                        <Grid item lg={5} className={classes.grid}
                        >
                            <h1 style={{ paddingTop: '30vh' }}>Welcome
                                to the Hypertext</h1>
                            <p>
                                Usability and convenience are everything we have for you
                            </p>
                        </Grid>
                    </Hidden>

                    <Grid item lg={2} xs={2}>

                    </Grid>
                    <Grid item lg={3} xs={8} alignItems="center"
                        justify="center">
                        <h3>Login to your account</h3>
                        <TextField
                            label="Email..."
                            margin="normal"
                            id="email"
                            name="email"
                            fullWidth
                            size="normal"
                            variant="outlined"
                        // onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            label="Password"
                            margin="normal"
                            id="pass"
                            name="pass"
                            fullWidth
                            variant="outlined"
                        // onChange={event => setPass(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            fullWidth>
                            Log In
                        </Button>

                        <p style={{ paddingTop: '20px' }}>Don't have an account?</p>
                        <Link to="/register" style={{
                            textDecoration: 'none', color: 'bluesky'
                        }}>Create an account</Link>
                    </Grid>
                    <Grid item lg={3} xs={2}>

                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
}
