import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { contactUs_update } from "../../../../../../redux/formManager/contactUS/contactUs_update/contactUs_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 30,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto"
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15
  },
  LinearProgress: {
    width: "100%"
  }
}));

export default function ModalContent({
  stateReducer,
  setFlagDetails,
  stateClick,
  setflagApi
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dataReducer, setdataReducer] = useState(null);
  const [valueInsert, setValueInsert] = useState({
    response: ""
  });
  useEffect(() => {
    setdataReducer(stateReducer.data[0]?.body);
    return () => {
      setdataReducer(null);
    };
  }, [stateReducer]);

  const handleChangeValueInsert = (value, type) => {
    setValueInsert(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleUpdateApi = (data, id) => {
    let _data = {
      _id: id.id,
      ...data
    };

    contactUs_update(_data)
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
    setFlagDetails(false);
  };

  const handleExit = () => {
    setFlagDetails(false);
  };

  return (
    <div className={classes.modalDetail}>
      {stateReducer.loading && (
        <CircularProgress className={classes["LinearProgress"]} />
      )}

      <h4 className="mb-4">{dataReducer?.title}</h4>
      <p>{dataReducer?.content}</p>

      {dataReducer?.status === "SUBMITTED" && (
        <Box>
          <TextField
            placeholder="پاسخ"
            multiline
            fullWidth
            variant="outlined"
            rows={5}
            rowsMax={11}
            value={valueInsert.response}
            onChange={e => handleChangeValueInsert(e.target.value, "response")}
          />
          <Button
            className={"btnsGreen"}
            style={{ marginTop: "10px" }}
            onClick={() => handleUpdateApi(valueInsert, stateClick)}
          >
            ارسال
          </Button>
          <Button
            className={"btnsRed"}
            style={{ marginTop: "10px", marginRight: "10px" }}
            onClick={() => handleExit()}
          >
            انصراف
          </Button>
        </Box>
      )}

      {dataReducer?.status === "ANSWERED" && (
        <p>{"پاسخ: " + dataReducer?.response}</p>
      )}
    </div>
  );
}
