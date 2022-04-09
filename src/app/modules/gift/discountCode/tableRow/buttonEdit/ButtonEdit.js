import React, { useState } from "react";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ModalEdit from "./ModalEdit";
const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
const ButtonEdit = ({ data, setflagApi }) => {
  const classes = useStles();
  const [newButton, setNewButton] = useState(false);

  const handleClick = () => {
    setNewButton(true);
  };

  return (
    <>
      <button className="btnsYellow" onClick={handleClick}>
        ویرایش
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
          <ModalEdit
            data={data}
            setflagApi={setflagApi}
            setNewButton={setNewButton}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default ButtonEdit;
