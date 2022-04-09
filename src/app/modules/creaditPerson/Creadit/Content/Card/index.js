import React  , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModuleEdite from '../ModuleEdite';

import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  root: {
    width: 300,
    height:400,
    // width: 450,
    marginBottom:20,
    // height:'auto',
    margin:10,
    boxShadow:'0 0 11px grey !important',
    borderRadius:5
  },
  title: {
    fontSize: 15,
    textAlign:'center',
    marginBottom:15,
    minHeight:50
  },
  desc :{
      width:'100%',
      height:250,
      margin:'auto',
      fontSize:11,
    //   padding: '0px 25px 0px 0px',
    // backgroundColor:'red' ,
     overflow:'hidden',
  },
  btn:{
      color:'#3699FF',
      fontSize: 18,
      position:'relative',
      top:-10,
      left:10
  }
});

export default function SimpleCard({data , index , handelSubmitUpdate , handelDeleteSubmit}) {

  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }
    return
  }


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}  component="h2">
             {data.Title}
        </Typography>
        <Typography>
            <div className={classes.desc}  dangerouslySetInnerHTML={{__html:data.Content}}></div>
        </Typography>
      </CardContent>

        <Button className={classes.btn} size="large" onClick={()=>setNewButton(!newButton)} >بیشتر </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={newButton}
          onClose={() => handleClickButton("NEW")}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
        }}
    >
        <Fade in={newButton}>      

          <ModuleEdite setNewButton={setNewButton} data={data} index={index} handelSubmitUpdate={handelSubmitUpdate} handelDeleteSubmit={handelDeleteSubmit} />

        </Fade>
      </Modal>
    </Card>
  );
}
