import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import { workWithUs_update } from "../../../../../../redux/formManager/workWithUs/workWithUs_update/workWithUs_udpate";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";

const StatusModal = ({ openAlert, setOpenAlert, item, apiSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handelclick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelsubmit = (type, data) => {
    let status = findstatus(type);

    let obj = {
      _id: data.id,
      status: status.status
    };
    workWithUs_update(obj)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        setTimeout(() => {
          apiSubmit();
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });

    setAnchorEl(null);
  };
  const handel_Submit_roll = () => {
    setOpenAlert(false);
  };
  const findstatus = key => {
    switch (key) {
      case "SUBMITTED":
        return { value: "بررسی نشده", status: "SUBMITTED" };
      case "FINALIZED":
        return { value: "بررسی شده", status: "FINALIZED" };
      case "REJECTED":
        return { value: "رد شده", status: "REJECTED" };
      default:
        break;
    }
  };

  return (
    <>
      <Button
        style={{ marginRight: 5, fontSize: 12, fontWeight: "bold" }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handelclick}
        className="btnsGreen"
      >
        تغییر وضعیت{" "}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handelsubmit("SUBMITTED", item)}>
          بررسی نشده
        </MenuItem>
        <MenuItem onClick={() => handelsubmit("FINALIZED", item)}>
          بررسی شده{" "}
        </MenuItem>
        <MenuItem onClick={() => handelsubmit("REJECTED", item)}>
          رد شده{" "}
        </MenuItem>
      </Menu>

      {/*{openAlert && (*/}
      {/*  <AlertDialogSlide*/}
      {/*    flagShow={openAlert}*/}
      {/*    handleCloseAlert={setOpenAlert}*/}
      {/*    handleOkAlert={handel_Submit_roll}*/}
      {/*    data={{*/}
      {/*      title: "ویرایش",*/}
      {/*      description: `آیا میخواهید این رکورد را به ${status.value} تغییر وضعیت دهید؟`*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};

export default StatusModal;
