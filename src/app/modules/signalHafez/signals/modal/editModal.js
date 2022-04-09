import { Box, TextField, Button, InputBase, CircularProgress, MenuItem, makeStyles, } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import ModalCustom from "./../../../../common/components/modal";
import DataPicker from './../../../../common/components/datePicker';

let useStyles = makeStyles({
    root: {
        maxWidth: '100%'
    },
    content: {
        maxWidth: '100%',
        display: "flex",
        flexWrap: 'wrap',
        // justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modal: {
        width: '50%'
    }
})

export default function EditModal({ data, handleSubmitEdit, modalEdit, setmodalEdit, loading }) {

    let myRef = useRef();
    let classes = useStyles()

    const [nameFile, setNameFile] = useState('')

    const [state, setstate] = useState({
        title: "",
        document: "",
        stock_symbol: "",
        type: "",
        insert_date_time: null
    })

    useEffect(() => {
        setstate(data.body)
    }, [data])

    useEffect(() => {
        if (!modalEdit)
            setstate(data.body)
    }, [modalEdit])

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        let res = { ...state, _id: data.id }

        handleSubmitEdit(res)
    }

    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;


            let image = input.files[0].type;
            let formatImages = image.split('/')

            if (formatImages[1] === 'pdf') {
                let document = dataURL.substr(dataURL.indexOf(',') + 1)
                handleChangeValueInsert(document, "document")

                setNameFile(input.files[0].name)

            } else {
                alert('لطفا فرمت مناسبی را انتخاب نمایید (pdf)')
            }

        };

        reader.readAsDataURL(input.files[0]);
    };

    return (
        <>
            <button
                className={`btnsBlue`}
                onClick={() => setmodalEdit(true)}
            >
                ویرایش
            </button>

            <ModalCustom
                open={modalEdit}
                setOpen={setmodalEdit}
                className={classes.modal}
            >
                <Box p={3}>
                    <Box className={classes.content}>
                        <Box m={2} width={232}>
                            <TextField
                                placeholder="نام نماد"
                                fullWidth
                                variant="outlined"
                                value={state.stock_symbol}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "stock_symbol")}
                            />
                        </Box>
                        <Box mr={2}>
                            <TextField
                                placeholder="عنوان"
                                fullWidth
                                variant="outlined"
                                value={state.title}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "title")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                id="standard-select-competitions"
                                select
                                label={"نوع تحلیل"}
                                value={state.type}
                                fullWidth
                                variant="outlined"
                                onChange={(event) =>
                                    handleChangeValueInsert(event.target.value, "type")
                                }
                            >
                                <MenuItem value="Technical">تکنیکال</MenuItem>
                                <MenuItem value="Fundamental">بنیادی</MenuItem>
                                <MenuItem value="Technical-Fundamental">تکنیکال-بنیادی</MenuItem>
                            </TextField>
                        </Box>
                        {/* <Box m={2} width={232}>
                            <TextField
                                id="standard-select-competitions"
                                select
                                label={"وضعیت"}
                                value={state.is_active}
                                fullWidth
                                variant="outlined"
                                onChange={(event) =>
                                    handleChangeValueInsert(event.target.value, "is_active")
                                }
                            >
                                <MenuItem value="TRUE">فعال</MenuItem>
                                <MenuItem value="FALSE">غیرفعال</MenuItem>
                            </TextField>
                        </Box> */}
                        <Box m={2} border="1px solid #c4c4c4" padding="9px" borderRadius="5px">
                            <InputBase
                                defaultValue="مسیر فایل"
                                inputProps={{ 'aria-label': 'naked' }}
                                value={nameFile ? nameFile : 'مسیر فایل'}
                            />
                            <Button variant="contained" onClick={() => myRef.current.click()} >انتخاب</Button >
                            <input type='file' style={{ display: 'none' }} ref={myRef} onChange={(event) => openFile(event)} />

                        </Box>

                        <Box m={2} width={232}>
                            <DataPicker
                                label={'زمان ثبت'}
                                value={
                                    state.insert_date_time
                                        ? state.insert_date_time
                                        : null}
                                setValue={(data) => handleChangeValueInsert(data, 'insert_date_time')}
                            >
                            </DataPicker>
                        </Box>

                    </Box>

                    <Box mt={4} textAlign="end">
                        {
                            loading
                                ? <CircularProgress style={{ width: 30, height: 30, marginLeft: 15 }} />
                                : <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                        }
                        <button className="btnsRed" onClick={() => setmodalEdit(false)}>کنسل</button>
                    </Box>

                </Box>
            </ModalCustom>
        </>
    )
}
