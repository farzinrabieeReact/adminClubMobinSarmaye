import React, { useState } from "react";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { news_delete } from "../../../../../../redux/content/news/news_delete/news_delete";

const ButtonDelete = ({ data, setflagApi }) => {
  const [flag, setflag] = useState(false);
  const [flagButton, setFlagButton] = useState("TRUE");
  const handleClick = type => {
    setflag(true);
    setFlagButton(type);
  };

  const apiDelete = () => {
    let _data = {
      _id: data.id,
      is_visible: flagButton
    };
    news_delete(_data)
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
      {data.body.is_visible === "FALSE" ? (
        <button className="btnsGreen" onClick={() => handleClick("TRUE")}>
          فعال
        </button>
      ) : (
        data.body.is_visible === "TRUE" && (
          <button className="btnsRed" onClick={() => handleClick("FALSE")}>
            غیر فعال
          </button>
        )
      )}

      <AlertDialogSlide
        flagShow={flag}
        handleCloseAlert={setflag}
        handleOkAlert={apiDelete}
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
