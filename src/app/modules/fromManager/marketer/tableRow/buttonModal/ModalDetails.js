import React from "react";
import { Fade, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/styles";
import ModalContent from "./ModalContent";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ModalDetails = ({
  flagDetails,
  setFlagDetails,
  item
}) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description11"
        className={classes.modal}
        open={flagDetails}
        onClose={() => setFlagDetails(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagDetails}>
          <ModalContent
            item={item}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDetails;