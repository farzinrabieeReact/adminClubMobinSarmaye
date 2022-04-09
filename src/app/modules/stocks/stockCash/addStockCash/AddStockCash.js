import React, { useEffect, useState } from "react";
import { Backdrop, Fade, Modal, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ModalInsert from "./ModalInsert";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/notificationAlert";
import {
  actionTypes as actionTypesStockCashInsert,
  stockCash_insert_Reducer
} from "../../../../../redux/stock/stockCash/stockCash_insert/stockCash_insert";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
const AddStockCash = ({
  setNewButton,
  newButton,
  setflagApi,
  stateReducerInsert
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValues] = useState({ file_name: "", file: "" });
  const handleClickButton = data => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
    return;
  };
  useEffect(() => {
    if (stateReducerInsert.data.length !== 0) {
      setflagApi(prev => !prev);
    }
  }, [stateReducerInsert]);
  const handelFile = data => {
    if (data) {
      let fileName = data.file_name.split(".");

      if (fileName.length > 3) {
        dispatch(
          dispatch({
            type: actionTypes.error,
            textAlert: "لطفا اسم فایل را تغییر دهید"
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
        codal_participation_file_url: value.file
      };
      // console.log("dataaaaa", data);

      dispatch({
        type: actionTypesStockCashInsert.insertCodalAsync,
        payload: data
      });

      setNewButton(false);
    } else {
      dispatch({
        type: actionTypes.warning,
        textAlert: "لطفا فایل خود را وارد کنید"
      });
    }
  };
  return (
    <>
      <Tooltip title={"افزودن جدید"} placement="top-end" arrow>
        <Add
          style={{ marginLeft: "15px" }}
          onClick={() => setNewButton(prev => !prev)}
          fontSize="large"
        />
      </Tooltip>
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
          <ModalInsert
            value={value}
            setValues={setValues}
            setNewButton={setNewButton}
            setflagApi={setflagApi}
            handelFile={handelFile}
            apiInsertDiscount={apiInsertDiscount}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default AddStockCash;
