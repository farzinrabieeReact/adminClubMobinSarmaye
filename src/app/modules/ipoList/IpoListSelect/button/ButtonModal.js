import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
// import { CSVLink } from "react-csv";
// import { EXCEL_GET_ISOK } from "../../../../../boot/api/typeActions";
// import { Insert_activeIpo } from "../../../../../boot/api/Definitions/ipoLIst/insert_activeIpo/action";
import { useDispatch } from "react-redux";
import { Insert_activeIpo } from "../../../../../redux/ipoList/ipoList_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../common/method/handleNotificationAlert";

const ButtonModal = ({
  active,
  id,
  isActive,
  flagButton,
  ind,
  indexClick,
  setFlagButton,
  setStateActive,
  setflagApi,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    setFlagButton(false);
    setStateActive((prev) => prev);
    setStateActive({
      id: "",
      method: "",
      active: false,
      ind: "",
    });
    // dispatch({type:EXCEL_GET_ISOK,payload:false})
  };
  const handelClick = (e) => {
    e.stopPropagation();
    let methodType = "";
    if (isActive === "TRUE") {
      methodType = "deactivate_ipo";
    } else {
      methodType = "activate_ipo";
    }
    Insert_activeIpo(id, methodType)
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
        setflagApi((prev) => !prev);
        setStateActive({
          id: "",
          method: "",
          active: false,
          ind: "",
        });
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
  };

  useEffect(() => {
    if (ind === indexClick) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      {/*<Button onClick={() => setOpen(!open)}>tudgdf</Button>*/}

      <Dialog
        open={open}
        onClose={(e) => handleClose(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">انجام عملیات</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {active
              ? "آیا میخواهید عرضه مورد نظر فعال شود؟"
              : "آیا میخواهید عرضه مورد نظر غیر فعال شود؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)} color="primary">
            لغو
          </Button>
          <Button onClick={(e) => handelClick(e)} color="primary" autoFocus>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModal;
