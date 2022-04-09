import React, { useRef, useState } from 'react'
import { Box, TextField, CircularProgress, MenuItem, makeStyles } from '@material-ui/core';

import { TypeLottery } from '../method';

let useStyles = makeStyles({
    root: {
        maxWidth: '100%'
    },
    content: {
        maxWidth: '100%',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function ModalInsertLottery({ setOpen, handleSubmitInsert, loading }) {

    let classes = useStyles()


    const [state, setstate] = useState({
        type: "",
        member_first_name: "",
        member_last_name: "",
        member_national_id: "",
    })

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        let obj = {}
        Object.keys(state).forEach((element) => {
            if (state[element]) {
                obj[element] = state[element];
            }
        });

        if (Object.keys(state).length !== Object.keys(obj).length) {
            alert('لطفا تمام فیلدها را پر نمایید')
            return
        }

        handleSubmitInsert(state)

    }


    return (
        <Box p={3} className={classes.root}>
            <Box className={classes.content}>
                <Box m={2} width={232}>
                    <TextField
                        placeholder="نام"
                        fullWidth
                        variant="outlined"
                        value={state.member_first_name}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "member_first_name")}
                    />
                </Box>
                <Box m={2} width={232}>
                    <TextField
                        placeholder="نام خانوادگی"
                        fullWidth
                        variant="outlined"
                        value={state.member_last_name}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "member_last_name")}
                    />
                </Box>
                <Box m={2} width={232}>
                    <TextField
                        placeholder="کد ملی"
                        fullWidth
                        variant="outlined"
                        value={state.member_national_id}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "member_national_id")}
                    />
                </Box>
                <Box m={2} width={232}>
                    <TextField
                        id="standard-select-competitions"
                        select
                        label={"عنوان قرعه کشی"}
                        value={state.type}
                        fullWidth
                        variant="outlined"
                    // onChange={(event) => handleChangeValueInsert(event.target.value, "type")}
                    >
                        {
                            TypeLottery.map((item, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={item.value}
                                        onClick={() => handleChangeValueInsert(item.value, "type")}
                                    >
                                        {item.title}
                                    </MenuItem>
                                )
                            })
                        }
                    </TextField>
                </Box>
            </Box>

            <Box mt={4} textAlign="end">
                {
                    loading
                        ? <CircularProgress style={{ width: 30, height: 30, marginLeft: 15 }} />
                        : <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                }
                <button className="btnsRed" onClick={() => setOpen(false)}>انصراف</button>
            </Box>

        </Box>
    )
}
