import React from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'


const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor:"rgba(0,0,0,0.5)",
    },
}))


export default function Index({children , indexChild , flagModaAnswerEdit, setflagModaAnswerEdit}) {

    const classes = useStles();


    const handleClickButton = () => {

            setflagModaAnswerEdit(false)
  
    }

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagModaAnswerEdit}
        onClose={() => handleClickButton()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>

        <Fade in={flagModaAnswerEdit}>
            {children[indexChild]}
        </Fade>
    </Modal>
    )
}
