import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { news_update } from "../../../../../../redux/content/news/news_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { LinearProgress } from "@material-ui/core";
import Input from "../modalInsert/Inputs";
import { makeStyles } from "@material-ui/styles";
import { news_insert } from "../../../../../../redux/content/news/news_insert/news_insert";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "35%",
    borderRadius: 8,
    padding: 50,
    backgroundColor: "white",
    maxHeight: "70vh",
    // minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    position: "relative"
  },
  form: {
    width: "100%",
    display: "flex",
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
export default function ModalInsert({ data, setNewButton, setflagApi }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    short_description: "",
    title: "",
    image: "",
    category_name: "null"
  });

  const [loading, setloading] = useState(false);

  const handleChange = (value, type) => {
    setstate(prev => ({
      ...prev,

      [type]: value
    }));
  };

  const handleSubmit = () => {
    let obj = {
      ...state,
      image:
        state.image.split(",")[1] !== undefined
          ? state.image.split(",")[1]
          : state.image
    };
    console.log("obj", obj);
    setstate(prevState => {
      return {
        ...prevState,
        image: state.image.split(",")[1]
      };
    });

    news_insert(obj)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        setTimeout(() => {
          setflagApi(prev => !prev);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setNewButton(false);
  };

  return (
    <div className={classes.root}>
      {loading && <LinearProgress className={classes["LinearProgress"]} />}
      <form className={classes.form} noValidate autoComplete="off">
        <Input state={state} handleChange={handleChange} setstate={setstate} />
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
