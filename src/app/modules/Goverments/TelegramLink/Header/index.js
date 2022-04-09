import React, { useState } from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ModalCustom from "./ModalAdd"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 500,
    borderRadius: 10
  },
  buttonsAdded: {
    marginTop: 15,
    float: 'right'
  }
}));

export default function Index({ dataPrev, handleRefresh }) {
  const [addedCategory, setAddedCategory] = useState(false);
  const classes = useStyles();


  const dataButtons = [
    { name: 'افزودن لینک ', type: '', className: 'btnsBlue' },
  ]

  return (
    <div className={Styles['header']} style={{margin:'0 auto'}}>
      <div className={Styles['button']} >
        {
          dataButtons.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => setAddedCategory(true)}
                className={data.className}>
                افزودن دسته بندی
              </button>
            )
          })
        }
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description11"
          className={classes.modal}
          open={addedCategory}
          onClose={() => setAddedCategory(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addedCategory}>
            <ModalCustom
            handleRefresh={handleRefresh}
              setNewButton={() => setAddedCategory(false)}
              dataPrev={dataPrev}
            />
          </Fade>
        </Modal>
      </div>

      <div className={Styles['icon']}>
        <RefreshIcon
          onClick={handleRefresh}
          className="btnIcon"        />
      </div>

    </div>
  )
}
