import React from 'react';
import { TextField, Box, MenuItem } from '@material-ui/core';
import DatePickerEdit from "../../../../../common/components/datePicker";
import { dateMiladi } from "../../../../../common/method/date";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import JalaliUtils from "@date-io/jalaali";


export default function Step1({ valueInsert, handleChangeValueInsert, classes }) {
    return (
        <div>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Box display="flex">
                    <Box width="50%" className={classes[0]}>
                        <TextField
                            id="input-insert-comptions"
                            label="نام مسابقه"
                            value={valueInsert.competition_title}
                            onChange={(event) => {
                                handleChangeValueInsert(event.target.value, "competition_title")
                            }}
                            helperText="نام مسابقه را وارد کنید"
                            variant="outlined"
                            fullWidth
                        >
                        </TextField>
                    </Box>

                    <Box width="25%" className={classes[0]}>
                        <TextField
                            id="input-insert-point1"
                            label="امتیاز لازم"
                            value={valueInsert.required_bonus}
                            onChange={(event) => handleChangeValueInsert(event.target.value, "required_bonus")}
                            helperText="امتیاز لازم برای شرکت در مسابقه را وارد کنید"
                            variant="outlined"
                            type="number"
                            fullWidth
                        >
                        </TextField>
                    </Box>

                    <Box width="22%" className={classes[0]}>
                        <TextField
                            id="input-insert-comptions"
                            label="امتیاز برنده شدن"
                            value={valueInsert.reward_bonus}
                            onChange={(event) => handleChangeValueInsert(event.target.value, "reward_bonus")}
                            helperText="امتیاز برنده شدن در مسابقه را وارد کنید"
                            variant="outlined"
                            type="number"
                            fullWidth
                        >
                        </TextField>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box width="22%" className={classes[0]}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-competition"
                            label="زمان شروع"
                            value={valueInsert.time_start}
                            onChange={(data) => {
                                handleChangeValueInsert(data, "time_start")}}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            okLabel="تأیید"
                            cancelLabel="لغو"
                            ampm={false}
                            size="small"
                            style={{marginTop : 0}}
                        />
                    </Box>

                    <Box width="22%" className={classes[0]}>
                        <DatePickerEdit label="تاریخ شروع" value={dateMiladi(valueInsert.start_date)} >
                            {data => handleChangeValueInsert(data, "start_date")}
                        </DatePickerEdit>
                    </Box>

                    <Box width="22%" className={classes[0]}>
                        <DatePickerEdit label="تاریخ پایان" value={dateMiladi(valueInsert.participation_deadline)}>
                            {data => handleChangeValueInsert(data, "participation_deadline")}
                        </DatePickerEdit>
                    </Box>

                    <Box width="24%" className={classes[0]}>
                        <TextField
                            // value={state.is_active}
                            id="standard-select-competitions"
                            select
                            label={"امکان تغییر پاسخ"}
                            value={valueInsert.updatable}
                            size="small"
                            fullWidth
                            variant="outlined"
                            // margin="dense"
                            helperText="امکان تغییر پاسخ وجود دارد؟"
                            onChange={(event) => handleChangeValueInsert(event.target.value, 'updatable')}
                        >
                            <MenuItem value="TRUE">دارد</MenuItem>
                            <MenuItem value="FALSE">ندارد</MenuItem>
                        </TextField>
                    </Box>
                </Box>
            </MuiPickersUtilsProvider>
        </div>
    )
}
