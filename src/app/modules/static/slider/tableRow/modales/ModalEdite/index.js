import React, { useState, useRef, useEffect } from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Switch, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';



export default function Index({  data, index, apiUpdateSlider, conditionData , disable , loading }) {


    let myRef = useRef();

    const [Obj, SetObj] = useState({
        Title: data.title,
        Link: data.PdfUrl,
        IMAGE_URI: '',
        Priority: data.Priority,
        showSlider: data.showSlider,
        IsNewPage: data.IsNewPage ? data.IsNewPage : false
    })

    const Reducer = useSelector(state => state.slider_select_Reducer)

    const [nameFile, setNameFile] = useState('')

    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;


            let image = input.files[0].type;
            let formatImages = image.split('/')

            if (formatImages[1] === 'png' || formatImages[1] === 'jpg' || formatImages[1] === 'jpeg') {
                // output.src = dataURL;
                SetObj(prev => ({
                    ...prev,
                    IMAGE_URI: dataURL
                }))

                setNameFile(input.files[0].name)

            } else {
                alert('لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg)')
            }

        };

        reader.readAsDataURL(input.files[0]);
    };

    useEffect(() => {
        let _data = {
            Title: data.Title,
            Link: data.Link,
            IMAGE_URI: data.IMAGE_URI,
            Priority: data.Priority,
            showSlider: data.showSlider,
            IsNewPage: data.IsNewPage ? data.IsNewPage : false
        }
        SetObj(_data)
    }, [data])


    const handelChangeValue = (value, type) => {
        SetObj(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelClick = () => {

        let condition = {
            Title: 'عنوان',
            IMAGE_URI: 'عکس',
        }

        let isOk = conditionData(Obj, condition)
        if (isOk) {
            return
        }

        apiUpdateSlider(Obj, index)

    }


    const handelCkekIsActive = (event) => {

        let flag = false
        if (Reducer.data.length) {
            let array = JSON.parse(Reducer.data[0].body.content).content
            array.forEach((element , ind) => {
                if(element.showSlider){
                    if(index === ind){
                        return
                    }
                    flag = true
                }
            });
        }

        if(!flag && !event.target.checked ){
            alert('کاربر گرامی حداقل یک اسلاید باید فعال باشد')
            return
        }

        handelChangeValue(event.target.checked, 'showSlider')
    }

    
    return (
        <>
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>
                <Box width="100%">
                    <TextField
                        value={Obj.Title}
                        id="outlined-basic"
                        label={'عنوان'}
                        variant="outlined" size="large" style={{ width: '100%' }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Title') }}
                    />
                </Box>
                <br />
                <Box width="100%">
                    <TextField
                        value={Obj.Link}
                        id="outlined-basic"
                        label={'لینک'}
                        variant="outlined" size="large" style={{ width: '66.5%', marginLeft: 20 }}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Link') }}
                    />
                    <TextField
                        id="standard-number"
                        label="اولویت نمایش"
                        type="number"
                        variant="outlined"
                        value={Obj.Priority}
                        onChange={(event) => { handelChangeValue(event.target.value, 'Priority') }}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                    <Box width="50%" style={{ textAlign: 'right' }}>
                        <span>
                            <Checkbox
                                checked={Obj.IsNewPage}
                                onChange={(event) => { handelChangeValue(event.target.checked, 'IsNewPage'); }}
                            />
                         لینک خارجی
                        </span>
                        <span>
                            <Switch
                                checked={Obj.showSlider}
                                onChange={(event) => handelCkekIsActive(event)}
                                name="checkedA"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        فعال
                        </span>

                    </Box>
                    <Box style={{ textAlign: 'left' }}>
                        {
                            Obj.IMAGE_URI && (
                                <img src={Obj.IMAGE_URI} alt='gradient' className={Styles.img} />
                            )
                        }
                    </Box>

                </Box>

                <br />
                <div className={Styles['btns']}>
                {
                            loading
                                ? <CircularProgress style={{width:30,height:30,marginLeft:15}} />
                                :      <button className={'btnsGreen'} onClick={() => handelClick()}>ویرایش </button>
                        }
                    <button className={'btnsRed'} onClick={() => { disable(false) }}>انصراف </button>
                </div>
            </div>
        </div>
        </>
    )

}
