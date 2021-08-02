import React, { useEffect, useState } from 'react';
import Formsy from 'formsy-react';
import { Button, InputAdornment, Icon, Snackbar } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import { useDispatch } from "react-redux";
import history from "@history";
import { isAuthenticated } from "app/auth/store/actions/login.actions";
import * as actions from "app/auth/store/actions/login.actions";
import { useForm } from 'react-hook-form';
import CheckLogin from './CheckLogin';
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
const Auth0LoginTab = ({ classes, ...props }) => {
    const dispatch = useDispatch();
    const [account, setIsAccount] = useState();
    const { ...rest } = props;
    const loginDispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { handleSubmit } = useForm({
        //mode: 'onChange',
    });
    useEffect(() => {
        props.login(email, pass)
    }, [email, pass])
    const onSubmit = () => {
        if (props.user === '') {
            setIsAccount(true);
        }
        if (props.user !== '') {
            setIsAccount(false);
            dispatch(showMessage({ message: 'Welcome !   ' + props.user.fullname }));
            loginDispatch(isAuthenticated(props.user.id));
            history.push({
                pathname: "/",
            });
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
                    label="Username"
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    onChange={event => setEmail(event.target.value)}
                    autoComplete="off"
                    required
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
                    required
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
                    Login
                </Button>

            </Formsy>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.login.login
});

const mapActionToProps = {
    login: actions.login,

}
export default connect(mapStateToProps, mapActionToProps)(Auth0LoginTab);
