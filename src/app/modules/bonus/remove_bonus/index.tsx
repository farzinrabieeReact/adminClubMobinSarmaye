import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { remove_bonus_dispatch } from "../../../../redux/bonus/remove_bonus";
import { actionTypes } from "../../../../redux/notificationAlert";
import { data_m } from "../../../common/method/date";

import AxiosCustom from "../../../common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
// import {actionTypes} from './../../../redux/notificationAlert';
// import { bonus_v1_actions_add } from '../../../../../boot/api/Definitions/bonus/bounes_v1_add/action';
// import { bonus_v1_actions_remove } from '../../../../../boot/api/Definitions/bonus/bounes_v1_remove/action';
// import { bonus_v1_actions_reserve } from '../../../../../boot/api/Definitions/bonus/bounes_v1_reserve/action';

interface State {
  value: string | any;
  national_id: string | any;
  source_description: string | any;
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    width: "100%"
  },
  textField: {
    width: "35ch",
    [`& fieldset`]: {
      borderRadius: 20
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30
  }
}));

export default function ModalCustom({ value, memberId }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setloading] = useState<boolean>(false);
  const [state, setstate] = useState<State | any>({
    value: "",
    source_description: ""
  });

  const handleChange = (data: string, type: string) => {
    setstate((prev: any) => ({
      ...prev,
      [type]: data
    }));
  };

  const handleSubmit = async () => {
    let obj: any = {};

    Object.keys(state).forEach((element: any) => {
      if (state[element]) {
        obj[element] = state[element];
      }
    });

    if (+Object.keys(obj).length <= 1) {
      dispatch({
        type: actionTypes.warning,
        textAlert: `لطفا فیلد های مورد نظر را وارد نمایید`
      });

      return;
    }

    setloading(true);

    let removeDate = {
      ...state,
      create_date: data_m()
    };

    let config = { url: "insert_request" };

    let { ...dataOther } = removeDate;
    let setdata = {
      ...dataOther,
      member_id: memberId,
      closing_date: null,
      status: null,
      bonus_type: null,
      source: null
    };

    let _data = {
      table: "bonus",
      method_type: "remove_bonus",
      data: setdata
    };

    try {
      let response = await AxiosCustom(config, _data);
      handleNotificationAlertTryUpdate(response);
      setloading(false);
    } catch (err) {
      handleNotificationAlertCatch();
      setloading(false);
    }

    // remove_bonus_dispatch(removeDate)
    //   .then(async (data: any) => {
    //     if (!data) {
    //       setloading(false);
    //       return;
    //     }
    //
    //     let config = { url: "insert_request" };
    //
    //     let { national_id, ...dataOther } = removeDate;
    //     let setdata = {
    //       ...dataOther,
    //       member_id: data.data.response.data.results[0].id,
    //       closing_date: null,
    //       status: null,
    //       bonus_type: null,
    //       source: null
    //     };
    //
    //     let _data = {
    //       table: "bonus",
    //       method_type: "remove_bonus",
    //       data: setdata
    //     };
    //
    //     try {
    //       let response = await AxiosCustom(config, _data);
    //       handleNotificationAlertTryUpdate(response);
    //       setloading(false);
    //     } catch (err) {
    //       handleNotificationAlertCatch();
    //       setloading(false);
    //     }
    //   })
    //   .catch(() => {
    //     handleNotificationAlertCatch();
    //     setloading(false);
    //   });
  };

  return (
    <div className={classes.root}>
      {loading && <LinearProgress />}
      <Box p={5}>
        <Box display="flex">
          <Box width={230} style={{ margin: "20px" }}>
            <TextField
              value={value}
              label="کدملی"
              variant="outlined"
              fullWidth
              disabled={true}
            />
          </Box>
          <Box width={230} style={{ margin: "20px" }}>
            <TextField
              value={state.value}
              onChange={e => handleChange(e.target.value, "value")}
              label="مقدار"
              variant="outlined"
              fullWidth
              type="number"
            />
          </Box>
        </Box>

        <Box width={500} style={{ margin: "10px 20px" }}>
          <TextField
            value={state.source_description}
            onChange={e => handleChange(e.target.value, "source_description")}
            label="توضیحات مبدا"
            variant="outlined"
            fullWidth
            multiline
          />
        </Box>
        <Box className={classes.buttons}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {" "}
            کسر امتیاز
          </Button>
        </Box>
      </Box>
    </div>
  );
}
