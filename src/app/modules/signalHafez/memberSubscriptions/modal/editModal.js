import { Box, TextField, Button, InputBase,CircularProgress, } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import ModalCustom from "./../../../../common/components/modal";


export default function EditModal({ data, handleSubmitEdit, modalEdit, setmodalEdit, loading }) {

    let myRef = useRef();

    const [nameFile, setNameFile] = useState('')

    const [state, setstate] = useState({
        title: "",
        document: "",
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

            <ModalCustom open={modalEdit} setOpen={setmodalEdit}>

                <Box p={3}>
                    <Box display="flex">
                        <Box mr={2}>
                            <TextField
                                placeholder="عنوان"
                                fullWidth
                                variant="outlined"
                                value={state.title}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "title")}
                            />
                        </Box>

                        <Box mr={4} border="1px solid #c4c4c4" padding="9px" borderRadius="5px">
                            <InputBase
                                defaultValue="مسیر فایل"
                                inputProps={{ 'aria-label': 'naked' }}
                                value={nameFile ? nameFile : 'مسیر فایل'}
                            />
                            <Button variant="contained" onClick={() => myRef.current.click()} >انتخاب</Button >
                            <input type='file' style={{ display: 'none' }} ref={myRef} onChange={(event) => openFile(event)} />

                        </Box>

                    </Box>

                    <Box mt={4} textAlign="end">
                        {
                            loading
                                ? <CircularProgress style={{width:30,height:30,marginLeft:15}} />
                                : <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                        }
                        <button className="btnsRed" onClick={() => setmodalEdit(false)}>کنسل</button>
                    </Box>

                </Box>
            </ModalCustom>
        </>
    )
}
