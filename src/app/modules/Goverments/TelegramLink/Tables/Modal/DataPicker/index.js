import React  , {useState}from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import Styles from './index.module.scss';

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Index() {
    
 const [selectedDateStart, handleDateStartChange] = useState(moment());
 const [selectedDateEnd, handleDateEndChange] = useState(moment());

    return (
        <div className={Styles['dataPicker']}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    <KeyboardDatePicker
                        clearable
                        label="از تاریخ"
                        okLabel="تایید"
                        cancelLabel="لغو"
                        clearLabel="پاک کردن"
                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        value={selectedDateStart}
                        style={{ width: 140 }}
                        onChange={handleDateStartChange}
                        size="small"

                    />
                    <KeyboardDatePicker
                        clearable
                        label="تا تاریخ"
                        okLabel="تایید"
                        cancelLabel="لغو"
                        clearLabel="پاک کردن"
                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        value={selectedDateEnd}
                        style={{ width: 140}}
                        onChange={handleDateEndChange}
                        size="small"
                    />
    </MuiPickersUtilsProvider>
            
        </div>
    )
}
