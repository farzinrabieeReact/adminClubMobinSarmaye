import React, { useState } from "react";
import Styles from "./index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../common/method/date";
// import Excel from "../../../../Common/Components/Excel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Box, Tooltip } from "@material-ui/core";
import Card from "./card";
import { useDispatch } from "react-redux";
// import { discountCode_v1_insert_action } from '../../../../../boot/api/Definitions/gift/discountCode_v1_insert/action';

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

import {
  actionTypes as discount,
  discount_code_select_reducer
} from "../../../../../redux/gift/discountCode/select_single_discount_code";
import { actionTypes } from "../../../../../redux/notificationAlert";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  file: {
    backgroundColor: "white"
  },
  grid: {
    display: "flex",

    justifyContent: "space-between",
    alignItems: "center"
  },
  fade: {
    width: "50%",

    overflow: "auto",
    height: "50vh",
    padding: "20px",
    borderRadius: "10x"
  },
  btnsSuccsess: {
    width: "300px",
    border: "1px solid green",
    fontSize: "20px",
    color: "green",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px"
  },
  btnsDanger: {
    width: "300px",
    border: "1px solid red",
    fontSize: "20px",
    color: "red",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px"
  }
}));

const HeaderUsers = ({
  national_id,
  setNational_id,
  handelSubmitNationalId,
  setNewButton,
  newButton
}) => {
  const classes = useStles();
  let dispatch = useDispatch();
  const [value, setValues] = useState({ file_name: "", file: "" });
  const [showInsertExcel, setShowInsertExcel] = useState(false);

  const stateReducerExcel = useSelector(
    state => state.discount_code_select_reducer
  );

  const handleClickButton = data => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
  };
  const handleClickModal = () => {
    setNewButton(false);
    setShowInsertExcel(false);
  };

  const handelFile = data => {
    if (data) {
      let fileName = data.file_name.split(".");

      if (fileName.length > 3) {
        dispatch(
          dispatch({
            type: actionTypes.error,
            textAlere: "لطفا اسم فایل را تغییر دهید"
          })
        );

        return;
      }

      if (fileName[1] === "xlsx" || fileName[1] === "xls") {
        setValues(data);
      } else {
        dispatch(
          dispatch({
            type: actionTypes.error,
            textAlert: `فرمت فایل رو به درستی وارد نمایید( xlxs , xls )`
          })
        );
      }
    } else {
      setValues({ file_name: "", file: "" });
    }
  };

  const apiInsertDiscount = () => {
    if (value.file) {
      let data = {
        discount_codes_file_url: value.file
      };

      dispatch({
        type: discount.selectSingleDiscountCodeExcelAsync,
        payload: data
      });

      setShowInsertExcel(true);
    } else {
      dispatch({
        type: actionTypes.warning,
        textAlert: "لطفا فایل خود را وارد کنید"
      });
    }
  };

  return (
    <>
      <div className={Styles["header"]}>
        <div className={classes["grid"]}>
          <Box ml={5}>
            <FormControl
              size="small"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="standard-start-adornment">
                کد ملی را وارد نمایید
              </InputLabel>
              <OutlinedInput
                id="standard-start-adornment"
                type={"text"}
                value={national_id}
                onChange={event => setNational_id(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handelSubmitNationalId()}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                      // onClick={handel_submit}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={270}
              />
            </FormControl>
          </Box>
        </div>
      </div>
      {newButton && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={newButton}
          onClose={() => handleClickButton("NEW")}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={newButton}>
            <Card
              value={value}
              setValues={setValues}
              handelFile={handelFile}
              apiInsertDiscount={apiInsertDiscount}
              setNewButton={setNewButton}
              stateReducerExcel={stateReducerExcel}
              showInsertExcel={showInsertExcel}
              setShowInsertExcel={setShowInsertExcel}
            />
          </Fade>
        </Modal>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showInsertExcel}
        onClose={() => setShowInsertExcel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={showInsertExcel}>
          <div
            className={classes.fade}
            style={{ background: "white", overFlow: "hidden" }}
          >
            <div className="d-flex justify-content-center w-100">
              <div className="w-50 d-flex flex-column align-items-center">
                <span className={classes.btnsSuccsess}>تایید شده ها</span>

                <ul style={{ listStyle: "none", padding: "0" }}>
                  {stateReducerExcel.excel.length !== 0 &&
                    stateReducerExcel.excel.map(
                      (itm, ind) =>
                        itm.result === "inserted" && (
                          <li className="mb-1">
                            <span style={{ fontWeight: "bold" }}>
                              کد تایید شده:
                            </span>{" "}
                            {itm.code}
                          </li>
                        )
                    )}
                </ul>
              </div>
              <div className="w-50 d-flex flex-column align-items-center">
                <span className={classes.btnsDanger}>تایید نشده ها</span>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {stateReducerExcel.excel.length !== 0 &&
                    stateReducerExcel.excel.map((itm, ind) =>
                      itm.result === "duplicated" ? (
                        <li className="mb-1 ">
                          <span style={{ fontWeight: "bold" }}>
                            کد تخفیف تکراری:
                          </span>{" "}
                          {itm.code}
                        </li>
                      ) : itm.result === "INVALID_CODE" ? (
                        <li className="mb-1">
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            کد تخفیف نامعتبر:
                          </span>{" "}
                          {itm.code}{" "}
                        </li>
                      ) : itm.result === "INVALID EXPIRATION DATE" ? (
                        <li className="mb-1">
                          <span style={{ fontWeight: "bold" }}>
                            کد تخفیف با تاریخ نا معتبر:
                          </span>{" "}
                          {itm.code}
                        </li>
                      ) : itm.result === "INVALID CATEGORY" ? (
                        <li className="mb-1">
                          <span style={{ fontWeight: "bold" }}>
                            کد تخفیف با شناسه کد نامعتبر:
                          </span>{" "}
                          {itm.code}
                        </li>
                      ) : (
                        itm.result !== "inserted" && (
                          <li className="mb-1">
                            {" "}
                            <span style={{ fontWeight: "bold" }}>
                              همه کد ها تایید شده است
                            </span>{" "}
                          </li>
                        )
                      )
                    )}
                </ul>
              </div>
            </div>
            {/*<div>*/}
            {/*  <ul style={{  listStyle: "none" }}>*/}
            {/*    {stateReducerExcel.excel.length !== 0 &&*/}
            {/*        stateReducerExcel.excel.map((itm, ind) => (*/}
            {/*            <li>{itm.result}</li>*/}
            {/*        ))}*/}
            {/*  </ul>*/}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*</div>*/}
            <div className="w-100 d-flex justify-content-end">
              <button className="btnsGreen" onClick={() => handleClickModal()}>
                تایید
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default HeaderUsers;
