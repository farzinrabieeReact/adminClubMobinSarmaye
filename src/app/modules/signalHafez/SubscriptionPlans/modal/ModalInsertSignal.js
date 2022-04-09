import React, { useState } from 'react'
import { Box, TextField, CircularProgress, MenuItem, makeStyles } from '@material-ui/core'


let useStyles = makeStyles({
    root: {
        maxWidth: '100%'
    },
    content: {
        maxWidth: '100%',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})



export default function ModalInsertSignal({ setOpen, handleSubmitInsert, loading }) {

    let classes = useStyles()

    const [state, setstate] = useState({
        title: "",
        required_bonus: "",
        description: "",
        duration_type:"",
        duration_value:"",
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

          if(Object.keys(state).length !== Object.keys(obj).length){
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
                        placeholder="عنوان"
                        fullWidth
                        variant="outlined"
                        value={state.title}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "title")}
                    />
                </Box>

                <Box m={2} width={232}>
                    <TextField
                        placeholder="امتیاز مورد نیاز"
                        fullWidth
                        variant="outlined"
                        value={state.required_bonus}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "required_bonus")}
                    />
                </Box>

                {/* <Box m={2} width={232}>
                    <TextField
                        placeholder="مدت زمان اشتراک"
                        fullWidth
                        variant="outlined"
                        value={state.duration}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "duration")}
                    />
                </Box> */}

                <Box m={2} width={232}>
                    <TextField
                        placeholder="توضیحات"
                        fullWidth
                        variant="outlined"
                        value={state.description}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "description")}
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
                        placeholder="مدت زمان بسته"
                        fullWidth
                        variant="outlined"
                        value={state.duration_value}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "duration_value")}
                    />
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
