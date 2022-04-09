import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import AccountInformation from "./AccountInformation";
import { ProfileOverview } from "./ProfileOverview";
import ChangePassword from "./ChangePassword";
import PersonaInformation from "./PersonaInformation";
import EmailSettings from "./EmailSettings";
import { ProfileCard } from "./components/ProfileCard";
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../redux/clubmember/clubmember_select_profile_picture'
import { actionTypes as permittedRoleAction } from '../../../redux/clubmember/clubmemeber_select_permited_role'
import SearchNationalCode from '../../common/components/SearchNationalCode';
import Sejam from './sejam/index';

import { makeStyles } from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  cardSearchNationalid: {
    width: "30%",
    height: "73vh",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    [theme.breakpoints.down('md')]: {
      minWidth: "80%",
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: "100%",
    },
  }
}))

export default function UserProfilePage() {

  let classes = useStyles()
  const suhbeader = useSubheader();
  suhbeader.setTitle("پروفایل");

  const [national_id, setNational_id] = useState('')

  let initData = {
    id: '',
    body: {
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
  }

  const dispatch = useDispatch()
  const [user, setUser] = useState(initData)
  const [flag, setFlag] = useState(false)
  const [permission, setpermission] = useState({})

  const reducerProfile = useSelector(state => state.select_clubmember_profile_picture_reducer);
  const reducerpermission = useSelector(state => state.select_clubmember_permitted_role_reducer);


  useEffect(() => {
    if (reducerProfile.data[0]) {
      setUser(reducerProfile.data[0])
    }
  }, [reducerProfile.data])

  useEffect(() => {
    flag && selectpermittedRole()
    setFlag(true)
  }, [reducerProfile])

  useEffect(() => {
    setpermission(reducerpermission);
  }, [reducerpermission])

  const selectApiProfile = (national_id) => {
    let data = {
      data: {
        national_id: national_id
      }
    }
    dispatch({ type: actionTypes.selecClubmemberProfilePictureAsync, payload: data })
  }

  const selectpermittedRole = () => {
    let data = {}
    dispatch({ type: permittedRoleAction.selecClubmemberpermittedRoleAsync, payload: data })
  }


  if (!user.id.length) {
    return (
      <div className={classes['cardSearchNationalid']}>
        <SearchNationalCode
          value={national_id}
          setValue={setNational_id}
          apiSubmit={(national_id) => selectApiProfile(national_id)}
        />
      </div>
    )
  }

  return (
    <div className="d-flex flex-row">
      <ProfileCard
        data={[user]}
        selectApiProfile={selectApiProfile}
        StateNational_id={national_id}
        setNational_id={setNational_id}
        permission={permission}
      />

      <div className="flex-row-fluid ml-lg-8">

        <Switch>

          <Redirect
            from="/user-profile"
            exact={true}
            to={"/user-profile/personal-information"}
          />
          <Route
            path="/user-profile/profile-overview"

          >
            <ProfileOverview
              user={user}
            />
          </Route>
          <Route
            path="/user-profile/account-information"
            component={AccountInformation}
          />
          <Route
            path="/user-profile/change-password"
          >
            <ChangePassword
              user={user}
            />
          </Route>
          <Route
            path="/user-profile/email-settings"
            component={EmailSettings}
          />
          <Route
            path="/user-profile/personal-information"
          >
            <PersonaInformation
              user={user}
              selectApiProfile={selectApiProfile}
            />
          </Route>
          <Route
            path="/user-profile/sejam"
          >
            <Sejam
              profile={user}
            />
            {
              (!reducerProfile.data[0].body.automation_id === null || reducerProfile.data[0].body.automation_id !== 'null') && (
                <Redirect
                  from="/user-profile"
                  exact={true}
                  to={"/user-profile/personal-information"}
                />
              )

            }
          </Route>
        </Switch>
      </div>
    </div>
  );
}
