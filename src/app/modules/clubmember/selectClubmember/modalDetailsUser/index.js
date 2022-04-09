import { makeStyles } from "@material-ui/core";
import React from "react";
import CardNoData from "../../../../common/components/cardNoData";
import { dateMiladiToShamsi } from "../../../../common/method/date";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15
  }
}));

export default function ModalDetailsUsers({ data }) {
  const classes = useStyles();

  // functions
  const convertGender = data => {
    switch (data) {
      case "1":
        return "مرد";
      case "2":
        return "زن";
      default:
        return "_";
    }
  };

  const fun_roll = key => {
    switch (key) {
      case "ADMIN":
        return { value: "ادمین", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "اپراتور", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "کاربر عادی", roll: "MEMBER" };
      default:
        break;
    }
  };

  const handleNull = key => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };
  if (!data?.body) {
    return (
      <div className={classes["modalDetail"]}>
        <CardNoData />
      </div>
    );
  }

  return (
    <div className={classes.modalDetail}>
      <div style={{ width: "25%" }}>
        <p>نام: {handleNull(data.body.first_name)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>نام خانوادگی: {handleNull(data.body.last_name)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>کدملی: {data.body.national_id}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>نقش: {fun_roll(data.body.category).value}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>موبایل: {handleNull(data.body.phone)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>کد معرفی: {handleNull(data.body.automation_id)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>استان شعبه: {handleNull(data.body.branch_province)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>شهر شعبه: {handleNull(data.body.branch_city)}</p>
      </div>

      <div style={{ width: "25%" }}>
        <p>جنسیت: {convertGender(data.body.gender)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>تاریخ تولد: {dateMiladiToShamsi(data.body.birth_date)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>ایمیل: {handleNull(data.body.email)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>کد معرف شعبه: {handleNull(data.body.branch_id)}</p>
      </div>
      <div style={{ width: "25%" }}>
        <p>نام شعبه: {handleNull(data.body.branch_name)}</p>
      </div>
    </div>
  );
}
