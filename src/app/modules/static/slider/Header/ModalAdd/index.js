import React, { useState, useRef } from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../../common/method/handleNotificationAlert';
import { slider_update_action } from '../../../../../../redux/static/slider/slider_update';
import { CircularProgress } from '@material-ui/core';


export default function Index({ setNewButton, conditionData, _id, setflagApi, state }) {

    let myRef = useRef();

    const [Obj, SetObj] = useState({
        title: '',
        PdfUrl: '',
        orderShow: 0,
        Pic: '',
        showSlider: true,
        IsNewPage: false
    })
    const [loading, setloading] = useState(false)

    const [nameFile, setNameFile] = useState('')



    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;

            let image = input.files[0].type;
            let formatImages = image.split('/')
            let sizeImage = input.files[0].size

            if (formatImages[1] !== 'png' && formatImages[1] !== 'jpg' && formatImages[1] !== 'jpeg') {
                // output.src = dataURL;
                alert('لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg , jpg)')
                return
            }

            if (sizeImage > 500000) {
                alert("سایز عکس باید کمتر از 500KB باشد.")
                return
            }

            SetObj(prev => ({
                ...prev,
                Pic: dataURL
            }))

            setNameFile(input.files[0].name)

        };

        reader.readAsDataURL(input.files[0]);
    };


    const handelChangeValue = (value, type) => {
        if (type === "orderShow" && value < 0) {
            return
        }

        SetObj(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const apiInsertSlider = () => {

        let condition = {
            title: 'عنوان',
            Pic: 'عکس',
        }

        let isOk = conditionData(Obj, condition)
        if (isOk) {
            return
        }


        let data = {
            slider_name: "HOME_PAGE",
            content: [
                {
                    Title: Obj.title,
                    Link: Obj.PdfUrl,
                    Priority: Obj.orderShow,
                    IMAGE_URI: Obj.Pic,
                    IsNewPage: Obj.IsNewPage,
                    showSlider: Obj.showSlider,
                },
                ...state.content
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

    return (
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>

                <Box width="100%">
                    <TextField
                        value={Obj.title}
                        id="outlined-basic"
                        label={'عنوان'}
                        variant="outlined" size="large" style={{ width: '100%' }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'title') }}
                    />
                </Box>
                <br />
                <Box width="100%">
                    <TextField
                        value={Obj.PdfUrl}
                        id="outlined-basic"
                        label={'لینک'}
                        variant="outlined" size="large" style={{ width: '67%', marginLeft: '1%' }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'PdfUrl') }}
                    />
                    <TextField
                        id="standard-number"
                        label="اولویت نمایش"
                        type="number"
                        value={Obj.orderShow}
                        onChange={(event) => { handelChangeValue(event.target.value, 'orderShow') }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '32%' }}
                    />
                </Box>
                <br />
                <Box width="100%" className={Styles['grid']} >
                    <Box width="50%">
                        <Box width="72%" className={Styles['card-inputs-file']} >
                            <InputBase
                                defaultValue="مسیر عکس"
                                inputProps={{ 'aria-label': 'naked' }}
                                value={nameFile ? nameFile : 'مسیر عکس'}
                                onChange={() => console.log()}
                            />
                            <Button variant="contained" onClick={() => myRef.current.click()} >انتخاب</Button >
                            <input type='file' style={{ display: 'none' }} ref={myRef} onChange={(event) => openFile(event)} />
                        </Box>
                    </Box>
                    <Box style={{ textAlign: 'left' }}>
                        {
                            Obj.Pic && (
                                <img src={Obj.Pic} alt='gradient' className={Styles.img} />
                            )
                        }
                    </Box>
                    <Box width="100%" style={{ textAlign: 'right' }}>
                        <sapn>
                            <Checkbox
                                checked={Obj.IsNewPage}
                                onChange={(event) => { handelChangeValue(event.target.checked, 'IsNewPage'); }}
                            />
                        لینک خارجی
                        </sapn>
                        <span>
                            <Switch
                                checked={Obj.showSlider}
                                onChange={(event) => handelChangeValue(event.target.checked, 'showSlider')}
                                name="checkedA"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        فعال
                        </span>
                    </Box>

                </Box>
                <span
                    className={Styles.picDetail}
                >عکس آپلودی در اسلایدر صفحه اول بایستی (480*940) پیکسل باشد.</span>

                <br />
                <div className={Styles['btns']}>
                    {
                        loading
                            ? <CircularProgress style={{ width: 30, height: 30, marginLeft: 15 }} />
                            : <button className={'btnsGreen'} onClick={() => apiInsertSlider()}>ذخیره </button>
                    }
                    <button className={'btnsRed'} onClick={() => { setNewButton(false) }}>انصراف </button>
                </div>
            </div>
        </div>
    )

}
