import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalAdd from './ModalAdd';
import { Modal } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



export default function Index({ handelShowFilterItems , handelSubmitAdd , api_call_select  }) {
  
  const dataButtons = [
    { name: 'افزودن شرایط  ', type: '', className: 'btnsBlue' },
  ]
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }
    return
  }


  return (
    <div className={Styles['header']}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button key={index} className={data.className} onClick={() => { setNewButton(!newButton) }}>{data.name}</button>
            )
          })
        }
      </div>
      <div className={Styles['icon']}>
        {/* <FilterListIcon onClick={() => { handelShowFilterItems() }} /> */}
        <RefreshIcon  onClick = { ()=> api_call_select() } className="btnIcon"/>
      </div>

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
          <ModalAdd 
          setNewButton={setNewButton}
          handelSubmitAdd={handelSubmitAdd} />
        </Fade>
      </Modal>

    </div>
  )
}
