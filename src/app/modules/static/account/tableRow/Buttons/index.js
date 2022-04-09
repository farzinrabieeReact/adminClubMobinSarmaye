import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'
import { useDispatch } from "react-redux";

// import ModalE from '../Modal';
import ModalEdite from "./../modales/ModalEdite";
import AlertDialogSlide from '../../../../../common/components/AlertDialogSlide';
import { account_update_action } from '../../../../../../redux/static/account/account_update';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../../common/method/handleNotificationAlert';
import { actionTypes } from '../../../../../../redux/static/account/account_select/index'


const useStles = makeStyles((them) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
}))

export default function Index({ info, data, index, stateReducer, }) {

    const [newButton, setNewButton] = useState(false);
    const classes = useStles();
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    const handelClick = (type) => {

        if (type === 'حذف') {
            setFlag(true)
        }
        setNewButton(!newButton)
    }

    const handelDelete = (value, index) => {

        let data = JSON.parse(stateReducer.data[0].body.content);
        let id = stateReducer.data[0].id;
        let res = data.filter((items, ind) => index !== ind)


        let result = {
            name: "accounts",
            content: JSON.stringify(res),
            _id: id

        }

        account_update_action(result)
            .then((result) => {
                let isok = handleNotificationAlertTryUpdate(result)
                if (!isok) {
                    return
                }

                dispatch({ type: actionTypes.accountSelectAsync, payload: {} });

                setFlag(false)

            }).catch((err) => {
                handleNotificationAlertCatch()
            });


    }

    const handel_Submit_Edite = (value, index) => {

        let data = JSON.parse(stateReducer.data[0].body.content);
        let id = stateReducer.data[0].id
        let res = data.map((items, ind) => {
            if (ind === index) {
                return value
            }
            return items
        })

        let result = {
            name: "accounts",
            content: JSON.stringify(res),
            _id: id

        }

        account_update_action(result)
            .then((result) => {
                let isok = handleNotificationAlertTryUpdate(result)
                if (!isok) {
                    return
                }

                dispatch({ type: actionTypes.accountSelectAsync, payload: {} });

                setNewButton(false)

            }).catch((err) => {
                handleNotificationAlertCatch()
            });

    }



    const Components = {
        ModalEdite: <ModalEdite
            setNewButton={setNewButton}
            data={data}
            index={index}
            handel_Submit_Edite={handel_Submit_Edite} />,

    }



    return (
        < >
            <button className={info.className} onClick={() => { handelClick(info.title) }}>{info.title} </button>
            {
                info.modal && (
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
                        }}>

                        <Fade in={newButton}>
                            {Components[info.modal]}
                        </Fade>

                    </Modal>

                )
            }
            {
                flag && (
                    <AlertDialogSlide
                        flagShow={setNewButton}
                        handleCloseAlert={() => setFlag(false)}
                        handleOkAlert={() => handelDelete(data, index, info.title)}
                        data={dataAlertDialogSlide}
                    />
                )
            }
        </>
    )
}


const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}