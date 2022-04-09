import React, { useEffect, useState , useRef  } from 'react'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import JalaliUtils from "@date-io/jalaali";
import Box from "@material-ui/core/Box";
import DatePickerEdit from "../../../../common/components/datePicker";
import { makeStyles } from '@material-ui/core/styles';
import { convertDigitToEnglish } from '../../../../common/method/convertDigitToEnglish';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    modalEdit: {
        width: 930,
        borderRadius: 8,
        padding: 50,
        backgroundColor: "white",
        maxHeight: 797,
        minWidth: 600,
        overflow: 'auto',
    },
    btns: {
        margin: "90px 0 0 0",
        textAlign: "right",
        width: "95%",
    }
}));


export default function Index({ data, handelSubmitUpdate, setNewButton }) {

    const classes = useStyles();
    const inputRef = useRef(null);

    const [state, setstate] = useState({
        startTime: null,
        startDate: null,
        endTime: null,
        endDate: null
    })

    useEffect(() => {
        setstate(prev => ({
            ...prev,
            startTime: data.body.start_time,
            startDate: data.body.start_time.split(" ")[0],
            endTime: data.body.end_time,
            endDate: data.body.end_time.split(" ")[0]
        }))
    }, [data])


    const handleChangeDate = (value, type) => {
        setstate(prev => ({
            ...prev,
            [type]: value
        }))
    }

    return (
        <div className={classes.modalEdit} >
            <Box pb={.5}>
                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa"  ref={inputRef}>
                    <Box display="flex">
                        <Box width="22%" >
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-competition"
                                label="زمان شروع"
                                value={state.startTime}
                                onChange={(data) => handleChangeDate(`${convertDigitToEnglish(data.format('YYYY/MM/DD HH:mm:ss'))}.000000`, "startTime")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                // format="dd.MM.yyyy"
                                okLabel="تأیید"
                                cancelLabel="لغو"
                                ampm={false}
                                size="small"
                                style={{ marginTop: 0 }}
                            />
                        </Box>

                        <Box width={150} style={{ margin: "0 40px" }} >
                            <DatePickerEdit
                                label="تاریخ شروع "
                                value={state.startDate}
                                setValue={data => handleChangeDate(data, 'startDate')}
                            />

                        </Box>

                        <Box width="22%" >
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-competition1"
                                label="زمان پایان"
                                value={state.endTime}
                                onChange={(data) => handleChangeDate(`${convertDigitToEnglish(data.format('YYYY/MM/DD HH:mm:ss'))}.000000`, "endTime")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                okLabel="تأیید"
                                cancelLabel="لغو"
                                ampm={false}
                                size="small"
                                style={{ marginTop: 0 }}
                            />
                        </Box>

                        <Box width={150} style={{ margin: "0 40px" }} >
                            <DatePickerEdit
                                value={state.endDate} label="تاریخ پایان "
                                setValue={data => handleChangeDate(data, 'endDate')}
                            />
                        </Box>

                    </Box>
                </MuiPickersUtilsProvider>

            </Box>

            <div className={classes['btns']}>
                <Button
                    color={'primary'}
                    variant="contained"
                    className={'m-1'}
                    onClick={() => {
                        handelSubmitUpdate(state)
                    }} >
                  ذخیره
                </Button>
                <Button
                    color={'secondary'}
                    variant="contained"
                    className={'m-1'}
                    onClick={() => {
                        setNewButton(false)
                    }} >
                  انصراف
                </Button>
            </div>
        </div>
    )
}

