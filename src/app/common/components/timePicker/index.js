import JalaliUtils from "@date-io/jalaali";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import { convertDigitToEnglish } from "../../method/convertDigitToEnglish";

export default function MaterialUIPickers({ label, handleChangeText }) {
  // The first commit of Material-UI

  //   const handleChangeValueInsert = (value, type) => {
  //     setValueInsert(prev => ({
  //         ...prev, [type]: value
  //     }))
  // }

  const [time, settime] = useState(null);
  const [timeValue, settimeValue] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const timechanne = convertDigitToEnglish(time?.format("hh:mm:ss.000000")
  const handleChange = data => {
    const timeFormat = convertDigitToEnglish(data?.format("HH:mm:00.000000"));
    settime(timeFormat);
    settimeValue(data);

    // if(label === "date"){
    //   handleChangeText(timeFormat,"ipo_date")
    // }
    // if(label === "start"){
    //   handleChangeText(timeFormat,"start_date")
    // }
    // if(label === "end"){
    //   handleChangeText(timeFormat,"end_date")
    // }
  };

  // console.log(convertDigitToEnglish(time?.format("hh:mm:ss.000000")))
  useEffect(() => {
    if (time) {
      if (label === "date") {
        handleChangeText(time, "ipo_date");
      }
      if (label === "start") {
        handleChangeText(time, "start_date");
      }
      if (label === "end") {
        handleChangeText(time, "end_date");
      }
    }
  }, [time]);

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label={
            label === "date"
              ? "ساعت عرضه"
              : label === "start"
              ? "ساعت شروع ثبت نام"
              : "ساعت پایان ثبت نام"
          }
          okLabel="تأیید"
          cancelLabel="لغو"
          value={timeValue}
          ampm={false}
          onChange={handleChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

// import React, { useState } from 'react';
// import TimePicker from 'react-time-picker';

// const Category=()=>{
//   const [value, onChange] = useState('10:00');

//   return (
//     <div>
//       <TimePicker
//         onChange={onChange}
//         value={value}
//       />
//     </div>
//   );
// }

// export default Category
