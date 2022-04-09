import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import { telegram_link_v1_update_actions } from "./../../../../../../boot/api/staticPage/TelegramLink/telegram_link_v1_update_actions/action";
import { useDispatch } from "react-redux";
import { telegram_update } from "../../../../../../redux/connect/telegram_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
  handleNotificationAlertTryUpdate,
} from "../../../../../common/method/handleNotificationAlert";

const useStyles = makeStyles((theme) => ({
  ModalAdd: {
    width: 600,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
  },
  root: {
    padding: "20px 0",

    width: "90%",
    margin: "auto",
    "& .MuiBox-root": {
      margin: theme.spacing(1),
    },
  },
  btns: {
    margin: "0px 0 10px 0",
    textAlign: "right",
    width: "95%",
  },
}));

export default function Index({ setNewButton, dataPrev, data, handleRefresh }) {
  const classes = useStyles();
  const [title, setTitle] = useState(data ? data.title : "");
  const [link, setLink] = useState(data ? data.link : "");
  const dispatch = useDispatch();

  const handleSubmitUpdate = () => {
    if (!title || !link) {
      alert("عنوان یا لینک را پر نکرده اید");
      return;
    }

    let parsDataPrev = JSON.parse(dataPrev[0].body.content);
    let dataNew = { title, link };
    let setDataInsert = [...parsDataPrev, dataNew];

    let id = dataPrev[0].id;

    if (data) {
      let dataUpdate = parsDataPrev.map((item) => {
        if (item.title === data.title) {
          return { title, link };
        }
        return item;
      });

      // dispatch(telegram_link_v1_update_actions(JSON.stringify(dataUpdate), id))
      telegram_update(JSON.stringify(dataUpdate), id)
        .then((result) => {
          let isok = handleNotificationAlertTryUpdate(result);
          if (!isok) {
            return;
          }


          handleRefresh();
        })
        .catch((err) => {
          handleNotificationAlertCatch();
        });
    } else {
      // dispatch(telegram_link_v1_update_actions(JSON.stringify(setDataInsert), id))
      telegram_update(JSON.stringify(setDataInsert), id)
        .then((result) => {
          let isok = handleNotificationAlertTryUpdate(result);
          if (!isok) {
            return;
          }
          handleRefresh();
        })
        .catch((err) => {
          handleNotificationAlertCatch();
        });
    }
    setNewButton(false);
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <div>
          <Box width="50%">
            <TextField
              label="عنوان"
              id="titleNewButton"
              value={title}
              onChange={(event) => {
                let { value } = event.target;
                setTitle(value);
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="dense"
            />
          </Box>

          <Box width="100%">
            <TextField
              label="لینک"
              id="titleNewButton1"
              value={link}
              onChange={(event) => {
                let { value } = event.target;
                setLink(value);
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="dense"
            />
          </Box>
        </div>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsGreen"} onClick={handleSubmitUpdate}>
          ذخیره{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>
    </div>
  );
}
