import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { systems_update_action } from "../../../../../../../redux/static/systems/systems_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../../../common/method/handleNotificationAlert";

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

export default function Index({ setNewButton, dataPrev, data, api_call_select }) {
  const classes = useStyles();
  const [Title, setTitle] = useState(data ? data.Title : "");
  const [Url, setUrl] = useState(data ? data.Url : "");
  const dispatch = useDispatch();

  const handleSubmitUpdate = () => {
    if (!Title || !Url) {
      alert("عنوان یا لینک را پر نکرده اید");
      return;
    }

    let parsDataPrev = JSON.parse(dataPrev[0].body.content);
    let dataNew = { Title, Url };
    let setDataInsert = [...parsDataPrev, dataNew];

    let id = dataPrev[0].id;
    if (data) {
      let dataUpdate = parsDataPrev.map((item) => {
        if (item.Title === data.Title) {
          return { Title, Url };
        }
        return item;
      });
      // dispatch(telegram_link_v1_update_actions(JSON.stringify(dataUpdate), id))
      systems_update_action(JSON.stringify(dataUpdate), id)
        .then((result) => {
          let isok = handleNotificationAlertTryUpdate(result);
          if (!isok) {
            return;
          }
          api_call_select();
        })
        .catch((err) => {
          handleNotificationAlertCatch();
        });
    } else {
      // dispatch(telegram_link_v1_update_actions(JSON.stringify(setDataInsert), id))
      systems_update_action(JSON.stringify(setDataInsert), id)
        .then((result) => {
          let isok = handleNotificationAlertTryUpdate(result);
          if (!isok) {
            return;
          }
          api_call_select();
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
              value={Title}
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
              value={Url}
              onChange={(event) => {
                let { value } = event.target;
                setUrl(value);
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
