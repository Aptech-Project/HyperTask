

import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, MenuItem, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import useForm from "./useForm";
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
import * as Action from '../store/actions/about.action';

const AboutForm = (props) => {

  const dispatch = useDispatch();
  const profile = useSelector(state => state.login.findId)
  const [account, setAccount] = useState(null);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState([])
  // const [initialFieldValues, setInitialFieldValues] = useState(null);
  useEffect(() => {
    setAccount([])
  }, []);
  useEffect(() => {
    if (profile !== 'undefined') (
      setAccount(profile)
    )
  }, [profile]);
  let initialFieldValues = props.account
  useEffect(() => {
    if (account && account !== 'undefined' && account !== []) {
      setInfo(JSON.parse(account.info))
      // setInitialFieldValues(account);
      // initialFieldValues = props.account
    }
  }, [account]);
  let check = useSelector(state => state.login.check);
  useEffect(() => {
    if (check !== undefined) (
      setUser(check)
    )
  }, [check])
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullname' in fieldValues) {
      if (fieldValues.fullname === '') {
        temp.fullname = fieldValues.fullname ? "" : "Fullname is required."
      } if (fieldValues.email !== '') {
        temp.fullname = (/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,6}$/).test(fieldValues.fullname) ? "" : "Fullname is not valid."
      }
    }
    if ('email' in fieldValues) {
      let err = 0;
      user.map((user) => {
        if (user.email.toLowerCase() === fieldValues.email.toLowerCase() && account.email !== fieldValues.email.toLowerCase()) {
          err = err + 1
        }
      })
      if (fieldValues.email === '') {
        temp.email = fieldValues.email ? "" : "Email is required."
      } if (fieldValues.email !== '') {
        temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
      }
      if (err >= 1) {
        err < 1 ? temp.email = "" : temp.email = "Email is existed"
      }
    }
    if ("info" in fieldValues) {
      let infoFieldValues = fieldValues.info;
      if ('gender' in infoFieldValues) {
        console.log(infoFieldValues)
        console.log("infoFieldValues")
        if (infoFieldValues.gender === '') {
          temp.gender = infoFieldValues.gender ? "" : "Gender is required."
        }
      }
      if ('phoneNumber' in infoFieldValues) {
        if (infoFieldValues.phoneNumber === '') {
          temp.phoneNumber = infoFieldValues.phoneNumber ? "" : "Phone number is required."
        } if (infoFieldValues.phoneNumber !== '') {
          temp.phoneNumber = (/^\d{9,10}$/).test(infoFieldValues.phoneNumber) ? "" : "Phone number is not valid."
        }
      }
      if ('phoneNumber' in infoFieldValues) {
        if (infoFieldValues.address === '') {
          temp.address = infoFieldValues.address ? "" : "Address is required."
        } if (infoFieldValues.address !== '') {
          temp.address = infoFieldValues.address.length < 500 && infoFieldValues.address.length > 50 ? "" : "Address is not valid."
        }
      }
    }


    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }
  const handleSubmit = e => {
    if (validate()) {

      console.log("values")
      console.log(values)
      console.log("initialFieldValues")
      console.log(initialFieldValues)
      let tmp = Object.assign({}, values)
      tmp.info = JSON.stringify(tmp.info)
      dispatch(Action.update(tmp))
      console.log("tmptmp")
      console.log(tmp)

    } else {
      dispatch(showMessage({ message: 'Update profile fail' }));
    }
  }
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, validate, props.setCurrentId)
  return (
    < CardContent >
      <Formsy
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit}
      >
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
          required
          {...(errors.fullname && { error: true, helperText: errors.fullname })}
        />
        <TextField
          className="mb-16"
          type="text"
          name="gender"
          value={values.info.gender}
          label="Gender"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          required
          select
          {...(errors.gender && { error: true, helperText: errors.gender })}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value=" FeMale"> FeMale</MenuItem>
        </TextField>
        <TextField
          className="mb-16"
          type="text"
          name="email"
          value={values.email}
          label="Email"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          required
          {...(errors.email && { error: true, helperText: errors.email })}
        />
        <TextField
          className="mb-16"
          type="text"
          name="phoneNumber"
          value={values.info.phoneNumber}
          label="Phone Number"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          required
          {...(errors.phoneNumber && { error: true, helperText: errors.phoneNumber })}
        />
        <TextField
          className="mb-16"
          type="text"
          name="address"
          value={values.info.address}
          label="Address"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person_pin</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          required
          multiline
          {...(errors.address && { error: true, helperText: errors.address })}
        />
        {/* <Button
          id="submit1"
          type="submit"
          variant="contained"
          color="primary"
          className="w-1/2 mx-auto mt-16 normal-case"
          aria-label="Edit"
        >

        </Button> */}
        <Button
          id="submit1"
          type="submit"
          variant="contained"
          color="primary"
          className="w-1/2 mx-auto mt-16 normal-case"
          aria-label="Edit"
        >
          {/* {!edit ? "Edit" : "Save"} */}Save
        </Button>
      </Formsy>
    </CardContent>
  )
}
export default AboutForm;
