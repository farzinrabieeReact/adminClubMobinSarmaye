/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";

import { ModalProgressBar } from "../../../_metronic/_partials/controls";

import * as auth from "../Auth";
import TextField from '@material-ui/core/TextField';
import {clubmember_update_changePassword_dispatch} from './../../../redux/clubmember/clubmember_update_changePassword';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../common/method/handleNotificationAlert';


function ChangePassword({user}) {

  const [loading, setloading] = useState(false);

  const [state, setstate] = useState('')

  const handelSubmit = () => {

    if (state) {
      let {id} = user
      setloading(true)

        let obj = {
            _id: id,
            new_password: state
        }

      clubmember_update_changePassword_dispatch(obj)
      .then(res => {
        handleNotificationAlertTryUpdate(res)
        if(!res.data.response.error_code){
          setstate('')
        }
        setloading(false)
      })
      .catch(err => {
        handleNotificationAlertCatch()
        setloading(false)
      })

    } else {
      alert('لطفا فیلد مورد نظر را پر نمایید')
    }

  }


  return (
    <div className="card card-custom" >
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            تغییر رمز عبور
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            رمز عبور حساب خود را تغییر دهید
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className={`btn mr-2 
            ${
              !state
                ? "btn-secondary"
                : "btn-success"
              }
            `}
            disabled={
              !state ? true : false
            }
            onClick={()=>handelSubmit()}
            >
           ثبت تغییرات
      
          </button>
          {
            state &&(
          <div
            className="btn btn-secondary"
          >
            لغو
          </div>
            )
          }
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
            رمز عبور جدید را وارد کنید
            </label>
            <div className="col-lg-9 col-xl-9">
            <TextField  
                    size="small"
                    id="outlined-basic"
                    label={""} 
                    variant="outlined" 
                    value={state}
                    className={'w-50'}
                    onChange={(event)=>setstate(event.target.value)}
                    />
            </div>
          </div>

        </div>
      </div>
      {/* end::Form */}
    </div>
  );
}

export default connect(null, auth.actions)(ChangePassword);
