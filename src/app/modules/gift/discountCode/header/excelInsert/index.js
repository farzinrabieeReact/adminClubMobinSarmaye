import React, { useEffect } from "react";
// import { CSVLink  } from "react-csv";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { dateMiladiToShamsi } from "./../../../../../common/method/date";
import Exlsx from '../exlsx'
import {actionTypes as discount} from '../../../../../../redux/gift/discountCode/select_single_discount_code'
// import { DISCOUNT_CODE_EXCEL_EMPTY } from './../../../../../../boot/api/typeActions';

export default function Index({ data, flagExcel, setFlagExcel }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // dispatch({ type: DISCOUNT_CODE_EXCEL_EMPTY })
      dispatch({type:discount.selectSingleDiscountCodeEmpty})
    };
  }, [flagExcel]); //eslint-disable-line react-hooks/exhaustive-deps

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "کد تخفیف", key: "code" },
    { label: "دسته بندی", key: "category" },
    { label: "تاریخ انقضا", key: "expiration_date" },
    { label: "شناسه", key: "result" },
  ];

  const handleExcelData = () => {
    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        code: info.code,
        category: info.category,
        expiration_date: dateMiladiToShamsi(info.expiration_date.split(" ")[0]),
        result: info.result,
      };
    });
    return dataExcel;
  };

  const handleClose = () => {
    setFlagExcel(false);
  };

  return (
    <div>
      <Dialog
        open={flagExcel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">خروجی اکسل</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا برای خروجی گرفتن مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btnsRed" >
            لغو
          </button>
          <botton onClick={handleClose} >
            {/* <CSVLink
                                data={handleExcelData()}
                                headers={headers}
                                filename={"discount_code_report.csv"}
                            >
                                تایید
                            </CSVLink> */}
                       

            <Exlsx
              filename={"react"}
            //   handleExitExcel={handleExitExcel}
              data={handleExcelData()}
              headers={headers}
              handleClose={handleClose}
            />
          </botton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
