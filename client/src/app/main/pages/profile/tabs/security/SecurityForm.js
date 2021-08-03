

import React, { useEffect, useState } from 'react';
import { Avatar, AppBar, MenuItem, InputAdornment, TextField, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import useForm from "./useForm";
import { connect } from "react-redux";
import { showMessage } from 'app/store/actions/fuse';
import * as Action from '../store/actions/security.action';

const SecurityForm = (props) => {

  const dispatch = useDispatch();
  const profile = useSelector(state => state.login.findId)
  const [account, setAccount] = useState(null);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState([])
  useEffect(() => {
    setAccount([])
  }, []);
  useEffect(() => {
    if (profile !== 'undefined') (
      setAccount(profile)
    )
  }, [profile]);
  let initialFieldValues = props.account
  initialFieldValues.newpass = ""
  initialFieldValues.oldpass = ""
  useEffect(() => {
    if (account && account !== 'undefined' && account !== []) {
      setInfo(JSON.parse(account.info))
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
    if ('newpass' in fieldValues)
      if (fieldValues.newpass === '') {
        temp.newpass = fieldValues.newpass ? "" : "Password is required."
      }
    if (fieldValues.newpass !== '') {
      temp.newpass = (/^[A-Za-z0-9]\w{5,}$/).test(fieldValues.newpass) ? "" : "Passwords must be at least 6 in length and contain no special characters"
    }

    if ('passwordconfirm' in fieldValues) {
      fieldValues.passwordconfirm == values.newpass ? temp.passwordconfirm = "" : temp.passwordconfirm = "Confirmation password does not match"
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
      dispatch(Action.updatePass(tmp))
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
          type="password"
          value={values.oldpass}
          name="oldpass"
          label="Password"
          onChange={handleInputChange}
          autoComplete='off'
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
          }}
          variant="outlined"
          required
          {...(errors.password && { error: true, helperText: errors.password })}
        />
        <TextField
          className="mb-16"
          type="password"
          value={values.newpass}
          name="newpass"
          label="Password"
          onChange={handleInputChange}
          autoComplete='off'
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
          }}
          variant="outlined"
          required
          {...(errors.newpass && { error: true, helperText: errors.newpass })}
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
          required
          {...(errors.passwordconfirm && { error: true, helperText: errors.passwordconfirm })}
        />
        <Button
          id="submit1"
          type="submit"
          variant="contained"
          color="primary"
          className="w-1/2 mx-auto mt-16 normal-case"
          aria-label="Edit"
        >
          Save
        </Button>
      </Formsy>
    </CardContent>
  )
}
export default SecurityForm;
