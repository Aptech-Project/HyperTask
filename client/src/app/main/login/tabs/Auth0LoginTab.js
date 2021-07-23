import React, { useEffect, useState, useRef } from 'react';
import auth0Service from 'app/services/auth0Service';
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import Formsy from 'formsy-react';
import { Button, InputAdornment, Icon, Snackbar } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import { useDispatch } from "react-redux";
import history from "@history";
import { isAuthenticated } from "app/auth/store/actions/login.actions";
import { useForm } from 'react-hook-form';
import CheckLogin from './CheckLogin';
import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';
import user from 'app/auth/store/reducers/user.reducer';
function Auth0LoginTab(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {

        showDialog();

        auth0Service.onAuthenticated(() => {

            dispatch(Actions.showMessage({ message: 'Logging in with Auth0' }));

            auth0Service.getUserData().then(tokenData => {

                dispatch(authActions.setUserDataAuth0(tokenData));

                dispatch(Actions.showMessage({ message: 'Logged in with Auth0' }));
            });
        });
    }, [dispatch]);

    function showDialog() {
        auth0Service.login();
    }
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 100);
    const [account, setIsAccount] = useState();
    const { ...rest } = props;
    const loginDispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { register, handleSubmit, errors } = useForm({
        //mode: 'onChange',
    });
    useEffect(() => {
        axios.get('http://localhost:4000/api/get-all-users')
            .then(function (response) {
                setUserList(response.data)
            })
            .catch(function (error) {
                // console.log(error);
            })
    }, [])
    const onSubmit = () => {
        let userExited = 0;
        let userExitedid = "";
        let username = ""
        userList.map((user) => {
            if (user.email === email || user.username === email && user.password === pass) {
                userExited = userExited + 1;
                userExitedid = user.id;
                username = user.fullname;
            }
        })
        // console.log(userExited);
        if (userExited > 0) {
            setIsAccount(false);
            console.log(username);
            dispatch(showMessage({ message: 'Welcome !   ' + username }));
            loginDispatch(isAuthenticated(userExitedid));
            history.push({
                pathname: "/",
            });
        } else {
            setIsAccount(true);
        }
    };
    return (
        <div className="w-full">
            <div>
                {
                    account ?
                        <CheckLogin /> :
                        <Snackbar
                            message="Login succsess"
                            key={'top' + 'center'}
                        />
                }
            </div>

            <Formsy
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    onChange={event => setEmail(event.target.value)}
                    autoComplete="off"
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    onChange={event => setPass(event.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto normal-case mt-16"
                    aria-label="LOG IN"
                    value="firebase"
                >
                    Log in
                </Button>

            </Formsy>
        </div>
    );
}

export default Auth0LoginTab;
