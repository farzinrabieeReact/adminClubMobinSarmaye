import React from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import Buttons from "../../Compatition_select/Compatition/table/Buttons";
// import Excel from "../../../../Common/Components/Excel";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { useSelector } from "react-redux";

export default function Index({
  handelShowFilterItems,
  flagTypePage,
  setflagTypePage,
  apiCompetitionsSelect,
  apiCompetitionsSelectInRange,
  apiParticipationsSelect,
  idCompetitions,
  value,
  stateFilterStatistic,
  stateFilterCompatitions
}) {
  const stateReducerExcel = useSelector(state => state.excel_list_all_reducer);
  const dataButtons =
    flagTypePage === "compatitions"
      ? [
          {
            name: "افزودن مسابقه جدید",
            className: "btnsBlue",
            nameModal: "insertModal"
          }
        ]
      : flagTypePage === "statistics"
      ? [
          {
            name: "اطلاعات تفکیکی",
            className: "btnsBlue",
            changeRoute: "Separation"
          },
          {
            name: "لیست مسابقات",
            className: "btnsBlue",
            changeRoute: "compatitions"
          }
        ]
      : flagTypePage === "Separation"
      ? [
          {
            name: "اطلاعات کلی",
            className: "btnsBlue",
            changeRoute: "statistics"
          },
          {
            name: "لیست مسابقات",
            className: "btnsBlue",
            changeRoute: "compatitions"
          }
        ]
      : [];

  const handelRefresh = type => {
    switch (type) {
      case "compatitions":
        apiCompetitionsSelect({});
        apiCompetitionsSelectInRange({});
        break;
      case "statistics":
        apiParticipationsSelect({
          competition_id: idCompetitions
        });
        break;
      default:
        break;
    }
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام مسابقه ", key: "name" },
    { label: "تاریخ شروع مسابقه", key: "dateStart" },
    { label: "تاریخ پایان مسابقه", key: "dateEnd" },
    { label: "وضعیت", key: "status" },
    { label: "امتیاز شرکت در مسابقه", key: "bonus" },
    { label: "جایزه شرکت در مسابقه", key: "gift" }
  ];

  const handleExcelData = () => {
    let data = null;
    if (value === 0) {
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
        gift: info.body.reward_bonus
      };
    });

    return dataExcel;
  };

  let stateFilter = 0;
  if (value === 0) {
    stateFilter = stateFilterStatistic;
  } else {
    stateFilter = stateFilterCompatitions;
  }

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            // <button key={index.js} className={data.className}>{data.name}</button>
            <Buttons
              key={index}
              info={{
                title: data.name,
                className: data.className,
                modal: data.nameModal ? data.nameModal : data.changeRoute,
                flagTypePage: flagTypePage
              }}
              handleChangeRoute={setflagTypePage}
            />
          );
        })}
        {/* <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateFilter}
          stateReducerExcel={stateReducerExcel}
          methodType={"select_in_range_competitions"}
          methodTypeNationId={null}
          methodType2={"select_competitions"}
          methodTypeNationId2={null}
          tableApi={"competition"}
          valueTab={value}
        /> */}
      </div>
      <div className={Styles["icon"]}>
        {flagTypePage !== "Separation" && (
          <>
            <FilterListIcon
              onClick={() => {
                handelShowFilterItems();
              }}
            />
            <RefreshIcon onClick={() => handelRefresh(flagTypePage)} />
          </>
        )}
      </div>
    </div>
  );
}
