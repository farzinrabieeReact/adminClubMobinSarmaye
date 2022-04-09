import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ flagShow, handleCloseAlert, handleOkAlert, data }) {

  return (
    <div>
      <Dialog
        open={flagShow}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleCloseAlert(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      
      >
        <DialogTitle id="alert-dialog-slide-title"   style={{width:500 , margin:'auto'}}>{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {data.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOkAlert}
            color="primary">
            بله
          </Button>
          <Button onClick={() => handleCloseAlert(false)} color="primary">
            خیر
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}