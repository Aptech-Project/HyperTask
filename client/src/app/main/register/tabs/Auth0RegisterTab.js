import React, { useState } from 'react';
import Formsy from 'formsy-react';
import { Button, InputAdornment, Icon, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as actions from '../action/register.action';
import useForm from "./useForm";
import { connect } from "react-redux";
import history from "@history";
import { showMessage } from 'app/store/actions/fuse';
const initialFieldValues = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    contact: null,
    info: null,
    passwordconfirm: ''
}

const Auth0RegisterTab = ({ classes, ...props }) => {
    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Username is required."
        if ('email' in fieldValues) {
            if (fieldValues.email === '') {
                temp.email = fieldValues.email ? "" : "Email is required."
            } if (fieldValues.email !== '') {
                temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            }
        }
        if ('fullname' in fieldValues)
            temp.fullname = fieldValues.fullname ? "" : "Fullname is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "Password is required."
        if ('passwordconfirm' in fieldValues) {
            temp.passwordconfirm = fieldValues.passwordconfirm ? "" : "Password confirm is required."
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
    userList: state.register.list
})

const mapActionToProps = {
    createUser: actions.create,
}

export default connect(mapStateToProps, mapActionToProps)((Auth0RegisterTab))
