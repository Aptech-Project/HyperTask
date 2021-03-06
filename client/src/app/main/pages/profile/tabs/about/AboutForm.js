

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
import * as loginaction from "app/auth/store/actions";
const AboutForm = (props) => {

  const dispatch = useDispatch();
  const profile = useSelector(state => state.login.findId)
  const [account, setAccount] = useState(null);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState([])
  useEffect(() => {
    setAccount([])
    dispatch(loginaction.check())
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
        temp.fullname = (/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/).test(fieldValues.fullname) ? "" : "Fullname is not valid."
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
        temp.email = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? "" : "Email is not valid."
      }
      if (err >= 1) {
        err < 1 ? temp.email = "" : temp.email = "Email is existed"
      }
    }
    if ("info" in fieldValues) {
      let infoFieldValues = fieldValues.info;
      if ('phoneNumber' in infoFieldValues) {
        if (infoFieldValues.phoneNumber === '') {
          temp.phoneNumber = infoFieldValues.phoneNumber ? "" : "Phone number is required."
        } if (infoFieldValues.phoneNumber !== '') {
          temp.phoneNumber = (/^\d{9,11}$/).test(infoFieldValues.phoneNumber) ? "" : "Phone number is not valid."
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
      let tmp = Object.assign({}, values)
      tmp.info = JSON.stringify(tmp.info)
      dispatch(Action.update(tmp))
    } else {
      dispatch(showMessage({ message: 'Update profile fail', variant: "error" }));
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
  function handleCancel() {
    dispatch(Action.reloadData())
    // props.isCancel()
  }
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
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">wc</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          select
        >
          <MenuItem >None</MenuItem>
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
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}
          required
          {...(errors.email && { error: true, helperText: errors.email })}
        />
        <TextField
          className="mb-16"
          type="number"
          name="phoneNumber"
          value={values.info.phoneNumber}
          label="Phone Number"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone</Icon></InputAdornment>
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
            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">home</Icon></InputAdornment>
          }}
          autoComplete='off'
          variant="outlined"
          onChange={handleInputChange}

          multiline
        />
        <div className="row text-center">
          <Button
            id="submit1"
            type="submit"
            variant="contained"
            color="primary"
            className="w-1/3 mx-auto mt-16 normal-case mr-12"
            aria-label="Edit"
          >
            {/* {!edit ? "Edit" : "Save"} */}Save
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="w-1/3 mx-auto mt-16 normal-case ml-12"
            aria-label="Edit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Formsy>
    </CardContent>
  )
}
export default AboutForm;
