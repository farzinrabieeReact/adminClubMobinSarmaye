import React, { useState, useEffect } from 'react'
import DatePicker from "./../../../../../Common/Components/DatePicker";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-jalaali';
import { convertDigitToEnglish } from "./../../../../../Common/method/convertDigitToEnglish";
import { useDispatch } from 'react-redux'



const useStyles = makeStyles((theme) => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: 'auto',
        marginTop: '-10px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
    },
    buttons: {
        textAlign: "right"
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '35ch',
        [`& fieldset`]: {
            borderRadius: 20,
        },
    },

}))


export default function Index({ flagFilter, handleFilter, national_id }) {

    const classes = useStyles();
    let dispatch = useDispatch()
    const [data, setData] = useState({ time: "" })


    const handleChangeDate = (data, type) => {
        setData(prev => ({ ...prev, [type]: data }))
    }


    useEffect(() => {
        setData({ time: "" })
    }, [flagFilter])


    const handleSubmit = () => {
        if (national_id) {
            handleFilter(data.time ? convertDigitToEnglish(moment(data.time, 'jYYYY/jM/jD HH:mm').format('YYYY/MM/DD')) : "")
        } else {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "لطفا فیلد کد ملی را وارد نمایید", typeAlert: "info" } })

        }
    }

    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>
                            <Box display="flex" >
                                <Box width={150} style={{ margin: "0 50px" }}>
                                    <DatePicker label="تاریخ">
                                        {
                                            data => handleChangeDate(data, "time")
                                        }
                                    </DatePicker>
                                </Box>
                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button
                                        onClick={handleSubmit}
                                        className="btnBlueFilter"
                                    >بازخوانی</button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''
            }
        </>
    )
}

