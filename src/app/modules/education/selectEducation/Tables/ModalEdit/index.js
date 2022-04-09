import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import DatePickerEdit from "./../../../../../common/components/datePickerWithError";
import { course_activation } from "../../../../../../redux/education/education_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";

const useStyles = makeStyles(theme => ({
  ModalAdd: {
    width: 930,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto"
  },
  root: {
    padding: "0px 0",
    display: "flex",
    flexWrap: "wrap",
    width: "85%",
    margin: "auto",
    "& .MuiBox-root": {
      margin: "2px 1%"
    }
  },
  btns: {
    margin: "10px 0 10px 0",
    textAlign: "right",
    width: "95%"
  }
}));

export default function Index({
  setNewButton,
  data,
  apiCoursesUpdate,
  setflagApi
}) {
  const classes = useStyles();
  const [state, setstate] = useState({
    // Name : '',
    // is_active : 'TRUE',
    // holding_days : '',
    // start_date : '',
    // end_date : '',
    // registration_start_date:'',
    // registration_end_date:'',
    // holding_time : '',
    // category:'',
    // hours:null,
    // teacher_name:'',
    // explanations:'',
    // external_links:'',
    // cost:null,
    // required_bonus:null,
    // min_participants:null,
    // max_participants:null,
    // location:'',
    // remained_capacity: null,
  });
  console.log("stateeeeducation", state);

  useEffect(() => {
    let chngeDate = "";
    // if (data.body.start_date[0] === "2") {
    //   chngeDate = dateMiladiToShamsi(data.body.start_date.split("T")[0]);
    //
    //   data.body.start_date = chngeDate;
    // }
    // if (data.body.end_date[0] === "2") {
    //   chngeDate = dateMiladiToShamsi(data.body.end_date.split("T")[0]);
    //
    //   data.body.end_date = chngeDate;
    // }
    setstate(data.body);
  }, [data]);

  const handelCHnage = (data, type) => {
    let value = data;
    setstate(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handelSubmit = () => {
    if (state.start_date?.includes("undefined")) {
      state.start_date = "";
    }
    if (state.end_date?.includes("undefined")) {
      state.end_date = "";
    }
    if (state.registration_start_date?.includes("undefined")) {
      state.registration_start_date = "";
    }
    if (state.registration_end_date?.includes("undefined")) {
      state.registration_end_date = "";
    }

    const { remained_capacity, is_active, ...rest } = state;

    let obj = {
      _id: data.id,
      ...rest
    };

    course_activation(obj)
      .then(result => {
        let isOk = handleNotificationAlertTryUpdate(result);

        if (!isOk) {
          return;
        }
        setTimeout(() => {
          setflagApi(prev => !prev);
        }, 1000);
      })
      .catch(err => {
        handleNotificationAlertCatch();
      });
    setNewButton(false);
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box width="100%">
          <TextField
            value={state.Name}
            label="عنوان دوره آموزشی"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "Name")}
            required
            error={
              state.Name !== "" && state.Name !== " " && state.Name !== "  "
                ? false
                : true
            }
            helperText={
              state.Name !== "" && state.Name !== " " && state.Name !== "  "
                ? null
                : " پر کردن این فیلد اجباری است"
            }
          />
        </Box>

        <Box width="100%">
          <TextField
            value={state.holding_days}
            label="روزهای برگزاری"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "holding_days")}
          />
        </Box>

        <Box width="23%">
          <TextField
            value={state.start_date}
            label="تاریخ شروع کلاس"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            required
            error={
              state.start_date !== "" &&
              state.start_date !== " " &&
              state.start_date !== "  " &&
              state.start_date !== null &&
              !state.start_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.start_date !== "" &&
              state.start_date !== " " &&
              state.start_date !== "  " &&
              state.start_date !== null &&
              !state.start_date?.includes("undefined")
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            fullWidth
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "start_date")}
          />
          {/*<DatePickerEdit*/}
          {/*  label="تاریخ شروع کلاس"*/}
          {/*  value={*/}
          {/*    state.start_date?.includes("undefined") ? null : state.start_date*/}
          {/*  }*/}
          {/*  required*/}
          {/*  error={*/}
          {/*    state.start_date !== "" &&*/}
          {/*    state.start_date !== " " &&*/}
          {/*    state.start_date !== "  " &&*/}
          {/*    state.start_date !== null &&*/}
          {/*    !state.start_date?.includes("undefined")*/}
          {/*      ? false*/}
          {/*      : true*/}
          {/*  }*/}
          {/*  helperText={*/}
          {/*    state.start_date !== "" &&*/}
          {/*    state.start_date !== " " &&*/}
          {/*    state.start_date !== "  " &&*/}
          {/*    state.start_date !== null &&*/}
          {/*    !state.start_date?.includes("undefined")*/}
          {/*      ? null*/}
          {/*      : " پر کردن این فیلد اجباری است"*/}
          {/*  }*/}
          {/*  setValue={data =>*/}
          {/*    // handelCHnage(*/}
          {/*    //   `${convertDigitToEnglish(*/}
          {/*    //     data?.format("YYYY/MM/DD")*/}
          {/*    //   )} 00:00:00.000000`,*/}
          {/*    //   "start_date"*/}
          {/*    // )*/}
          {/*    handelCHnage(*/}
          {/*      `${convertDigitToEnglish(*/}
          {/*        data?.format("YYYY/MM/DD")*/}
          {/*      )} 00:00:00.000000`,*/}
          {/*      "start_date"*/}
          {/*    )*/}
          {/*  }*/}
          {/*>*/}
          {/*  /!* {(data) => handelCHnage(`${data}`, "start_date")} *!/*/}
          {/*</DatePickerEdit>*/}
        </Box>

        <Box width="23%">
          {/*<DatePickerEdit*/}
          {/*  label="تاریخ پایان کلاس"*/}
          {/*  required*/}
          {/*  error={*/}
          {/*    state.end_date !== "" &&*/}
          {/*    state.end_date !== " " &&*/}
          {/*    state.end_date !== "  " &&*/}
          {/*    state.end_date !== null &&*/}
          {/*    !state.end_date?.includes("undefined")*/}
          {/*      ? false*/}
          {/*      : true*/}
          {/*  }*/}
          {/*  helperText={*/}
          {/*    state.end_date !== "" &&*/}
          {/*    state.end_date !== " " &&*/}
          {/*    state.end_date !== "  " &&*/}
          {/*    state.end_date !== null &&*/}
          {/*    !state.end_date?.includes("undefined")*/}
          {/*      ? null*/}
          {/*      : " پر کردن این فیلد اجباری است"*/}
          {/*  }*/}
          {/*  value={*/}
          {/*    state.end_date?.includes("undefined") ? null : state.end_date*/}
          {/*  }*/}
          {/*  setValue={data =>*/}
          {/*    handelCHnage(*/}
          {/*      `${convertDigitToEnglish(*/}
          {/*        data?.format("YYYY/MM/DD")*/}
          {/*      )} 00:00:00.000000`,*/}
          {/*      "end_date"*/}
          {/*    )*/}
          {/*  }*/}
          {/*></DatePickerEdit>*/}
          <TextField
            value={state.end_date}
            label="تاریخ پایان کلاس"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.end_date !== "" &&
              state.end_date !== " " &&
              state.end_date !== "  " &&
              state.end_date !== null &&
              !state.end_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.end_date !== "" &&
              state.end_date !== " " &&
              state.end_date !== "  " &&
              state.end_date !== null &&
              !state.end_date?.includes("undefined")
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event => handelCHnage(event.target.value, "end_date")}
          />
        </Box>

        <Box width="23%">
          {/*  */}
          <DatePickerEdit
            label="تاریخ شروع ثبت نام"
            required
            error={
              state.registration_start_date !== "" &&
              state.registration_start_date !== " " &&
              state.registration_start_date !== "  " &&
              state.registration_start_date !== null &&
              !state.registration_start_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.registration_start_date !== "" &&
              state.registration_start_date !== " " &&
              state.registration_start_date !== "  " &&
              state.registration_start_date !== null &&
              !state.registration_start_date?.includes("undefined")
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            value={
              state.registration_start_date?.includes("undefined")
                ? null
                : state.registration_start_date
            }
            setValue={data =>
              handelCHnage(
                `${convertDigitToEnglish(
                  data?.format("YYYY/MM/DD")
                )} 00:00:00.000000`,
                "registration_start_date"
              )
            }
          ></DatePickerEdit>
        </Box>

        <Box width="23%">
          <DatePickerEdit
            label="تاریخ پایان ثبت نام"
            required
            error={
              state.registration_end_date !== "" &&
              state.registration_end_date !== " " &&
              state.registration_end_date !== "  " &&
              state.registration_end_date !== null &&
              !state.registration_end_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.registration_end_date !== "" &&
              state.registration_end_date !== " " &&
              state.registration_end_date !== "  " &&
              state.registration_end_date !== null &&
              !state.registration_end_date?.includes("undefined")
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            value={
              state.registration_end_date?.includes("undefined")
                ? null
                : state.registration_end_date
            }
            setValue={data =>
              handelCHnage(
                `${convertDigitToEnglish(
                  data?.format("YYYY/MM/DD")
                )} 23:59:59.000000`,
                "registration_end_date"
              )
            }
          ></DatePickerEdit>
        </Box>

        <Box width="48%">
          <TextField
            value={state.holding_time}
            label="ساعات برگزاری"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.holding_time !== "" &&
              state.holding_time !== " " &&
              state.holding_time !== "  "
                ? false
                : true
            }
            helperText={
              state.holding_time !== "" &&
              state.holding_time !== " " &&
              state.holding_time !== "  "
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event => handelCHnage(event.target.value, "holding_time")}
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.category}
            label="دسته بندی"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            // disabled
            margin="dense"
            required
            error={
              state.category !== "" &&
              state.category !== " " &&
              state.category !== "  "
                ? false
                : true
            }
            helperText={
              state.category !== "" &&
              state.category !== " " &&
              state.category !== "  "
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event => handelCHnage(event.target.value, "category")}
          />
        </Box>
        <Box width="31%">
          <TextField
            value={state.hours}
            label="تعداد ساعت"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            margin="dense"
            error={
              state.hours !== "" &&
              state.hours !== " " &&
              state.hours !== 0 &&
              state.hours !== null
                ? false
                : true
            }
            helperText={
              state.hours !== "" &&
              state.hours !== " " &&
              state.hours !== 0 &&
              state.hours !== null
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "hours")
            }
          />
        </Box>

        <Box width="65%">
          <TextField
            value={state.teacher_name}
            label="نام مدرس"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.teacher_name !== "" &&
              state.teacher_name !== " " &&
              state.teacher_name !== "  "
                ? false
                : true
            }
            helperText={
              state.teacher_name !== "" &&
              state.teacher_name !== " " &&
              state.teacher_name !== "  "
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event => handelCHnage(event.target.value, "teacher_name")}
          />
        </Box>

        <Box
          width="98%"
          height={120}
          // style={{ backgroundColor: 'gray' }}
        >
          <TextareaAutosize
            // rowsMax={4}
            value={state.explanations}
            aria-label="maximum height"
            placeholder="توضیحات"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 10
            }}
            onChange={event => handelCHnage(event.target.value, "explanations")}
            // defaultValue="آدرس"
          />
        </Box>

        <Box width="98%">
          <TextField
            value={state.external_links}
            label="لینک های خارجی"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event =>
              handelCHnage(event.target.value, "external_links")
            }
            helperText="در صورت وارد کردن چند لینک، لینک ها را با کاما( , ) از هم جدا کنید"
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.cost}
            label="هزینه دوره"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            onChange={event => handelCHnage(Number(event.target.value), "cost")}
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.required_bonus}
            label="امتیاز لازم برای شرکت در دوره"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            required
            error={
              state.required_bonus !== "" &&
              state.required_bonus !== " " &&
              state.required_bonus !== null
                ? false
                : true
            }
            helperText={
              state.required_bonus !== "" &&
              state.required_bonus !== " " &&
              state.required_bonus !== null
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "required_bonus")
            }
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.min_participants}
            label="حدااقل شرکت کنندگان"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            onChange={event =>
              handelCHnage(Number(event.target.value), "min_participants")
            }
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.max_participants}
            label="حدااکثر شرکت کنندگان"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            required
            error={
              state.max_participants !== "" &&
              state.max_participants !== " " &&
              state.max_participants !== 0 &&
              state.max_participants !== null
                ? false
                : true
            }
            helperText={
              state.max_participants !== "" &&
              state.max_participants !== " " &&
              state.max_participants !== 0 &&
              state.max_participants !== null
                ? null
                : " پر کردن این فیلد اجباری است"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "max_participants")
            }
          />
        </Box>

        <Box
          width="98%"
          height={120}
          // style={{ backgroundColor: 'gray' }}
        >
          <TextareaAutosize
            // rowsMax={4}
            value={state.location}
            aria-label="maximum height"
            placeholder="مکان"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 10
            }}
            onChange={event => handelCHnage(event.target.value, "location")}

            // defaultValue="آدرس"
          />
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsGreen"} onClick={() => handelSubmit()}>
          ذخیره{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>
    </div>
  );
}
