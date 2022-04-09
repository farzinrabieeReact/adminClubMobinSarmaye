/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from './../../../common/components/AlertDialogSlide';
import { clubmember_update_permission_dispatch } from './../../../../redux/clubmember/clubmember_update_permition';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../common/method/handleNotificationAlert';
import { clubmember_update_activation_dispatch } from './../../../../redux/clubmember/clubmember_update_activation';
import { actionTypes } from './../../../../redux/notificationAlert';
import { checkNationalCodeLegal, checkNationalCode } from '../../../common/method/nationalCode';
import { useDispatch } from 'react-redux';
import { seprateNumberFromComma } from './../../../common/method/seprateNumberFromComma';


const useStyles = makeStyles({
  btns: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

export function ProfileCard({ data, selectApiProfile, StateNational_id, setNational_id, permission }) {

  const dispatch = useDispatch()

  let { national_id } = data[0].body

  let classes = useStyles();
  const [state, setState] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [roll, setRoll] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(({ auth }) => auth.user, shallowEqual);
  const [openAlertActivation, setOpenAlertActivation] = useState(false);



  useEffect(() => {
    if (data[0].id) {
      setState(data[0]);
    }
  }, [data]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(permission.loading)
  }, [permission]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelCloseModal = (flagFalse) => {
    setOpenAlert(flagFalse);
    setRoll("");
    setRoleId("");
  };

  const handel_show_alert = (type, id) => {
    if (type !== data[0].body.role_name) {
      setRoll(type);
      setRoleId(id)
      setOpenAlert(true);
    }
    setAnchorEl(null);
  };

  const apiUpdateRoll = () => {
    setLoading(true);
    console.log('loading', loading);
    let obj = {
      _id: state.id,
      role_id: roleId
    }

    clubmember_update_permission_dispatch(obj)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res)
        if (!isOk) return
        selectApiProfile(national_id)
      })
      .catch(err => {
        handleNotificationAlertCatch()
      })

    setOpenAlert(false);
  };

  const apiUpdateActivation = (method_type, id) => {

    clubmember_update_activation_dispatch(method_type, id)
      .then(res => {
        handleNotificationAlertTryUpdate(res)
        selectApiProfile(national_id)
      })
      .catch(err => {
        handleNotificationAlertCatch()
      })
  }

  const handel_Submit_activation = () => {
    let { id } = data[0];

    if (state.body.is_active === "TRUE") {
      let method_type = "deactivate_club_member";
      apiUpdateActivation(method_type, id);
    } else if (state.body.is_active === "FALSE") {
      let method_type = "activate_club_member";
      apiUpdateActivation(method_type, id);
    } else {
      alert("دیتا ورودی دارای مشکل می باشد.");
    }

    setOpenAlertActivation(false);
  };

  const handleSubmitApiProfile = (value) => {

    if (value.length === 0) {
      dispatch({
        type: actionTypes.warning,
        textAlert: "لطفا کد ملی مورد نظر را پر نمایید"
      });
      return
    }

    let isOkCode = checkNationalCode(value)
    let isOkLegal = checkNationalCodeLegal(value)

    if (isOkCode || isOkLegal) {
      selectApiProfile(value)
      return
    } else {
      let textError = 'لطفا کد ملی را به درستی وارد نمایید'
      dispatch({
        type: actionTypes.warning,
        textAlert: textError
      })
      return
    }

  }


  return (
    <>
      {user && (
        <div
          className="flex-row-auto offcanvas-mobile w-250px w-xxl-350px"
          id="kt_profile_aside"
        >
          <div className="card card-custom card-stretch">
            {/* begin::Body */}
            <div className="card-body pt-4">
              {/* begin::User */}
              <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                  <div
                    className="symbol-label"
                    style={{ backgroundImage: `url(${'/media/common/profile.jpg'})` }}
                  ></div>
                  <i className="symbol-badge bg-success"></i>
                </div>
                <div>
                  {/* <a
                    href="#"
                    className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
                  > */}
                  <div className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary d-flex">
                    <span>
                      {data[0].body.first_name}
                    </span>
                    <span className={'ml-2'}>
                      {data[0].body.last_name}
                    </span>
                  </div>
                  {/* </a> */}
                  <div className="text-muted">{user.occupation}</div>
                  <div className="mt-2">
                    <div >
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        className="btnsGreen"
                      >
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""}
                        {data[0].body.role_name}
                      </Button>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {permission.data
                        .filter(itm => itm.body.is_active==="TRUE")
                        .map((item, index) => (
                         <MenuItem key={index} onClick={() => handel_show_alert(item.body.role_name, item.id)}>
                            {" "}
                            {item.body.role_name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>

                    {openAlert && (
                      <AlertDialogSlide
                        flagShow={openAlert}
                        handleCloseAlert={handelCloseModal}
                        handleOkAlert={apiUpdateRoll}
                        data={{
                          title: "ویرایش",
                          description: `آیا میخواهید کاربر را به ${roll} تغییر دهید؟`,
                        }}
                      />
                    )}

                  </div>
                </div>
              </div>
              {/* end::User */}
              {/* begin::Contact */}
              <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">کد ملی:</span>
                  <span className="text-muted">{data[0].body.national_id}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">تلفن:</span>
                  <span className="text-muted">{data[0].body.phone}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">ایمیل:</span>
                  <span className="text-muted text-hover-primary">
                    {data[0].body.email}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">امتیاز قابل استفاده:</span>
                  <span className=" text-hover-primary font-weight-bolder " style={{ color: '#1BC5BD' }}>
                    {seprateNumberFromComma(data[0].body.available_bonus)}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">امتیاز رزرو شده:</span>
                  <span className=" text-hover-primary font-weight-bolder" style={{ color: '#FFA800' }} >
                    {data[0].body.reserved_bonus}
                  </span>
                </div>

              </div>
              {/* end::Contact */}
              {/* begin::Nav */}
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">

                <div className="navi-item mb-2 w-100">
                  <TextField
                    label="کد ملی"
                    variant="outlined"
                    value={StateNational_id}
                    onChange={(e) => setNational_id(e.target.value)}
                    className={'w-100'}
                    onKeyDown={(event) => event.keyCode === 13 ? handleSubmitApiProfile(StateNational_id) : ''}
                  />
                  {/* selectApiProfile */}
                </div>

                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/personal-information"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/User.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      اطلاعات شخصی
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/profile-overview"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Design/Layers.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      لیست دعوت شده ها و معرف
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/change-password"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Shield-user.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      تغییر رمز عبور
                    </span>
                    <span className="navi-label">
                      {/* <span className="label label-light-danger label-rounded font-weight-bold">
                        5
                      </span> */}
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  {
                    (data[0].body.automation_id === null || data[0].body.automation_id === 'null') && (
                      <NavLink
                        to="/user-profile/sejam"
                        className="navi-link py-4"
                        activeClassName="active"
                      >
                        <span className="navi-icon mr-2">
                          <span className="svg-icon">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Shield-user.svg"
                              )}
                            ></SVG>{" "}
                          </span>
                        </span>
                        <span className="navi-text font-size-lg">
                          فراخوانی اطلاعات از سجام
                    </span>
                        <span className="navi-label">
                          {/* <span className="label label-light-danger label-rounded font-weight-bold">
                        5
                      </span> */}
                        </span>
                      </NavLink>
                    )
                  }
                </div>
                <br /><br />
                <div className={classes['btns']}>
                  <button
                    className={
                      data[0].body.is_active === "TRUE"
                        ? "btnsRedBackground"
                        : "btnsGreenBackground"

                    }
                    onClick={() => setOpenAlertActivation(true)}
                  >
                    {`حساب کاربری ${data[0].body.is_active === "TRUE" ? "غیر" : ""
                      } فعال شود`}
                  </button>
                  {
                    openAlertActivation && (
                      <AlertDialogSlide
                        flagShow={openAlertActivation}
                        handleCloseAlert={setOpenAlertActivation}
                        handleOkAlert={handel_Submit_activation}
                        data={{
                          title: "ویرایش",
                          description: `آیا میخواهید حساب کاربری ${data[0].body.is_active === "TRUE" ? "غیر فعال" : "فعال"
                            } شود؟`,
                        }}
                      />
                    )
                  }
                </div>
              </div>
              {/* end::Nav */}
            </div>
            {/* end::Body */}
          </div>
        </div>
      )}
    </>
  );
}
