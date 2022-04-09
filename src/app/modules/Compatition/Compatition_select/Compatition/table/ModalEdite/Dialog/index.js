import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({data , index  , state , setState}) {

  const [open, setOpen] = React.useState(false);
  const [massege , setMassege] = React.useState({
      title:'',
      desc:'',
      
  })

  const handleClickOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handelselect = (index)=>{
    setMassege({title:'انتخاب جواب صحیح' , desc:`از انتخاب گزینه ${index+1}  به عنوان جواب صحیح اطمینان دارید`})
    handleClickOpen();
        
}

const handleClick = (index)=>{
    setState(
        state.map((data , ind)=>{
            return { value:data.value  , answer : index === ind ? true : false}
        })
    )
    handleClose()
}


  return (
    <div>
      <Checkbox 
            checked={data.answer}
            size ='medium'
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onClick={()=>handelselect(index)}
        />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{massege.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              {massege.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            خیر
          </Button>
          <Button onClick={()=>handleClick(index)} color="primary">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
