import React, { useState, useEffect } from 'react';
import Formsy from 'formsy-react';
import { Button, InputAdornment, Icon, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../action/register.action';
import * as action from 'app/auth/store/actions/login.actions'
import useForm from "./useForm";
import { connect } from "react-redux";
import history from "@history";
import { showMessage } from 'app/store/actions/fuse';
import { use } from 'marked';
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
const initialFieldValues = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    contact: '[]',
    info: JSON.stringify({ address: "", gender: "", avatar: "", phoneNumber: "", birthday: today }),
    conversation: '[]',
    passwordconfirm: ''
}

const Auth0RegisterTab = ({ classes, ...props }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState([])

    useEffect(() => {
        dispatch(action.check())
    }, []);
    let check = useSelector(state => state.login.check);
    useEffect(() => {
        if (check !== undefined) (
            setUser(check)
        )
    }, [check])
    console.log(user)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues) {
            let err = 0;
            user.map((user) => {
                if (user.username.toLowerCase() === fieldValues.username.toLowerCase()) {
                    err = err + 1
                }
            })
            if (fieldValues.username === '') {
                temp.username = fieldValues.username ? "" : "Username is required."
            } if (fieldValues.username !== '') {
                temp.username = (/^[A-Za-z1-9]\w{4,}$/).test(fieldValues.username) ? "" : "Username must be at least 5 characters without any special characters"
            }
            if (err >= 1) {
                err < 1 ? temp.username = "" : temp.username = "Username is existed"
            }
        }
        if ('email' in fieldValues) {
            let err = 0;
            user.map((user) => {
                if (user.email.toLowerCase() === fieldValues.email.toLowerCase()) {
                    err = err + 1
                }
            })
            if (fieldValues.email === '') {
                temp.email = fieldValues.email ? "" : "Email is required."
            } if (fieldValues.email !== '') {
                temp.email = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? "" : "Email is not valid."
            }
            if (err >= 1) {
                err < 1 ? temp.email = "" : temp.email = "Email is existed"
            }

        }
        if ('fullname' in fieldValues) {
            if (fieldValues.fullname === '') {
                temp.fullname = fieldValues.fullname ? "" : "Fullname is required."
            } if (fieldValues.email !== '') {
                temp.fullname = (/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,6}$/).test(fieldValues.fullname) ? "" : "Fullname is not valid."
            }
        }
        if ('password' in fieldValues)
            if (fieldValues.password === '') {
                temp.password = fieldValues.password ? "" : "Password is required."
            } if (fieldValues.password !== '') {
                temp.password = (/^[A-Za-z0-9]\w{5,}$/).test(fieldValues.password) ? "" : "Passwords must be at least 6 in length and contain no special characters"
            }
        if ('passwordconfirm' in fieldValues) {
            fieldValues.passwordconfirm == values.password ? temp.passwordconfirm = "" : temp.passwordconfirm = "Confirmation password does not match"
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        const onSuccess = () => {
            dispatch(showMessage({ message: 'Register successfull. Please login to website' }));
            history.push({
                pathname: "/login",
            });
            resetForm()
        }
        if (validate()) {
            props.createUser(values, onSuccess)
            console.log(values)
        }
    }
    //console.log(values)
    return (
        <div className="w-full">
            <Formsy
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
            >
                <TextField
                    className="mb-16"
                    type="text"
                    name="username"
                    label="User name"
                    value={values.username}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    autoComplete='off'
                    {...(errors.username && { error: true, helperText: errors.username })}
                />

                <TextField
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    autoComplete='off'
                    {...(errors.email && { error: true, helperText: errors.email })}
                />
                <TextField
                    className="mb-16"
                    type="text"
                    name="fullname"
                    value={values.fullname}
                    label="Full Name"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
                    }}
                    autoComplete='off'
                    variant="outlined"
                    onChange={handleInputChange}
                    {...(errors.fullname && { error: true, helperText: errors.fullname })}
                />
                <TextField
                    className="mb-16"
                    type="password"
                    value={values.password}
                    name="password"
                    label="Password"
                    onChange={handleInputChange}
                    autoComplete='off'
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    {...(errors.password && { error: true, helperText: errors.password })}
                />

                <TextField
                    className="mb-16"
                    type="password"
                    value={values.passwordconfirm}
                    onChange={handleInputChange}
                    name="passwordconfirm"
                    label="Confirm Password"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    autoComplete='off'
                    {...(errors.passwordconfirm && { error: true, helperText: errors.passwordconfirm })}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER WITH FIREBASE"
                >
                    Register
                </Button>
            </Formsy>
        </div>
    );
}

const mapStateToProps = state => ({
    userList: state.register.listUser
})

const mapActionToProps = {
    createUser: actions.create,
    fetchAll: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)((Auth0RegisterTab))
