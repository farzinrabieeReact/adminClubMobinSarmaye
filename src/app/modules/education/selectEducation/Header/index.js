import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import ModalAdd from "./ModalAdd";
import { Modal, Tooltip } from "@material-ui/core";
import ModalCustom from "../../../../common/components/modal";
import AddedSignUp from "./AddedSignUp";
import Excel from "../../../../common/components/Excel";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function Index({
  // handelShowFilterItems,
  // setTypePage,
  // typePage,
  // apiCoursesInsert,
  // Courses_Reducer,
  handleRefresh,
  valueTab,
  // setFilterCoureses,
  FilterCoureses,
  stateFilterPerson,
  handelFlagRefresh
}) {
  const classes = useStyles();
  const [flagCourses, setflagCourses] = useState(false);
  const [flagPerson, setflagPerson] = useState(false);

  const stateReducerExcel = useSelector(state => state.excel_select_reducer);
  const Courses_Reducer = useSelector(
    state => state.education_course_select_Reducer
  );

  const headersCourses = [
    { label: "ردیف", key: "row" },
    { label: "کد", key: "id" },
    { label: "عنوان آموزش", key: "title" },
    { label: "وضعیت", key: "status" },
    { label: "تاریخ شروع دوره  ", key: "dateStart" },
    { label: "روزهای برگزاری", key: "weekDay" },
    { label: "تعداد ساعت", key: "timeValue" },
    { label: "تاریخ پایان دوره", key: "dateEnd" },
    { label: "دسته بندی", key: "category" },
    { label: "ظرفیت مانده", key: "capacity" }
  ];

  const headersRegister = [
    { label: "ردیف", key: "row" },
    { label: "نام ", key: "name" },
    { label: "نام خانوادگی", key: "lastName" },
    { label: "کد ملی", key: "nationId" },
    { label: "نام مسابقه", key: "nameC" },
    { label: "تاریخ ثبت نام", key: "dateStart" },
    { label: "وضعیت ثبت نام", key: "Status" },
    { label: "امتیاز ثبت نام", key: "bounus" },
    { label: "امتیاز لغو", key: "bonusDis" }
  ];

  const handleExcelDataCoures = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        id: info.id,
        title: info.body.Name,
        status: info.body.is_active === "TRUE" ? "غیر فعال" : "فعال",
        dateStart:
          info.body.start_date[0] === "2"
            ? dateMiladiToShamsi(info.body.start_date.split("T"[0]))
            : info.body.start_date,
        weekDay: info.body.holding_days,
        timeValue: info.body.hours,
        dateEnd:
          info.body.end_date[0] === "2"
            ? dateMiladiToShamsi(info.body.start_date.split("T"[0]))
            : info.body.end_date,
        category: info.body.category,
        capacity: info.body.remained_capacity
      };
    });
    return dataExcel;
  };

  const handleExcelDataRegister = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        name: info.body.member_first_name,
        lastName: info.body.member_last_name,
        nationId: info.body.member_national_id,
        nameC: info.body.course_name,
        dateStart: dateMiladiToShamsi(
          info.body.registration_date?.split(" ")[0]
        ),
        Status: info.body.end_date === "CANCELED" ? "لغو شده" : "نهایی شده",
        bounus: info.body.register_bonus_id === "FREE" ? "رایگان" : "نهایی شده",
        bonusDis:
          info.body.unregister_bonus_id === "FREE" ? "رایگان" : "نهایی شده"
      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={Styles["header"]}>

        <Tooltip title={"فزودن دوره های آموزشی"} placement="top-end" arrow>
          <Add
            style={{ marginLeft: "15px", position: "absolute", left: "8%" }}
            onClick={() => setflagCourses(prev => !prev)}
            fontSize="large"
          />
        </Tooltip>
        <div>
          {valueTab === 0 && (
            <>
              <Excel
                headers={headersCourses}
                handleExcelData={handleExcelDataCoures}
                stateFilter={FilterCoureses}
                stateReducerExcel={stateReducerExcel}
                methodType={"select_courses"}
                // methodType2={"select_registrations"}
                tableApi={"course"}
                // valueTab={0}
                filename={"courses_report"}
              />
            </>
          )}
          {valueTab === 1 && (
            <Excel
              headers={headersRegister}
              handleExcelData={handleExcelDataRegister}
              stateFilter={stateFilterPerson}
              stateReducerExcel={stateReducerExcel}
              methodType={"select_registrations"}
              // methodType2={"select_registrations"}
              tableApi={"course"}
              // valueTab={0}
              filename={"course_registrations_report"}
            />
          )}
        </div>
        <div>
          <RefreshIcon
            onClick={handleRefresh}
            className="btnIcon"
            onClick={handelFlagRefresh}
          />
        </div>
      </div>

      {/* //////////////////////COURSES//////////////////////////// */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagCourses}
        onClose={() => setflagCourses(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagCourses}>
          <ModalAdd
            setNewButton={setflagCourses}
            // apiCoursesInsert={apiCoursesInsert}
          />
        </Fade>
      </Modal>
      {/* ///////////////////////////////////////////////// */}

      {/* //////////////////////PERSON//////////////////////////// */}

      <ModalCustom open={flagPerson} setOpen={setflagPerson}>
        <AddedSignUp
          setflagPerson={setflagPerson}
          Courses_Reducer={Courses_Reducer}
        />
      </ModalCustom>
      {/* ///////////////////////////////////////////////// */}
    </>
  );
}
