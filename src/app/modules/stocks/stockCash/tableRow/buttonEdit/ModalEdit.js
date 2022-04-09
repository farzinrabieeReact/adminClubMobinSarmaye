import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Input from "./Inputs";
import { stockCash_update } from "../../../../../../redux/stock/stockCash/stockCash_update/stockCash_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { actionTypes } from "../../../../../../redux/notificationAlert";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "35%",
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: "70vh",
    // minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    position: "relative"
  },
  form: {
    "& > *": {
      width: "100%",
      margin: "10px 1%"
    }
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  },
  LinearProgress: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%"
  }
}));

export default function ModalEdit({ data, setNewButton, setflagApi }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setstate] = useState(initState);
  const [loading, setloading] = useState(false);

  const handleSubmit = () => {
    let { body } = state;

    let obj = {};
    let flag = false;

    Object.keys(body).forEach(element => {
      if (body[element] || body[element] === 0) {
        obj[element] = body[element];
      } else {
        flag = true;
      }
    });

    if (flag) {
      dispatch({
        type: actionTypes.error,
        status: true,
        textAlert: `لطفا تمامی فیلد های مورد نظر را پر نمایید`,
        typeAlert: "error"
      });
      return;
    }

    setloading(true);
    stockCash_update({ ...body, _id: state.id })
      .then(res => {
        let ok = handleNotificationAlertTryUpdate(res);
        setloading(false);
        if (!ok) return;
        setTimeout(() => {
          setflagApi(prev => !prev);
          setNewButton(false);
        }, 1000);
      })
      .catch(() => {
        setloading(false);
        handleNotificationAlertCatch();
      });

    // stockCash_update({ ...body, _id: state.id })
    //     .then((res) => {
    //         handleAlertAndSelectApi(res.data, null, dispatch)
    //         setloading(false)
    //         if (res.data.response.error_code) {
    //             return
    //         }
    //         setTimeout(() => {
    //             setflagApi(prev => !prev)
    //             setNewButton(false)
    //         }, 1000);
    //     })
    //     .catch(() => {
    //         setloading(false)
    //         handleNoAnswarApi(dispatch)
    //     })
  };

  useEffect(() => {
    if (data) setstate(data);
  }, [data]);

  const handleChange = (value, type) => {
    setstate(prev => ({
      ...prev,
      body: {
        ...prev.body,
        [type]: value
      }
    }));
  };

  return (
    <div className={classes.root}>
      {loading && <LinearProgress className={classes["LinearProgress"]} />}
      <form className={classes.form} noValidate autoComplete="off">
        <Input state={state} handleChange={handleChange} />
      </form>

      <div className={classes.buttons}>
        <button className="btnsGreen" onClick={handleSubmit}>
          ثبت
        </button>

        <button className="btnsRed" onClick={() => setNewButton(false)}>
          انصراف
        </button>
      </div>
    </div>
  );
}

let initState = {
  id: "",
  body: {
    isin: "",
    member_first_name: "",
    member_last_name: "",
    member_id: "",
    member_national_id: "",
    company_name: "",
    stock_symbol: "",
    agm_date: "",
    stocks: "",
    dividend_value: "",
    distributed_gross_margin: "",
    distributed_netincome: "",
    publish_date: "",
    pay_date: "",
    pre_price_stock_agm: "",
    post_price_stock_agm: "",
    pre_value_stock: "",
    post_value_stock: "",
    company_asset: "",
    valid_netincome: "",
    DC_CREATE_TIME: ""
  }
};
