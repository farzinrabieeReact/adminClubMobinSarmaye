import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.1)',

    },
    // paper: {
    //     // border: '2px solid #000',
    //     boxShadow: theme.shadows[5],
    //     // padding: theme.spacing(2, 4, 5),
    //     borderRadius : 5
    // },
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
                }}
            >
                <Fade in={open}>
                    {/* <div className={classes.paper}> */}
                        {children}
                    {/* </div> */}
                </Fade>
            </Modal>
        </div>
    );
}
