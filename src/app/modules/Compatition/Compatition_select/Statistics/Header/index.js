import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Refresh } from "@material-ui/icons";
import Excel from "../../../../../common/components/Excel";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../../common/method/date";

const useStyles = makeStyles(() => ({
  head: {
    width: "100%",
    height: 40,
    maxHeight: 50,
    margin: "10px auto 10px auto",
    display: "flex",
    justifyContent: "space-between",
  },
  headJustRefrsh: {
    width: "100%",
    height: 30,
    maxHeight: 40,
    margin: "20px auto 10px auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  fieldset: {
    border: "0 !important",
    width: "100%",
    height: "45px",
    borderRadius: "5px",
    "& legend": {
      color: "grey",
      fontSize: "12px",
    },
    h4: {
      textAlign: "center",
      marginLeft: "12px",
      fontSize: "17px",
    },
  },
}));

const Index = ({
  reducerParticipations,
  flagTypePage,
  stateFilterStatistic,
  valueTab,
  stateFilterCompatitions,
  value,
  idCompetitions,
  infoCompatition,
  handelRefresh,
}) => {
  const classes = useStyles();

  const stateReducerExcel = useSelector((state) => state.excel_select_reducer);

  // __________________________handleFilterExcel____________________________

  // if (value === 0) {
  //   stateFilterStatistic = {
  //     ...stateFilterStatistic,
  //     competition_id: idCompetitions,
  //   };
  // } else {
  //   stateFilterStatistic = {
  //     ...stateFilterStatistic,
  //     ...infoCompatition?.data,
  //   };
  // }

  if (value === 0) {
    stateFilterStatistic = {
      ...stateFilterStatistic,
      competition_id: idCompetitions,
    };
  } else {
    stateFilterStatistic = {
      ...stateFilterStatistic,
      ...infoCompatition?.data,
    };
  }

  // -------------------------------Excelstatistics---------------------------

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام و نام خانوادگی", key: "name" },
    { label: "کد ملی", key: "nationID" },
    { label: "نام مسابقه", key: "bonusName" },
    { label: "گزینه انتخابی", key: "choice" },
    { label: "تاریخ ثبت", key: "date" },
    { label: "جواب صحیح", key: "true" },
    { label: "جایزه", key: "bonus" },
  ];

  const handleExcelData = () => {
    let data = [];
    if (value === 0) {
      data = stateReducerExcel.data;
    } else {
      data = stateReducerExcel.data2;
    }
    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        name: `${info.body.member_first_name} ${info.body.member_last_name}`,
        nationID: info.body.member_national_id,
        bonusName: info.body.competition_title,
        choice: info.body.choice_number,
        date: dateMiladiToShamsi(info.body.participation_date.split(" ")[0]),
        true:
          info.body.is_correct === "null" ? "در انتظار" : info.body.is_correct,
        bonus:
          info.body.participation_bonus_id === "null"
            ? "در انتظار"
            : info.body.participation_bonus_id === "FREE"
            ? "رایگان"
            : "نهایی شد",
      };
    });

    return dataExcel;
  };

  // -------------------------------Excelcompatitions---------------------------

  const headers2 = [
    { label: "ردیف", key: "row" },
    { label: "نام مسابقه ", key: "name" },
    { label: "تاریخ شروع مسابقه", key: "dateStart" },
    { label: "تاریخ پایان مسابقه", key: "dateEnd" },
    { label: "وضعیت", key: "status" },
    { label: "امتیاز شرکت در مسابقه", key: "bonus" },
    { label: "جایزه شرکت در مسابقه", key: "gift" },
  ];

  const handleExcelData2 = () => {
    let data = null;
    if (valueTab === 0) {
      data = stateReducerExcel.data;
    } else {
      data = stateReducerExcel.data2;
    }
    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        name: info.body.competition_title,
        dateStart: dateMiladiToShamsi(info.body.start_date?.split(" ")[0]),
        dateEnd: dateMiladiToShamsi(
          info.body.participation_deadline.split(" ")[0]
        ),
        status: info.body.is_active === "TRUE" ? "فعال" : "غیر فعال",
        bonus: info.body.required_bonus,
        gift: info.body.reward_bonus,
      };
    });

    return dataExcel;
  };

  return (
    <>
      <div
        className={
          flagTypePage === "statistics" ? classes.head : classes.headJustRefrsh
        }
      >
        {flagTypePage === "statistics" && (
          <fieldset className={classes.fieldset}>
            <legend>{"تعداد کل شرکت کنندگان :"}</legend>
            {reducerParticipations.data.length !== 0 && (
              <>
                {reducerParticipations.total && (
                  <div>
                    <div
                      style={{
                        marginRight: "30px",
                        fontSize: "17px",
                      }}
                    >
                      {reducerParticipations.total}
                    </div>
                  </div>
                )}
              </>
            )}
          </fieldset>
        )}
        <span style={{ display: "flex", alignItems: "center" }}>
          {flagTypePage === "statistics" && (
            <Excel
              headers={headers}
              handleExcelData={handleExcelData}
              stateFilter={stateFilterStatistic}
              methodType={"select_participations"}
              methodType2={"select_participations"}
              // methodType={"select_in_range_competitions"}
              tableApi={"competition"}
              valueTab={value}
              filename={"registered_ipos_report"}
            />
          )}
          {flagTypePage === "compatitions" && (
            <Excel
              headers={headers2}awd
              handleExcelData={handleExcelData2}
              stateFilter={stateFilterCompatitions}
              methodType={"select_competitions"}
              methodType2={"select_in_range_competitions"}
              tableApi={"competition"}
              valueTab={valueTab}
              filename={"registered_ipos_report"}
            />
          )}
          <Refresh className="btnIcon" onClick={handelRefresh} />
        </span>
      </div>
    </>
  );
};

export default Index;
