import { Box, makeStyles, Tooltip } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import AlertDialogSlide from "./../../../../common/components/AlertDialogSlide";
import ModalCustom from "./../../../../common/components/modal";
import Deatils from "./details";
import { PostalCode } from "./postalCode";
import { request_gift_v1_actions_unregister } from "./../../../../../redux/gift/requestGift_v1_unregister/action";
import { request_gift_v1_system_unregister } from "../../../../../redux/gift/requestGift_v1_system_unregister/action";
import { request_gift_v1_system_finalize } from "../../../../../redux/gift/requestGift_v1_system_finalize/action";
import { request_gift_v1_actions_finalize } from "../../../../../redux/gift/requestGift_v1_finalize/action";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../common/method/handleNotificationAlert";
import { request_gift_v1_change_postal_tracking_code } from "../../../../../redux/gift/requestGift_v1_change_postal_tracking_code/action";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import PdfLabel from "../../pdfLabel";

export default function ButtonsTable({ row, setflagApi }) {
  const [openAlertFinalize, setOpenAlertFinalize] = useState(false);
  const [openAlertUnregister, setOpenAlertUnregister] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openPostalCode, setOpenPostalCode] = useState(false);
  const [flagPdf, setflagPdf] = useState(false);

  const clickRef = useRef(null);

  const getDateTimeCurrent = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    let dateCurrent = yyyy + "/" + mm + "/" + dd;

    return dateCurrent;
  };

  const handleOkAlertFinalize = (e, type) => {
    let giftType = row.body.gift_type;
    let dateRegister = row.body.registration_date.split(" ")[0];
    let dateCurrent = getDateTimeCurrent();

    // if (giftType === "UP" || giftType === "BIMEH_SAMAN" || giftType === "DG") {
    if (row.body.is_physical === "FALSE") {
      if (dateRegister === dateCurrent) {
        alert("از درخواست شما یک روز باید بگذره");
      } else {
        apiCallFinalizeSystem(row.id);
      }
    } else {
      apiCallFinalize(row.id, row.body.status);
    }
    setOpenAlertFinalize(false);
  };

  const handleOkAlertUnregister = () => {
    let giftType = row.body.gift_type;
    let dateRegister = row.body.registration_date.split(" ")[0];
    let dateCurrent = getDateTimeCurrent();
    // if (giftType === "UP" || giftType === "BIMEH_SAMAN" || giftType === "DG") {
    if (row.body.is_physical === "FALSE") {
      if (dateRegister === dateCurrent) {
        alert("از درخواست شما یک روز باید بگذره");
      } else {
        apiCallSystemUnregister(row.id);
      }
    } else {
      apiCallUnregister(row.id, row.body.status);
    }
    setOpenAlertUnregister(false);
  };

  const apiCallFinalize = (_id, type) => {
    request_gift_v1_actions_finalize({ _id }, type)
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setflagApi((prev) => !prev);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const apiCallFinalizeSystem = (_id) => {
    request_gift_v1_system_finalize({ _id })
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setflagApi((prev) => !prev);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const apiCallUnregister = (_id, type) => {
    request_gift_v1_actions_unregister({ _id }, type)
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setflagApi((prev) => !prev);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const apiCallSystemUnregister = (_id) => {
    request_gift_v1_system_unregister({ _id })
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setflagApi((prev) => !prev);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const handleClickPostalTrackingCode = (data) => {
    request_gift_v1_change_postal_tracking_code(data)
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setflagApi((prev) => !prev);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const handlePdfBtn = () => {
    setflagPdf(true);
    let myVar = setTimeout(handleClickRef, 1000);
  };

  const handleClickRef = () => {
    clickRef.current.click();
  };

  // const pdfLabel =()=>{
  // }
  // useEffect(() => {
  //   if(flagPdf){
  //     pdfLabel()
  //   }
  // }, [flagPdf]);

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box>
        <button onClick={() => setOpenDetails(true)} className={`btnsBlueNew`}>
          جزئیات
        </button>

        <button
          onClick={() => {
            if (row.body.status === "SUBMITTED") {
              setOpenAlertFinalize(true);
            } else if (row.body.status === "REJECTED") {
              setOpenAlertFinalize(true);
            }
          }}
          className={`btnsGreenNew ${row.body.status === "SUBMITTED"
            ? ""
            : row.body.status === "REJECTED"
              ? ""
              : "disabledItems"
            }`}
        >
          نهایی کردن
        </button>
      </Box>
      <Box mt={1}>
        <button
          onClick={() => {
            if (row.body.status === "SUBMITTED") {
              setOpenAlertUnregister(true);
            } else if (row.body.status === "FINALIZED") {
              setOpenAlertUnregister(true);
            }
          }}
          className={`btnsRedNew ${row.body.status === "SUBMITTED"
            ? ""
            : row.body.status === "FINALIZED"
              ? ""
              : "disabledItems"
            }`}
        >
          رد کردن
        </button>
        <Tooltip title="جایزه باید فیزیکی و نهایی شده باشد">
          <span>
            <button
              onClick={() => handlePdfBtn()}
              className="btnsYellowNew"
              className={`btnsYellowNew ${row.body.status === "FINALIZED" && row.body.gift_type === "PHYSICAL"
                ? ""
                : "disabledItems"
                }`}
            >
              برچسب
        </button>
          </span>
        </Tooltip>
        <Box mt={1}>
          <button
            onClick={() => {
              setOpenPostalCode(true);
            }}
            className="btnsBlueNewBig"
            className={`btnsBlueNewBig ${row.body.status === "FINALIZED" &&
              row.body.gift_type === "PHYSICAL"
              ? ""
              : "disabledItems"
              }`}
          >
            کد رهگیری پستی
          </button>
        </Box>

        {flagPdf && (
          <div>
            <PDFDownloadLink
              document={<PdfLabel row={row} />}
              fileName="label.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button style={{ display: "none" }}>در حال بارگذاری</button>
                ) : (
                    <button
                      style={{ display: "none" }}
                      // onClick={handleCloseDownLoad}
                      ref={clickRef}
                    >
                      دانلود
                    </button>
                  )
              }
            </PDFDownloadLink>
          </div>
        )}
      </Box>
      <ModalCustom open={openDetails} setOpen={setOpenDetails}>
        <Deatils data={row.body.gift_custom_data} />
      </ModalCustom>

      <ModalCustom open={openPostalCode} setOpen={setOpenPostalCode}>
        <PostalCode
          data={row.body.postal_tracking_code}
          id={row.id}
          handleClickPostalTrackingCode={(data) => {
            handleClickPostalTrackingCode(data);
            setOpenPostalCode(false);
          }}
        />
      </ModalCustom>

      <AlertDialogSlide
        flagShow={openAlertFinalize}
        handleCloseAlert={setOpenAlertFinalize}
        handleOkAlert={handleOkAlertFinalize}
        data={dataAlertDialogSlideFinalize}
      />

      <AlertDialogSlide
        flagShow={openAlertUnregister}
        handleCloseAlert={setOpenAlertUnregister}
        handleOkAlert={handleOkAlertUnregister}
        data={dataAlertDialogSlideUnregister}
      />
    </Box>
  );
}

const dataAlertDialogSlideFinalize = {
  title: "نهایی کردن",
  description: "از نهایی کردن این رکورد اطمینان دارید؟",
};

const dataAlertDialogSlideUnregister = {
  title: "لغو کردن",
  description: "از لغو این رکورد اطمینان دارید؟",
};
