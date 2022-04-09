import { Box, TextField, CircularProgress, MenuItem, } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ModalCustom from "./../../../../common/components/modal";


export default function EditModal({ data, handleSubmitEdit, modalEdit, setmodalEdit, loading }) {

    const [state, setstate] = useState({
        title: "",
        required_bonus: "",
        duration_type: "",
        duration_value: "",
        description: "",
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
                        <Box m={2} width={232}>
                            <TextField
                                label="عنوان"
                                fullWidth
                                variant="outlined"
                                value={state.title}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "title")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                label="امتیاز مورد نیاز"
                                fullWidth
                                variant="outlined"
                                value={state.required_bonus}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "required_bonus")}
                            />
                        </Box>

                        <Box m={2} width={232}>
                            <TextField
                                id="standard-select-competitions"
                                select
                                label={"نوع بسته"}
                                value={state.duration_type}
                                fullWidth
                                variant="outlined"
                                onChange={(event) =>
                                    handleChangeValueInsert(event.target.value, "duration_type")
                                }
                            >
                                <MenuItem value="year">سال</MenuItem>
                                <MenuItem value="month">ماه</MenuItem>
                                <MenuItem value="day">روز</MenuItem>
                            </TextField>
                        </Box>

                        <Box m={2} width={232}>
                            <TextField
                                label="مدت زمان بسته"
                                fullWidth
                                variant="outlined"
                                value={state.duration_value}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "duration_value")}
                            />
                        </Box>
                    </Box>
                    <Box m={2}>
                        <Box>
                            <TextField
                                label="توضیحات"
                                fullWidth
                                variant="outlined"
                                value={state.description}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "description")}
                            />
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
