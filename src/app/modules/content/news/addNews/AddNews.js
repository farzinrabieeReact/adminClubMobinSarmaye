import React, { useRef } from "react";
import { Backdrop, Fade, Modal, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import ModalInsert from "./modalInsert/ModalInsert";
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
const AddNews = ({ newButton, setNewButton, setflagApi }) => {
  const classes = useStyles();
  let myRef = useRef();
  const handleClickButton = data => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
    return;
  };
  return (
    <>
      <Tooltip title={"افزودن جدید"} placement="top-end" arrow>
        <Add
          style={{ marginLeft: "15px" }}
          onClick={() => setNewButton(prev => !prev)}
          fontSize="large"
        />
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newButton}>
          <ModalInsert setNewButton={setNewButton} setflagApi={setflagApi} />
        </Fade>
      </Modal>
    </>
  );
};

export default AddNews;
