import React, { useState, useEffect } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, CircularProgress, Switch } from '@material-ui/core'
import ModalEdite from "./../modales/ModalEdite";
import AlertDialogSlide from '../../../../../common/components/AlertDialogSlide';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../../common/method/handleNotificationAlert';
import ModalImage from './../modales/ModalImage';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { slider_update_action } from '../../../../../../redux/static/slider/slider_update';
import { useSelector } from 'react-redux';


const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
    iconAttechment: {
        cursor: 'pointer'
    }
}))

export default function Index({ info, data, index, stateReducer, state, setflagApi, _id, conditionData }) {


    const classes = useStles();


    const [loading, setloading] = useState(false);
    const [newButton, setNewButton] = useState(false);
    const [flagSwitch, setflagSwitch] = useState(false)

    const Reducer = useSelector(state => state.slider_select_Reducer)

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    const handelClick = (type) => {

        setNewButton(!newButton)
    }


    const apiUpdateSlider = (obj, index) => {

        let isOk = conditionData(obj)
        if (isOk) {
            return
        }

        let data = {
            slider_name: "HOME_PAGE",
            content: [
                ...state.content.map((item, ind) => {
                    if (index === ind) {
                        return {
                            Title: obj.Title,
                            Link: obj.Link,
                            Priority: obj.Priority,
                            IMAGE_URI: obj.IMAGE_URI,
                            IsNewPage: obj.IsNewPage,
                            showSlider: obj.showSlider,
                        }
                    }
                    return item
                })
            ]
        }

        setloading(true)

        slider_update_action(JSON.stringify(data), _id)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);

                if (!isOk) {
                    return;
                }
                setflagApi(prev => !prev)
                setNewButton(false)
            })
            .catch(err => {
                handleNotificationAlertCatch();
            })
            .finally(() => {
                setloading(false)
            })


    }

    const handelSubmitDelete = (index) => {
        let deleteDate = state.content.filter((item, ind) => ind !== index)
        let data = {
            slider_name: "HOME_PAGE",
            content: deleteDate
        }

        setloading(true)

        slider_update_action(JSON.stringify(data), _id)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);
                if (!isOk) {
                    return;
                }
                setflagApi(prev => !prev)
                setNewButton(!newButton)
            })
            .catch(err => {
                handleNotificationAlertCatch();
            })
            .finally(() => {
                setloading(false)
            })

    }

    const handleOkAlert = () => {

        if (loading) {
            alert('لطفا منتظر درخواست قیلی خود بمانید')
            return
        }
        let flag = false
        let array = [];

        if (stateReducer.data.length) {
            array = JSON.parse(stateReducer.data[0].body.content).content
            array.forEach((element, ind) => {
                if (element.showSlider) {
                    if (index === ind) {
                        return
                    }
                    flag = true
                }
            });
        }

        if (!flag && array[index].showSlider) {
            alert('کاربر گرامی حداقل یک اسلاید باید فعال باشد')
            return
        }

        handelSubmitDelete(index)

    }

    const handelCkekIsActive = (event) => {
        let flag = false
        if (Reducer.data.length) {
            let array = JSON.parse(Reducer.data[0].body.content).content
            array.forEach((element, ind) => {
                if (element.showSlider) {
                    if (index === ind) {
                        return
                    }
                    flag = true
                }
            });
        }

        if (!flag && flagSwitch) {
            alert('کاربر گرامی حداقل یک اسلاید باید فعال باشد')
            return
        }

        apiUpdateSlider({ ...data, showSlider: !flagSwitch }, index)

    }

    useEffect(() => {
        if (data.showSlider != undefined && info.modal === 'StatusSlider')
            setflagSwitch(data.showSlider)
    }, [data])


    const Components = {
        ModalEdite: <ModalEdite
            index={index}
            disable={() => setNewButton(!newButton)}
            apiUpdateSlider={apiUpdateSlider}
            data={data} conditionData={conditionData}
            loading={loading}
        />,
        ModalImage: <ModalImage setNewButton={setNewButton} data={data} />,
        File: <AttachmentIcon onClick={() => { setNewButton(!newButton) }} className={classes['iconAttechment']} />,
        AlertDialogSlide: <AlertDialogSlide
            flagShow={setNewButton}
            handleCloseAlert={setNewButton}
            handleOkAlert={handleOkAlert}
            data={
                {
                    title: "حذف",
                    description:
                        loading
                            ? <CircularProgress style={{ width: 15, height: 15, marginLeft: 15 }} />
                            : "از حذف این رکورد اطمینان دارید؟",

                }
            }
        />,
        StatusSlider:
            <>
                {
                    info.modal === 'StatusSlider' && (
                        <AlertDialogSlide
                            flagShow={setNewButton}
                            handleCloseAlert={setNewButton}
                            handleOkAlert={handelCkekIsActive}
                            data={
                                {
                                    title: "ویرایش نمایش اسلایدر",
                                    description:
                                        loading
                                            ? <CircularProgress style={{ width: 15, height: 15, marginLeft: 15 }} />
                                            : "آیا از  ویرایش این رکورد اطمینان دارید؟",

                                }
                            }
                        />
                    )
                }
            </>
    }

    return (
        < >

            {
                info.modal === 'StatusSlider' && (
                    <span>
                        <Switch
                            checked={flagSwitch}
                            onChange={(event) => setNewButton(true)}
                            name="checkedA"
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        {
                            data.showSlider ? "فعال" : "غیر فعال"
                        }
                    </span>
                )
            }
            {
                info.modal === 'ModalImage' && (
                    <AttachmentIcon onClick={() => { setNewButton(!newButton) }} className={classes['iconAttechment']} />
                )
            }
            {
                (info.modal !== 'ModalImage' && info.modal !== 'StatusSlider') && (
                    <button className={info.className} onClick={() => { handelClick(info.title) }}>{info.title} </button>
                )
            }
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


