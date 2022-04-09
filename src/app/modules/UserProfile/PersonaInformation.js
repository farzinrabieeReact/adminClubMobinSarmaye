import React, { useState} from "react";
import {connect } from "react-redux";
import { ModalProgressBar } from "../../../_metronic/_partials/controls"

import * as auth from "../Auth";
import Inputs from './components/Inputs';
import { makeStyles } from "@material-ui/core";
import{clubmember_update_dispatch} from './../../../redux/clubmember/clubmember_update_profile';
import {handleNotificationAlertTryUpdate ,handleNotificationAlertCatch } from './../../common/method/handleNotificationAlert';

let useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
    // backgroundColor:'red',
  },
  inputs: {
    width: "calc(33% - 60px)",
    margin: "10px 30px",
    "& > *": {
      margin: 10,
      width: "100%",
    }
  }
})


function PersonaInformation({selectApiProfile  , user}) {


  let { national_id } = user.body

  const classes = useStyles();
  let initData = {
    first_name: " ",
    last_name: " ",
    national_id: " ",
    gender: " ",
    is_individual: " ",
    phone: " ",
    email: " ",
    birth_date: null,
    category: " ",
    user: " ",
    registration_date: null,
    is_active: " ",
    automation_id: " ",
  }

  const [value, setValue] = useState(initData)
  const [loading,setloading] = useState(false);
  const checkCodeBors = (data) => {
    if (data === "null" || data === null || data === "FALSE") {
      return "ندارد";
    }
    if (data === "TRUE") {
      return "دارد";
    }
    if (!data) {
      return " "
    }
    return data;
  };


  const apiUpdateProfile = () => {
    setloading(true)
    let regex = new RegExp('^(\\98)?9\\d{9}$');

    let result = regex.test(value.phone);

    if (!result) {
        alert("شماره همراه 12 رقمی می باشد و باید با 989 شروع شود.")
        setloading(false)
        return
    }

    let { permission_level , ...data} = value

    clubmember_update_dispatch({ _id: user.id, ...data })
    .then(res => {
         handleNotificationAlertTryUpdate(res)
         setloading(false)
         selectApiProfile(national_id)

    })
    .catch(err => {
        handleNotificationAlertCatch()
        setloading(false)

    })
   
}
 

  return (
    <div
      className="card card-custom card-stretch"
    >
      {loading && <ModalProgressBar />}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            اطلاعات شخصی
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            {/* اطلاعات شخصی خود را ویرایش کنید */}
          </span>
        </div>

        <div className="card-toolbar">
          <button
            type="submit"
            className={`btn  mr-2
            ${
              JSON.stringify(user.body) === JSON.stringify(value)
                ? "btn-secondary"
                : "btn-success"
              }
            `}
            disabled={
              JSON.stringify(user.body) === JSON.stringify(value)
            }
            onClick={()=>apiUpdateProfile()}
          >
            ویرایش
          </button>
          {
            JSON.stringify(user.body) === JSON.stringify(value)
              ? <></>
              : (
                <div
                  to="/user-profile/profile-overview"
                  className="btn btn-secondary"
                  onClick={()=>setValue(user.body)}
                >
                  انصراف
                </div>
              )
          }
        </div>
      </div>

      <div className="form">
        <div className={classes['root']}>
          <Inputs
            classes={[classes['inputs']]}
            checkCodeBors={checkCodeBors}
            prevValue={user}
            initData={initData}
            setValue={setValue}
            value={value}
          />
        </div>
      </div>

    </div>
  );
}

export default connect(null, auth.actions)(PersonaInformation);
