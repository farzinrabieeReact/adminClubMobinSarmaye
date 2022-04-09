import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as Excel } from "../../../../redux/Excel";

import Exlsx from "./exlsx/index";

const useStyles = makeStyles({
  button: {
    padding:0,
    width:'25px !important',
    minWidth: '25px !important',
    "&:hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  },
});

const Index = ({
  filename,
  headers,
  handleExcelData,
  stateFilter,
  tableApi,
  methodType,
  methodType2,
  valueTab
}) => {
  const [state, setstate] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const stateReducerExcel = useSelector((state) => state.excel_select_reducer);

  const handlExcelFileBtn = () => {
    handleSubmitExcel();
  };

  const handleSubmitExcel = () => {
    dispatch({ type: Excel.excelSelectEmpty });
    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });

    if (valueTab === 1) {
      dispatch({
        type: Excel.excelSelectAsync,
        payload: { obj, methodType2, tableApi, valueTab },
      });
    } else {
      dispatch({
        type: Excel.excelSelectAsync,
        payload: { obj, methodType, tableApi, valueTab: 0 },
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: Excel.excelSelectEmpty });
    dispatch({ type: Excel.excelSelectIsOk, payload: false });
  };

  useEffect(() => {
    if (stateReducerExcel.isOk) {
      setstate(true);
      setOpen(true);
    }
  }, [stateReducerExcel.isOk]);

  useEffect(() => {
    if (stateReducerExcel.loading) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, [stateReducerExcel.loading]);

  useEffect(() => {
    return () => {
      dispatch({ type: Excel.excelSelectEmpty });
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleExitExcel = () => {
    handleClose()
    setstate(false);
    dispatch({ type: Excel.excelSelectIsOk, payload: false });
  };

  return (
    <Fragment>
      <Button
        className={classes.button}
        disabled={loading}
        onClick={handlExcelFileBtn}
      >
        <img
          src="/media/common/excel.ico"
          alt="test"
          style={
            loading
              ? { width: 25, height: 25, opacity: 0.3 }
              : { width: 25, height: 25, cursor: "pointer" }
          }
        />
        {loading && <CircularProgress style={buttonProgress} size={24} />}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">خروجی اکسل</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{padding:"10px 35px"}}>
            آیا برای خروجی گرفتن مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{padding:15}}>
          <button onClick={handleClose} className="btnsRed">
            لغو
          </button>
            {state ? (
              <>
                    <Exlsx
                      filename={filename ? filename : "generatedBy_react"}
                      handleExitExcel={handleExitExcel}
                      data={handleExcelData()}
                      headers={headers}
                      handleClose={handleClose}
                    />
              </>
            ) : null}
  
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Index;

let buttonProgress = {
  color: "green",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12,
};
