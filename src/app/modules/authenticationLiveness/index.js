import React, { useEffect, useState } from "react";
import Header from "./components/header";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "./components/CustomTable";
import { actionTypes as authenticationTypes } from "../../../redux/authenticationLiveness/authentication_select/index";

export function AuthenticationLiveness() {
  const [flagApi, setflagApi] = useState(false);
 
  const reducerState = useSelector(
    (state) => state.Authentication_select_reducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: authenticationTypes.selectAuthenticationAsync });
  }, [flagApi]);


  const changeStatus = (value) => {
    switch (value) {
      case "SUBMITTED":
        return "در حال انجام";
      case "TRUE":
        return "تایید شده";
      case "FALSE":
        return "رد شده";
      case 500:
        return "رد شده";
      case 200:
        return "تایید شده";
      case 405:
        return "درخواستی وجود ندارد";
      case 404:
        return "در حال پردازش";
      case 403:
        return "زمان ورود شما به پایان رسیده است";
      case "null" || "" || false||null:
        return "برای این فیلد داده ای وجود ندارد"; 
      default:
        return value;
    }
  };

  let head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: true,
      type: "",
    },
    {
      id: 2,
      label: "وضعیت تصویر",
      title: "FaceRecognition_code",
      active: false,
      type: "text",
      format: changeStatus,
    },
    {
      id: 3,
      label: "توضیحات تصویر",
      title: "FaceRecognition_description",
      active: false,
      type: "text",
      format: changeStatus,
    },
    {
      id: 4,
      label: "وضعیت ویدیو",
      title: "LivenessDetection_code",
      active: false,
      type: "text",
      format: changeStatus,
    },
    {
      id: 5,
      label: "توضیحات ویدیو",
      title: "LivenessDetection_description",
      active: false,
      type: "text",
      format: changeStatus,
    },
    {
      id: 6,
      label: "سریال کارت ملی",
      title: "card_serial",
      active: true,
      type: "text",
      format: changeStatus,
    },
    {
      id: 7,
      label: "وضعیت احراز هویت",
      title: "confirm",
      active: false,
      type: "text",
      format: changeStatus,
    },
    {
      id: 8,
      label: "کد ملی",
      title: "national_id",
      active: true,
      type: "text",
      format: changeStatus,
    },
  ];

  const handelRefresh = () => {
    setflagApi((prev) => !prev);
  };

  const submitTable = () => {
    setflagApi((prev) => !prev);
  };

  return (
    <div>
      <Header
        handelRefresh={handelRefresh}
        head={head}
      />
      <CustomTable head={head} reducerState={reducerState} />
    </div>
  );
}
