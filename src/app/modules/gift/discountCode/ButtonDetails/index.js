import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import AlertDialogSlide from "./../../../../common/components/AlertDialogSlide";
// import { discountCode_v1_remove } from './../../../../../boot/api/Definitions/gift/discountCode_v1_remove/action'
import { useDispatch } from 'react-redux';


const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));



export default React.memo(function Index({ info, data }) {

  const classes = useStles();
  let dispatch = useDispatch()
  const [flag, setflag] = useState(false)
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
  };



  const handelClick = (key) => {
    switch (key) {
      case 'حذف':
        setflag(prev => !prev)
        return;

      default:
        break;
    }
  }

  const apiDeleteDiscountCode = () => {

    let _data = {
      _id: data.id
    }

    // dispatch(discountCode_v1_remove(_data))
    setflag(prev => !prev)

  }

  return (
    <>
      <button
        className={info.className}
        style={{ marginTop: 10 }}
        onClick={() => handelClick(info.title)}
      >
        {info.title}{" "}
      </button>
      {flag && (
        <>
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
            <Fade in={newButton}>
              <div></div>
            </Fade>
          </Modal>


          <AlertDialogSlide
            flagShow={flag}
            handleCloseAlert={setflag}
            handleOkAlert={apiDeleteDiscountCode}
            data={dataAlertDialogSlide}
          />
        </>
      )}

    </>
  );
}

)

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
}