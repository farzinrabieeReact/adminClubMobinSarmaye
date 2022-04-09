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
  // paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     // border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(4, 6, 3),
  //     minWidth: "931px",
  //     borderRadius: 10
  // },
}));
const ModalDetails = ({
  flagDetails,
  setFlagDetails,
  stateReducerId,
  stateClick,
  setflagApi,
  item
}) => {
  const classes = useStyles();
  console.log("itemm", item);
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
            stateReducer={stateReducerId}
            setFlagDetails={setFlagDetails}
            stateClick={stateClick}
            setflagApi={setflagApi}
            item={item}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDetails;
