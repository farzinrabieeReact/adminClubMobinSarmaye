import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'

// import ModalE from '../Modal';
import ModalAdd from "../../header/modalAdd";
import AlertDialogSlide from "./../../../../../../common/components/AlertDialogSlide";
import { useDispatch } from 'react-redux';
import {systems_update_action} from './../../../../../../../redux/static/systems/systems_update'
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect, handleNotificationAlertTryUpdate } from '../../../../../../common/method/handleNotificationAlert';

const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
}))

export default function Index({ info, dataPrev, row,api_call_select }) {

    const [newButton, setNewButton] = useState(false);
    const classes = useStles();
    

    const handleOkAlert = () => {
        setNewButton(false)

        let parsDataPrev = JSON.parse(dataPrev[0].body.content)
        let filterData = parsDataPrev.filter(item => item.Url !== row.Url)
        let id = dataPrev[0].id;
        let stringfilterData = JSON.stringify(filterData);
        systems_update_action(stringfilterData, id)
        .then((result) => {
            let isok = handleNotificationAlertTryUpdate(result)
            if(!isok){
                return
            }
            api_call_select()
            
        }).catch((err) => {
            handleNotificationAlertCatch()
        });
    }

    const Components = {
        ModalAdd: <ModalAdd
            setNewButton={setNewButton}
            data={row}
            dataPrev={dataPrev}
            api_call_select={api_call_select}
        />,
        AlertDialogSlide: <AlertDialogSlide
            flagShow={setNewButton}
            handleCloseAlert={setNewButton}
            handleOkAlert={handleOkAlert}
            data={dataAlertDialogSlide}
            
        />
    }

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    return (
        < >
            <button className={info.className} onClick={() => { setNewButton(!newButton) }}>{info.title} </button>
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
        </>
    )
}

const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}