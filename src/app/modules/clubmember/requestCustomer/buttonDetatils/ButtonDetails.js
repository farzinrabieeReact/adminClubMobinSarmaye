import React from "react";
import { Fade, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/styles";
import ModalDetailsCustomer from "./modalDetailsCustomer/ModalDetailsCustomer";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  // paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     // border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(4, 6, 3),
  //     minWidth: "931px",
  //     borderRadius: 10
  // },
}));
const ButtonDetails = ({ setFlagDetails, flagDetails, data }) => {
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
          <ModalDetailsCustomer data={data} />
        </Fade>
      </Modal>
    </>
  );
};

export default ButtonDetails;
