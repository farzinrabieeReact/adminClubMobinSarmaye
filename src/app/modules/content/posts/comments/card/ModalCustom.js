import React from "react";
import { Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "80%"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid rgba(0,0,0,0.1) !important ",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 2),
    borderRadius: 5
    // maxWidth:'80%'
  },
  backDrop: {
    background: "rgba(0,0,0,0.67) !important"
  }
}));

export default function TransitionsModal({ open, setOpen, children }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <Fade in={open}>
          <div className={`${classes["root"]} bg-white p-10 rounded-lg shadow`}>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
