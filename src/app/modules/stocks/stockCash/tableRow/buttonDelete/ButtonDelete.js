import React, { useState } from "react";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import { discountCode_delete } from "../../../../../../redux/gift/discountCode/discountCode_delete/discountCode_delete";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { stockCash_delete } from "../../../../../../redux/stock/stockCash/stockCash_delete";

const ButtonDelete = ({ data, setflagApi }) => {
  const [flag, setflag] = useState(false);
  const apiDeleteDiscountCode = () => {
    let _data = {
      _id: data.id
    };
    stockCash_delete(_data)
      .then(res => {
        let ok = handleNotificationAlertTryUpdate(res);
        if (!ok) {
          return;
        }
        setTimeout(() => {
          setflagApi(prev => !prev);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });

    setflag(prev => !prev);
  };
  return (
    <>
      <button className="btnsRed" onClick={() => setflag(true)}>
        حذف
      </button>
      <AlertDialogSlide
        flagShow={flag}
        handleCloseAlert={setflag}
        handleOkAlert={apiDeleteDiscountCode}
        data={dataAlertDialogSlide}
      />
    </>
  );
};
const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};

export default ButtonDelete;
