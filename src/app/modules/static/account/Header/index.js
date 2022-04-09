import React, { useState } from 'react'

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalAdd from './ModalAdd';
import { Modal } from '@material-ui/core';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../common/method/handleNotificationAlert';
import { actionTypes } from '../../../../../redux/static/account/account_select/index'
import { account_update_action } from '../../../../../redux/static/account/account_update';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



export default function Index({ stateReducer , setPagnation }) {

  const dispatch = useDispatch();
  const dataButtons = [
    { name: 'افزودن شماره حساب', type: '', className: 'btnsBlue' },
  ]

  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton(prev => !prev)
    }

    return
  }

  const handel_Submit_Insert = (value) => {


    let data = JSON.parse(stateReducer.data[0].body.content);
    let id = stateReducer.data[0].id


    let result = {
      name: "accounts",
      content: JSON.stringify([value ,...data ]),
      _id: id

    }

    account_update_action(result)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result)
        if (!isok) {
          return
        }

        dispatch({ type: actionTypes.accountSelectAsync, payload: {} });
        setPagnation({ number: 1, count: 0 })
        setNewButton(false)

      }).catch((err) => {
        handleNotificationAlertCatch()
      });


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
              <ModalAdd setNewButton={setNewButton} handel_Submit_Insert={handel_Submit_Insert} />
            </Fade>
          </Modal>
        )
      }

    </>
  )
}
