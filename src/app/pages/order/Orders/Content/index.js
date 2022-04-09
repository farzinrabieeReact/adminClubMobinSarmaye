import React, { useState, useEffect } from "react";
import FilterItems from "./FilterItems";
import Header from "./Header";
import Tables from "./Tables/index";
import TablesDetails from "./Tables_details";
import moment from "moment-jalaali";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
// import { convertDigitToEnglish } from "../../../../Common/method/convertDigitToEnglish";

import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grid: {
    height: "75vh"
  },
  root: {
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

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

let flag = false;

export default function Index({
  apiSubmitAggregates,
  apiSubmitDetails,
  stateReducerProfile,
  stateReducerOreder,
  apiSelectProfile,
  stateReducerSummaries,
  pageTab1,
  setPageTab1,
  values,
  setValues,
  setData,
  data,
  handleRefresh,
  apiOrdersSelect,
  sort,
  setSort,
  apiOrdersDetails,
  valueTab,
  setValueTab,
  member_id
}) {
  const [flagFilter, setflagFilter] = useState(false);
  const classes = useStyles();

  // const [data, setData] = useState({
  //   time: "",
  //   report: "",
  //   checkedSales: false,
  //   checkedBuy: false,
  // });
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    let obj = handelData();
    // let member_id = stateReducerProfile?.data[0]?.id;

    if (data.report === "تجمیعی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //
      //   return;
      // }
      let data = {
        ...obj
      };

      if (flag) {
        apiOrdersSelect(pageTab1, data);
      }
    }
    if (data.report === "عمومی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //   return;
      // }
      let data = {
        ...obj
      };

      apiOrdersDetails(pageTab1, data);
    }

    flag = true;
  }, [sort]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    let data = {
      member_id: member_id
    };
    if (valueTab === 0) {
      apiSubmitAggregates(null, data);
    } else {
      apiSubmitDetails(null, data);
    }
  }, [member_id]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let data = {
      member_id: member_id
    };
    if (valueTab === 0) {
      apiSubmitAggregates(null, data);
    } else {
      apiOrdersDetails(null, data);
    }
  }, [valueTab]);

  const handelData = () => {
    if (!stateReducerProfile.data[0]) {
      return null;
    }

    let member_id = stateReducerProfile.data[0].id;
    let trade_type =
      data.checkedSales === data.checkedBuy
        ? null
        : data.checkedBuy
        ? "1"
        : "2";
    let obj = { member_id: member_id };

    if (trade_type) {
      obj["trade_type"] = trade_type;
    }

    if (data.time) {
      let dformat = moment(data.time, "jYYYY/jM/jD HH:mm").format(
        "YYYY-M-D HH:mm:ss"
      );

      let arr = dformat.split(" ");
      let date = arr[0].split("-");
      let time = arr[1].split(":");

      let digit = data => {
        let length = data.length;
        if (length === 1) {
          return "0" + data;
        }
        return data;
      };

      if (date.length !== 3 || time.length !== 3) {
        return false;
      }

      if (data.report === "تجمیعی") {
        let fulldate = `${date[0]}/${digit(date[1])}/${digit(date[2])} ${digit(
          time[0]
        ) +
          ":" +
          digit(time[1]) +
          ":" +
          digit(time[2])}.000000`;
        obj["date_time"] = convertDigitToEnglish(fulldate);
      }

      if (data.report === "عمومی") {
        let fulldate = `${date[0]}${digit(date[1])}${digit(date[2])}`;
        obj["order_entry_date"] = convertDigitToEnglish(fulldate);
      }
    }
    return obj;
  };

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter(prev => !prev)}
        apiSelectProfile={apiSelectProfile}
        stateReducerProfile={stateReducerProfile}
        values={values}
        setValues={setValues}
        handleRefresh={handleRefresh}
      />
      {/* <FilterItems
        flagFilter={flagFilter}
        stateReducerProfile={stateReducerProfile}
        apiSubmitAggregates={apiSubmitAggregates}
        apiSubmitDetails={apiSubmitDetails}
        data={data}
        setData={setData}
        handelData={handelData}
        setPageTab1={setPageTab1}
        pageTab1={pageTab1}
      /> */}

      <AppBar position="sticky" style={{ zIndex: 0 }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab
            className={classes["LinkTab"]}
            label="تجمیعی"
            href="/"
            {...a11yProps(1)}
          />

          <LinkTab
            className={classes["LinkTab"]}
            label="عمومی"
            href="/"
            {...a11yProps(0)}
          />

          {/* <div
              style={{
                color: "white",
                position: "absolute",
                left: 20,
                display: "flex",
                paddingTop: 12,
                cursor: "pointer",
              }}
              onClick={handleBackIconToCompatition}
            >
              <span style={{ fontSize: 10, marginTop: 3 }}>لیست مسابقات</span>
              <ArrowBackIosIcon style={{ fontSize: 20 }} />
            </div> */}
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
        <Tables
          member_id={member_id}
          valueTab={0}
          flagFilter={flagFilter}
          stateReducerOreder={stateReducerOreder}
          stateReducerSummaries={stateReducerSummaries}
          apiSubmitAggregates={apiSubmitAggregates}
          stateReducerProfile={stateReducerProfile}
          apiSubmitDetails={apiSubmitDetails}
          handelData={handelData}
          setPageTab1={setPageTab1}
          pageTab1={pageTab1}
          apiSelectProfile={apiSelectProfile}
          values={values}
          data={data}
          setData={setData}
          sort={sort}
          setSort={setSort}
        />
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
        <TablesDetails
          member_id={member_id}
          valueTab={0}
          flagFilter={flagFilter}
          stateReducerOreder={stateReducerOreder}
          stateReducerSummaries={stateReducerSummaries}
          apiSubmitAggregates={apiSubmitAggregates}
          stateReducerProfile={stateReducerProfile}
          apiSubmitDetails={apiSubmitDetails}
          handelData={handelData}
          setPageTab1={setPageTab1}
          pageTab1={pageTab1}
          apiSelectProfile={apiSelectProfile}
          values={values}
          data={data}
          setData={setData}
          sort={sort}
          setSort={setSort}
        />
      </TabPanel>
    </div>
  );
}
