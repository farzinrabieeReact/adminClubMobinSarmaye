import React from "react";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import ModalEdit from "../modalEdit/ModalEdit";
import { makeStyles } from "@material-ui/styles";
const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconAttechment: {
    cursor: "pointer"
  }
}));
const ButtonModal = ({
  flagEdit,
  setFlagEdit,
  item,
  index,
  handelSubmitUpdate
}) => {
  const classes = useStles();
  const handleClickButton = () => {
    setFlagEdit(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagEdit}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagEdit}>
          <ModalEdit
            index={index}
            data={item}
            handelSubmitUpdate={handelSubmitUpdate}
            setFlagEdit={setFlagEdit}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default ButtonModal;
