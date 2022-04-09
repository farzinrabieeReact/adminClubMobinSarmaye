import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SelectBonus from "../../../modules/bonus/select_bonus/index";
import SelectBonusRequests from "../../../modules/bonus/select_bonus_requests/index";
import HeadBonus from "./head/HeadBonus";

const useStyles = makeStyles(theme => ({
  grid: {
    height: "75vh"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "96%",
    borderRadius: 8,
    margin: "15px 0 0 2%",
    display: "inline-block"
  },
  appBar: {
    backgroundColor: "white"
  },
  LinkTab: {
    color: "black"
  }
}));

function TabPanel(props: any): any {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index.js: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props: any) {
  return (
    <Tab
      component="a"
      onClick={(event: any) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
const findType = (key: any) => {
  let addScore = "اضافه شده :  توسط اتوماسیون";
  let removeScore = "کسر شده : توسط اتوماسیون";

  switch (key) {
    case "ADD_SCORE_18":
      return addScore;
    case "ADD_SCORE_19":
      return addScore;
    case "ADD_DAILY_TURNOVER_SCORE":
      return "اضافه شده : تخفیف پله ای ";
    case "ADD_SCORE_7":
      return addScore;
    case "ADD_SCORE_28":
      return addScore;
    case "ADD_SCORE_1":
      return addScore;
    case "REMOVE_SCORE_3":
      return removeScore;
    case "ADD_اضافه شده : مجموع تخفیف پله ای ":
      return "اضافه شده : مجموع تخفیف پله ای";
    case "ADD_ADD_BIRTH_DATE_BONUS":
      return "اضافه شده : هدیه تولد ";
    case "ADD_SCORE_5":
      return addScore;
    case "ADD_INTRODUCER_TURNOVER_SCORE":
      return "اضافه شده : امتیاز معرف بابت گردش افراد معرفی شده";
    case "ADD_SCORE_6":
      return addScore;
    case "ADD_ADD_CONTINUOUS_LOGINS":
      return "اضافه شده : لاگین متوالی";
    case "DDA_CONTINUOUS_LOGINS":
      return "اضافه شده : لاگین متوالی";
    case "REMOVE_SCORE_11":
      return removeScore;
    case "ADD_SCORE_2":
      return addScore;
    case "ADD_SCORE_17":
      return addScore;
    case "REMOVE_GIFT_REGISTER":
      return "کسر شده : درخواست جوایز";
    case "REMOVE_SCORE_26":
      return removeScore;
    case "ADD_SCORE_20":
      return addScore;
    case "ADD_COMPETITION_WINNER":
      return "اضافه شده :  شرکت در مسابقه";
    case "ADD_SCORE_29":
      return addScore;
    case "REMOVE_COMPETITION_PARTICIPATION":
      return "کسر شده : شرکت در مسابقه";
    case "ADD_SCORE_24":
      return addScore;
    case "ADD_SCORE_26":
      return addScore;
    case "ADD_SCORE_10":
      return addScore;
    case "ADD_SCORE_11":
      return addScore;
    case "REMOVE_COMPETITION_CONFLICTS":
      return "کسر شده : اصلاح جایزه مسابقه";
    case "ADD_اضافه شده : تخفیف پله ای روزانه":
      return " اضافه شده :  تخفیف پله ای روزانه";
    case "ADD_SCORE_25":
      return addScore;
    case "ADD_COMPETITION_CONFLICTS":
      return "اضافه شده :  اصلاح جایزه مسابقه";
    case "ADD_BY_ADMIN":
      return "اضافه شده :  توسط ادمین";
    case "ADD_SCORE_13":
      return addScore;
    case "ADD_MONTHILY_FUTURE_TURNOVER_SCORE":
      return "اضافه شده :  امتیازات معاملاتی آتی";
    case "ADD_SCORE_27":
      return addScore;
    case "REMOVE_BY_ADMIN":
      return "کسر شده : توسط ادمین";
    case "ADD_SCORE_12 ":
      return addScore;
    case "ADD_SUM_FUTURE_SCORES":
      return "اضافه شده :  امتیازات معاملاتی آتی";
    case "REMOVE__BY_TMP_WORKER":
      return "کسر شده : اسکریپت";
    case "ADD_SCORE_4":
      return addScore;
    case "REMOVE_COURSE_REGISTER":
      return "کسر شده : ثبت نام در دوره آموزشی";
    case "ADD__BY_TMP_WORKER":
      return "اضافه شده : اسکریپت";
    case "ADD_SCORE_16":
      return addScore;
    case "ADD_COURSE_UNREGISTER":
      return "اضافه شده :  ثبت نام در دوره آموزشی";
    case "ADD_CLUBMEMBER_REGISTRATION":
      return "اضافه شده :  ثبت نام";
    case "REMOVE_BY_ADMIN_RESERVED":
      return "کسر شده :بلاک توسط ادمین  ";
    case "ADD_HADAF_HAFEZ_REGISTRATION":
      return "اضافه شده :هدف حافظ  ";
    case "REMOVE_HADAF_HAFEZ_REGISTRATION":
      return "کسر شده :هدف حافظ  ";
    case "HADAF_HAFEZ_REGISTRATION":
      return "اضافه شده :هدف حافظ  ";
    case "HADAF_HAFEZ_REGISTRATION":
      return "کسر شده :هدف حافظ  ";
    case "ADD_TURNOVER_BONUS_STOCK":
      return "اضافه شده : حجم معامله";
    case "REMOVE_TURNOVER_BONUS_STOCK":
      return "کسر شده : حجم معامله";
    case "TURNOVER_BONUS_STOCK":
      return "اضافه شده : حجم معامله";

    case "ADD_SCORE_15":
      return addScore;
    case "ADD_SCORE_14":
      return addScore;
    case "ADD_SCORE_8":
      return addScore;
    case "ADD_SCORE_9":
      return addScore;
    case "ADD_BIRTH_DATE_BONUS":
      return "اضافه شده : هدیه تولد"
    case "REMOVE_BIRTH_DATE_BONUS":
      return "کسر شده : هدیه تولد"

    default:
      if (key) {
        let Status_Key = key.split("_");
        if (Status_Key[0]) {
          if (Status_Key[0] === "ADD") {
            return `${Status_Key[1] ? Status_Key[1] : ""} اضافه شده :`;
          }
          if (Status_Key[0] === "REMOVE") {
            return `${Status_Key[1] ? Status_Key[1] : ""} کسر شده :`;
          }
        }
      }

      return key;
  }
};
const findStatus = (key: string) => {
  switch (key) {
    case "REJECTED":
      return "لغو شده";
    case "FINALIZED":
      return "نهایی شده";
    case "RESERVED":
      return "رزرو شده";
    default:
      return "نامشخص";
  }
};

export default function Index() {
  const classes: any = useStyles();

  const [valueTab, setValueTab] = React.useState(0);
  const [filterExcel, setFilterExcel] = React.useState({});

  const handleChange = (event: any, newValue: any) => {
    setValueTab(newValue);
  };

  return (
    <div className={classes["grid"]}>
      <HeadBonus
        findType={findType}
        findStatus={findStatus}
        filterExcel={filterExcel}
        valueTab={valueTab}
      />

      <AppBar position="sticky" style={{ zIndex: 0 }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab
            className={classes["LinkTab"]}
            label="امتیازات ثبت شده"
            href="/"
            {...a11yProps(1)}
          />
          <LinkTab
            className={classes["LinkTab"]}
            label="امتیازات زمان بندی شده"
            href="/"
            {...a11yProps(0)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
        <SelectBonus
          findType={findType}
          findStatus={findStatus}
          setFilterExcel={setFilterExcel}
        />
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
        <SelectBonusRequests
          findType={findType}
          findStatus={findStatus}
          setFilterExcel={setFilterExcel}
        />
      </TabPanel>
    </div>
  );
}
