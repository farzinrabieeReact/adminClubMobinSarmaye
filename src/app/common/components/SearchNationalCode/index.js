import React from "react";
import Styles from "./index.module.scss";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { actionTypes } from "../../../../redux/notificationAlert";
import {
  checkNationalCode,
  checkNationalCodeLegal
} from "../../method/nationalCode";

export default function Index({ apiSubmit, value, setValue }) {
  let dispatch = useDispatch();

  const handleSubmit = () => {
    if (value.length === 0) {
      dispatch({
        type: actionTypes.warning,
        textAlert: "لطفا کد ملی مورد نظر را پر نمایید"
      });
      return;
    }

    // let isOkCode = checkNationalCode(value);
    // let isOkLegal = checkNationalCodeLegal(value);

    if (value.length > 11 || value.length < 10) {
      let textError = "لطفا کد ملی را به درستی وارد نمایید";
      dispatch({
        type: actionTypes.warning,
        textAlert: textError
      });
      return;
    } else {
      apiSubmit(value);
      return;
    }
  };

  return (
    <div className={Styles["Search_National_Code"]}>
      <div className={Styles["card"]}>
        <h3 className={Styles["title"]}>جستجوی کد ملی</h3>
        <div className={Styles["cardInput"]}>
          <Box width={350} className={Styles["TextField"]}>
            <TextField
              id="standard-select-currency"
              label={"کد ملی خود را وارد نمایید"}
              value={value}
              onChange={event => setValue(event.target.value)}
              helperText=""
              size="small"
              fullWidth
              variant="outlined"
              margin="dense"
              onKeyDown={event => (event.keyCode === 13 ? handleSubmit() : "")}
            />
          </Box>
        </div>
        <div className={Styles["btns"]}>
          <button className={"btnsGreen"} onClick={handleSubmit}>
            تایید
          </button>
          <button className={"btnsRed"}>لغو</button>
        </div>
      </div>
    </div>
  );
}
