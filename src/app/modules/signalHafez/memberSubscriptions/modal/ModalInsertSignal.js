import React, { useRef, useState } from 'react'
import { Box, Button, InputBase, TextField } from '@material-ui/core';

export default function ModalInsertSignal({ setOpen, handleSubmitInsert }) {
    let myRef = useRef();
    const [state, setstate] = useState({
        title: "",
        document: "",
    })
    const [nameFile , setNameFile] = useState('')


    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;


            let image = input.files[0].type;
            let formatImages = image.split('/')

            if (formatImages[1] === 'pdf') {
                // output.src = dataURL;
                // SetObj(prev => ({
                //     ...prev,
                //     Pic: dataURL
                // }))
                handleChangeValueInsert(dataURL, "document")

                setNameFile(input.files[0].name)

            } else {
                alert('لطفا فرمت مناسبی را انتخاب نمایید (pdf)')
            }

        };

        reader.readAsDataURL(input.files[0]);
    };

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        if(!state.title){
            alert("وارد کردن عنوان الزامی است")
            return
        }
        if(!state.document){
            alert("اضافه کردن فایل الزامی است")
            return
        }
        handleSubmitInsert(state)
        setOpen(false)
    }


    return (
        <Box p={3}>
            <Box display="flex">
                <Box mr={4}>
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
                <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                <button className="btnsRed" onClick={() => setOpen(false)}>انصراف</button>
            </Box>

        </Box>
    )
}
