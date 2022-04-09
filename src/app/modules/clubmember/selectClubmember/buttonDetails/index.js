import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";


import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalDetailsUsers from "../modalDetailsUser";
import Button from '@material-ui/core/Button';

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Index({ info, data }) {

  const classes = useStles();
  const [newButton, setNewButton] = useState(false);

  const Components = {
    ModalDetails: <ModalDetailsUsers data={data} />,
    
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

