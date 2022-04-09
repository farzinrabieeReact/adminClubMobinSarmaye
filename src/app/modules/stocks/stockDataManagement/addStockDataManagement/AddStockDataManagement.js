import React, { useState } from "react";
import { Backdrop, Fade, Modal, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import ModalInsert from "./ModalInsert";
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
const AddStockManagement = ({ FlagInsert, setFlagInsert, setflagApi }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValues] = useState({ file_name: "", file: "" });
  return (
    <>
      <Tooltip title={"افزودن سهم جدید"} placement="top-end" arrow>
        <Add
          style={{ marginLeft: "15px" }}
          onClick={() => setFlagInsert(true)}
          fontSize="large"
        />
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={FlagInsert}
        onClose={() => setFlagInsert(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={FlagInsert}>
          <ModalInsert setflagApi={setflagApi} setFlagInsert={setFlagInsert} />
        </Fade>
      </Modal>
    </>
  );
};

export default AddStockManagement;
