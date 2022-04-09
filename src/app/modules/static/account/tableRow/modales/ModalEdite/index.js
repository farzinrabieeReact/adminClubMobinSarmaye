import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: 600,
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
    },
    root: {
        padding: "20px 0",

        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),

        },
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    },
    gridInputs: {
        width: '100%',
        display: 'flex',
    },
    gridSHaba: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}));

export default function Index({ setNewButton, data, index, handel_Submit_Edite }) {

    const classes = useStyles();

    const [state, setState] = useState({ Group: null, Bank: '', Number: '', Sheba: '' })

    useEffect(() => {
        setState(data)
    }, [data])

    const handelChangeValue = (value, type) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handleSubmit = (data) => {
        if (!state.Group || !state.Bank || !state.Number || !state.Sheba) {
            alert('لطفا مقادیر مورد نظر را وارد نمایید')
            return
        }

        let flag = false;
        if (state.Sheba.length === 24 || state.Sheba.length === 30) {
            flag = true
        }

        if (flag) {
          
            handel_Submit_Edite(data, index)
        } else {
            alert("شماره شبا باید 24 رقم باشد.")
        }

    }
    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>
                {
                    state.Group && (
                        <>
                            <Box className="d-flex">
                                <TextField
                                    label="دسته بندی"
                                    value={state.Group}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    onChange={(event) => handelChangeValue(event.target.value, 'Group')}
                                />
                                <TextField
                                    label="شعبه"
                                    value={state.Branch?state.Branch:null}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    onChange={(event) => handelChangeValue(event.target.value, 'Branch')}
                                />
                            </Box>
                            <Box className={classes.gridInputs}>
                                <Box  className="w-50 mr-2">
                                    <TextField
                                        label="بانک"
                                        value={state.Bank}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        margin="dense"
                                        onChange={(event) => handelChangeValue(event.target.value, 'Bank')}
                                    />
                                </Box>
                                <Box  className="w-50">
                                    <TextField
                                        label="شماره حساب"
                                        value={state.Number}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        margin="dense"
                                        onChange={(event) => handelChangeValue(event.target.value, 'Number')}
                                    />

                                </Box>
                            </Box>
                            <Box className={classes.gridSHaba}>
                                <Box width="88%">
                                    <TextField
                                        label="شماره شبا"
                                        value={state.Sheba}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        margin="dense"
                                        onChange={(event) => handelChangeValue(event.target.value, 'Sheba')}
                                    />
                                </Box>
                                <span> IR</span>
                            </Box>

                        </>
                    )
                }
            </div>

            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={() => handleSubmit(state, index)}>ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
