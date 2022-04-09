import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

// import AlertDialogSlide from "../../../../../../../Common/Components/AlertDialogSlide";
// import { ipo_insert_action } from './../../../../../../../../boot/api/Definitions/ipoLIst/insert_register_ipo/action';
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
// import { seprateNumberFromComma } from '../../../../../../../Common/method/seprateNumberFromComma';
import AlertDialogSlide from "../../../../../../common/components/AlertDialogSlide";
import { seprateNumberFromComma } from "../../../../../../common/method/seprateNumberFromComma";
import { ipo_insert_action } from "../../../../../../../redux/ipoList/ipo_insert_info";
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from "../../../../../../common/method/handleNotificationAlert";

let useStyles = makeStyles({
  root: {
    width: 500,
    height: 300,
    display: " flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    width: "100%",
    borderRadius: " 8px",
    backgroundColor: "white",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    padding: "30px",
  },
  card: {
    width: "100%",
    minWidth: "300px",
    height: "auto",
    display: " flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    minHeight: 200,
    flexWrap: "wrap",
    "& p": {
      "& span": {
        "& .price": {
          display: "inline-block",
          direction: "rtl",
        },
        marginLeft: "10px",
      },
    },
  },
  btn: {
    textAlign: "right",
  },
  status: {
    display: " flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "50%",
  },
  CheckIcon: {
    transform: "scale(4)",
    fill: "green",
    padding: "15px",
  },
  CancelIcon: {
    transform: "scale(4)",
    fill: "red",
    padding: "15px",
  },
});

export default function Index({ data, setNewButton, national_id, ipo_id,handleExit }) {

  let dispatch = useDispatch();
  let classes = useStyles();
  const [falg, setfalg] = useState(false);

  const apiInsertIpo = () => {
    if (!data[0].body.member_id) {
      alert("شناسه کاربر رو وارد کنید");
      return;
    }

    let _data = {
      member_first_name: null,
      member_last_name: null,
      member_national_id: null,
      member_bourse_code: null,
      member_bourse_account: null,
      ipo_stock_name: null,
      ipo_end_date: null,
      registration_date: null,
      is_canceled: null,
      state: null,

      member_id: data[0].body.member_id,
      ipo_id: ipo_id.id,
      requested_price: ipo_id.body.max_price,
      requested_quantity: ipo_id.body.max_quantity,
      broker_sell_permission: "TRUE",
    };

    // dispatch(ipo_insert_action(_data))
    ipo_insert_action(_data)
      .then((result) => {
          let isok = handleNotificationAlertTryUpdate(result)
          if(!isok){
              return
          }
      })
      .catch((err) => {
          handleNotificationAlertCatch()
      });
    // setNewButton(prev => !prev)
  };

  return (
    <div className={classes["root"]}>
      <div className={classes["grid"]}>
        <div className={classes["card"]}>
          <div className={classes["content"]}>
            <p>
              <span>نام نام خانوادگی</span>:
              <span>
                {data[0].body.member_first_name} {data[0].body.member_last_name}
              </span>
            </p>
            <p>
              <span>مانده حساب</span>:
              <span>
                {data[0].body.account_remain === "null" ? (
                  "مانده حساب قابل دسترس نمی باشد"
                ) : !data[0].body.account_remain ? (
                  String(data[0].body.account_remain) === "0" ? (
                    "0"
                  ) : (
                    "مانده حساب قابل دسترس نمی باشد"
                  )
                ) : (
                  <>
                    <span className={"price"}>
                      {seprateNumberFromComma(data[0].body.account_remain)}
                    </span>
                    <span>ریال</span>
                  </>
                )}
              </span>
            </p>
            <p>
              <span>وضعیت قرارداد اعتباری</span> :
              <span>{data[0].body.has_credit ? "دارد" : "ندارد"}</span>
            </p>
            <p>
              <span>ارزش پرتفو</span>:
              <span>
                {data[0].body.portfo_value === "null" ? (
                  "پرتفو قابل دسترس نمی باشد"
                ) : !data[0].body.portfo_value ? (
                  String(data[0].body.portfo_value) === "0" ? (
                    "0"
                  ) : (
                    "پرتفو قابل دسترس نمی باشد"
                  )
                ) : (
                  <>
                    <span className={"price"}>
                      {seprateNumberFromComma(data[0].body.portfo_value)}
                    </span>
                    <span>ریال</span>
                  </>
                )}
              </span>
            </p>
            <p>
              <span>شناسه مشتری</span> :
              <span>
                {data[0].body.member_automation_id === "null"
                  ? "مشتری نمی باشد"
                  : !data[0].body.member_automation_id
                  ? "مشتری نمی باشد"
                  : data[0].body.member_automation_id}
              </span>
            </p>
          </div>
          <div className={classes["status"]}>
            {data[0].body.policies && (
              <div>
                <CheckIcon
                  style={{ fontSize: 60, color: "green", marginBottom: 20 }}
                />
                <br />
                <p>کاربر شرایط ثبت نام دارد</p>
              </div>
            )}
            {!data[0].body.policies && (
              <div>
                <CancelIcon className={classes["CancelIcon"]} />
                <br />
                <p>کاربر شرایط ثبت نام ندارد</p>
              </div>
            )}
          </div>
        </div>
        <div className={classes["btn"]}>
          <button
            className={"btnsRed"}
            onClick={handleExit}
          >
            لغو
          </button>
          <button
            className={"btnsGreen"}
            onClick={() => setfalg((prev) => !prev)}
          >
            {" "}
            تایید
          </button>
        </div>
        <AlertDialogSlide
          flagShow={falg}
          handleCloseAlert={setfalg}
          handleOkAlert={apiInsertIpo}
          data={dataDelete}
        />
      </div>
    </div>
  );
}

const dataDelete = {
  title: "ثبت عرضه اولیه",
  description: "آیا مطمئن می باشید؟",
};
