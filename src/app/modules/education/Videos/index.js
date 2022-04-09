import { Box, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/static/educatinal_videos/videos_select";
import { educationVideos_update_action } from "../../../../redux/static/educatinal_videos/viseos_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  updateBtn: {
    padding: "8px 26px",
    height: "auto",
  },
}));
export default function Index() {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.educationalVideo_select_static_Reducer
  );

  useEffect(() => {
    apiCallSelect();
  }, []);

  useEffect(() => {
    let predata = data.data ? data.data[0].body.content : [];
    setValue(predata);
  }, [data]);

  const apiCallSelect = () => {
    dispatch({ type: actionTypes.educationalVideoAsync });
  };

  const updateVideos = () => {
    let identity = data.data ? data.data[0].id : "";
    educationVideos_update_action(value, identity)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      apiCallSelect();
    }, 500);
  };

  return (
    <>
      <Box>
        <Header handleRefresh={apiCallSelect} />
        <div className={"boxCustom"}>
          <Box display="flex">
            <Box width="400px">
              <TextField
                id="standard-select-currency"
                label={"دسته بندی"}
                value={value}
                onChange={(event) => {
                  let { value } = event.target;
                  setValue(value);
                }}
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
              />
            </Box>

            <Box mt={0}>
              <button
                className={`btnsGreen ${classes.updateBtn}`}
                onClick={() => updateVideos()}
              >
                ذخیره
              </button>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
}
