import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalAdd from './ModalAdd';
import { Modal } from '@material-ui/core';
;


const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



export default function Index({ conditionData, _id, setflagApi, state }) {

  const dataButtons = [
    { name: 'افزودن اسلایدر', type: '', className: 'btnsBlue' },
  ]

  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }
  }



  return (
    <>

      {
        dataButtons.map((data, index) => {
          return (
            <button key={index} className={data.className} onClick={() => { setNewButton(!newButton) }}>{data.name}</button>
          )
        })
      }

      {
        newButton && (
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
                conditionData={conditionData}
                _id={_id}
                setflagApi={setflagApi}
                state={state}
              />
            </Fade>
          </Modal>
        )
      }

    </>
  )
}
