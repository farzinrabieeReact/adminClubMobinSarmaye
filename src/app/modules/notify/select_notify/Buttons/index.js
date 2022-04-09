import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";

import ModalEdit from "../ModalEdit";
import ModalDetails from "../ModalDetails";

import AlertDialogSlide from "./../../../../common/components/AlertDialogSlide";
import { convertDigitToEnglish } from "./../../../../common/method/convertDigitToEnglish/index";

import { remove_notify_dispatch } from './../../../../../redux/notify/remove_notify';
import { update_notify_dispatch } from './../../../../../redux/notify/update_notify';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../../common/method/handleNotificationAlert';
import Button from '@material-ui/core/Button';



const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default  function Index({ info, data , apiSubmit  }) {

  const classes = useStles();
  const [newButton, setNewButton] = useState(false);


  const handelSubmitUpdate = (date) => {

    let startDate;
    if (!date.startDate.length) {
      startDate = date.startDate.format("YYYY/MM/DD")
    }

    let endDate;
    if (!date.endDate.length) {
      endDate = date.endDate.format("YYYY/MM/DD")
    }

    let result = {
      start_time:
        `${
        startDate
          ? convertDigitToEnglish(startDate)
          : date.startDate
        } ${date.startTime.split(" ")[1]}`
      ,
      end_time:
        `${
        endDate
          ? convertDigitToEnglish(endDate)
          : date.endDate
        } ${date.endTime.split(" ")[1]}`
      ,
      _id: data.id,
    };


    update_notify_dispatch(result)
      .then(res => {
        handleNotificationAlertTryUpdate(res)
        apiSubmit()
        setNewButton(false);
      })
      .catch(err => {
        handleNotificationAlertCatch()
        setNewButton(false);
      })

    //
  };

  const handelDelete = () => {

    remove_notify_dispatch({ _id: data.id })
    .then(res => {
      handleNotificationAlertTryUpdate(res)
      apiSubmit()
      setNewButton(false);
    })
    .catch(err => {
      handleNotificationAlertCatch()
      setNewButton(false);
    })

  };

  const Components = {
    ModalDetails: <ModalDetails data={data} />,
    ModalEdit: (
      <ModalEdit
        setNewButton={setNewButton}
        data={data}
        handelSubmitUpdate={handelSubmitUpdate}
      />
    ),
    modalDelete: (
      <AlertDialogSlide
        flagShow={newButton}
        handleCloseAlert={setNewButton}
        handleOkAlert={handelDelete}
        data={dataDelete}
      />
    ),
  };

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
  };

  return (
    <>
      <Button
        color={info.color}
        variant="contained"
        className={'m-1'}
        style={{ marginTop: 10 }}
        onClick={() => {
          setNewButton(!newButton);
        }} >
        {info.title}{" "}
      </Button>

  
      {info.modal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={newButton}
          onClose={() => handleClickButton("NEW")}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={newButton}>{Components[info.modal]}</Fade>
        </Modal>
      )}
    </>
  );
}

const dataDelete = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
};
