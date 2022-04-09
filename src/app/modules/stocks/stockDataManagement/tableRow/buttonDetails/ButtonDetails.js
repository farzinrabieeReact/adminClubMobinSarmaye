import React, { useState } from "react";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ModalDetails from "./ModalDetails";
const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
const MyComponent = ({ data, setflagApi }) => {
  const [newButton, setNewButton] = useState(false);
  const classes = useStles();
  const handleClickButton = () => {
    setNewButton(true);
  };
  return (
    <>
      <button className="btnsBlue" onClick={handleClickButton}>
        جزییات
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => setNewButton(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newButton}>
          <ModalDetails data={data} setflagApi={setflagApi} />
        </Fade>
      </Modal>
    </>
  );
};

export default MyComponent;
