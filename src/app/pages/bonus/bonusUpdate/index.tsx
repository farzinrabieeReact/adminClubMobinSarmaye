import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import InserBonus from "../../../modules/bonus/insert_bonus/index";
import RemoveBonus from "../../../modules/bonus/remove_bonus/index";
import ReserveBonus from "../../../modules/bonus/reserve_bonus/index";
import { TextField } from "@material-ui/core";
import Styles from "../../../common/components/SearchNationalCode/index.module.scss";
import SerachNationalCode from "../../../common/components/SearchNationalCode/index";
import { remove_bonus_dispatch } from "../../../../redux/bonus/remove_bonus";
import { select_clubmember_nationalId } from "../../../../redux/bonus/select_clubmember_nationalId";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";

const useStyles = makeStyles(theme => ({
  grid: {
    width: "100%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  root: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 8,
    margin: "15px 0 0 2%",
    display: "fle"
  },
  AppBar: {
    width: "100%"
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

export default function Index() {
  const classes: any = useStyles();

  const [valueTab, setValueTab] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [memberId, setMemberId] = React.useState<any>(false);
  const [name, setName] = React.useState<any>({
    name: "",
    lastName: ""
  });
  const [nationalId, setNationalId] = React.useState<any>(false);

  const handleChange = (event: any, newValue: any) => {
    setValueTab(newValue);
  };
  const apiSubmit = (data: any) => {
    select_clubmember_nationalId(data)
      .then((res: any) => {
        setMemberId(res.data.response.data.results[0]?.id);
        setNationalId(value);
        setName((prevState: any) => ({
          ...prevState,
          name: res.data.response.data.results[0].body.first_name,
          lastName: res.data.response.data.results[0].body.last_name
        }));
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };
  const handelBackClick = () => {
    setNationalId(false);
    setMemberId(false);
    setValue("");
  };

  return (
    <div className={classes["grid"]}>
      {memberId && nationalId ? (
        <>
          <Box width={"50%"}>
            <div className="d-flex justify-content-between  w-100 ">
              <p className="h4 shadow p-3 rounded border bg-white ">{` نام و نام خانوادگی :   ${name.name} ${name.lastName}`}</p>
              <button onClick={handelBackClick} className="btnsRed ">
                بازگشت
              </button>
            </div>

            <AppBar
              position="sticky"
              className={classes["AppBar"]}
              style={{ zIndex: 0 }}
            >
              <Tabs
                value={valueTab}
                onChange={handleChange}
                aria-label="wrapped label tabs"
                className={classes.appBar}
              >
                <LinkTab
                  className={classes["LinkTab"]}
                  label="کسر امتیاز"
                  href="/"
                  {...a11yProps(0)}
                />
                <LinkTab
                  className={classes["LinkTab"]}
                  label="افزودن امتیاز"
                  href="/"
                  {...a11yProps(1)}
                />
                <LinkTab
                  className={classes["LinkTab"]}
                  label="رزرو امتیاز"
                  href="/"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>

            <TabPanel value={valueTab} index={0}>
              <RemoveBonus value={value} memberId={memberId} />
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              <InserBonus value={value} memberId={memberId} />
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
              <ReserveBonus value={value} memberId={memberId} />
            </TabPanel>
          </Box>
        </>
      ) : (
        <Box className={classes["root"]}>
          <SerachNationalCode
            value={value}
            setValue={setValue}
            apiSubmit={apiSubmit}
          />
        </Box>
      )}
    </div>
  );
}
