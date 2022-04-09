import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, LinearProgress, TextField } from "@material-ui/core";
import DatePicker from "../../../../common/components/datePicker";
import AlertDialogSlide from "../../../../common/components/AlertDialogSlide";
import { makeStyles } from "@material-ui/styles";
import { dateConverttShamsiToMiladi } from "../../../../common/method/date";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";

let useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,1)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "10px"
    // paddingBottom: 10
  },
  textFildes: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default function Index({
  value,
  setValue,
  setFlagApiCalculate,
  setflagApi,
  apiSubmit
}) {
  let classes = useStyles();
  let dispatch = useDispatch();

  const [falg, setfalg] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (data, type) => {
    setValue(prev => ({ ...prev, [type]: data }));
  };

  const submit = () => {
    apiSubmit();
    // setFlagApiCalculate(prev => !prev);
    // setflagApi(prev => !prev);
  };

  const apiSubmitInsert = () => {
    setfalg(false);

    if (!value.member_national_id) {
      alert("شناسه کاربر رو وارد کنید");
      return;
    }

    let _data = {
      start_date: value.start_date,
      finish_date: value.finish_date,
      national_id: value.national_id
    };

    setloading(true);

    // bonus_caclculate_connfilict_insert(_data)
    //     .then((res) => {
    //         handleAlertAndSelectApi(res.data, null, dispatch)
    //         setloading(false)
    //         if (res.data.response.error_code) {
    //             return
    //         }
    //         setTimeout(() => {
    //             setflagApi(prev => !prev)
    //         }, 1500);
    //     })
    //     .catch(() => {
    //         setloading(false)
    //         handleNoAnswarApi(dispatch)
    //     })
  };

  return (
    <>
      {loading && <LinearProgress />}
      <div className={classes["root"]}>
        <div className={classes["textFildes"]}>
          <Box width={200} m={3}>
            {/*<DatePicker label="از تاریخ">*/}
            {/*  {data =>*/}
            {/*    handleChange(*/}
            {/*      data*/}
            {/*        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`*/}
            {/*        : null,*/}
            {/*      "conflict_from_date"*/}
            {/*    )*/}
            {/*  }*/}
            {/*</DatePicker>*/}
            <DatePicker
              label="از تاریخ"
              value={value.start_date}
              setValue={data =>
                handleChange(
                  data
                    ? `${convertDigitToEnglish(data.format("YYYY/MM/DD"))}`
                    : null,
                  "start_date"
                )
              }
            />
          </Box>
          <Box width={200} m={3}>
            <DatePicker
              label="تا تاریخ"
              value={value.finish_date}
              setValue={data =>
                handleChange(
                  data
                    ? `${convertDigitToEnglish(data.format("YYYY/MM/DD"))}`
                    : null,
                  "finish_date"
                )
              }
            />
          </Box>
          <Box width={230} style={{ margin: "0 50px 0 0" }}>
            <TextField
              value={value.national_id}
              onChange={e => handleChange(e.target.value, "national_id")}
              label="کدملی"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
        </div>
        <div>
          <button className="btnsGreen" onClick={() => submit()}>
            {" "}
            گزارش
          </button>
          <button className={"btnsBlue"} onClick={() => setfalg(prev => !prev)}>
            {" "}
            ثبت
          </button>
        </div>
      </div>

      {falg && (
        <AlertDialogSlide
          flagShow={falg}
          handleCloseAlert={setfalg}
          handleOkAlert={apiSubmitInsert}
          data={dataAlert}
        />
      )}
    </>
  );
}

const dataAlert = {
  title: "",
  description: "آیا مطمئن می باشید؟"
};
