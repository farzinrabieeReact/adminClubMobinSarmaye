import React from 'react'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import JalaliUtils from "@date-io/jalaali";
import Box from "@material-ui/core/Box";
import DatePickerEdit from "../../../../../common/components/datePicker";


export default function Index({ date, handleChangeDate }) {
    return (
        <Box pb={.5}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Box display="flex">
                    <Box width="22%" >
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-competition1"
                            label="زمان شروع"
                            value={date.startTime}
                            onChange={(data) => handleChangeDate(data, "startTime")}
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
                            value={date.startDate}
                            label="تاریخ شروع "
                            setValue={data => handleChangeDate(data, 'startDate')}
                        />
                    </Box>

                    <Box width="22%" >
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-competition"
                            label="زمان پایان"
                            value={date.endTime}
                            onChange={(data) => handleChangeDate(data, "endTime")}
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
                            label="تاریخ پایان "
                            value={date.endDate}
                            setValue={data => handleChangeDate(data, 'endDate')}
                        />
                    </Box>

                </Box>
            </MuiPickersUtilsProvider>

        </Box>
    )
}
