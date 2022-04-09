import React, { useState, useEffect } from "react";
// import Header from "./Header";
import FilterCourses from "./FilterCourses";
import TableCourses from "./Tables/TableCourses.tsx";
// import FilterPerson from "./FilterPerson";
import TablePerson from "./Tables/tablePerson.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import Header from "./Header";

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
export default function Index() {
  const [valueTab, setValueTab] = React.useState(0);
  const [open, setopen] = useState({
    flag: false,
    ind: "",
    id: ""
  });
  const [flagRefresh, setflagRefresh] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  ////////////////////////////////////data filter person//////////////////////
  const [stateFilterPerson, setStateFilterPerson] = useState({});
  const [FilterCoureses, setFilterCoureses] = useState({});

  const checkDataFilter = () => {
    let dataExistFilter = {};

    Object.keys(stateFilterPerson)
      .filter(item => stateFilterPerson[item])
      .forEach(item => {
        dataExistFilter[item] = stateFilterPerson[item];
      });

    return dataExistFilter;
  };

  useEffect(() => {
    if (valueTab === 0) {
      setopen({
        flag: false,
        ind: "",
        id: ""
      });
    }
  }, [valueTab]);

  //////////////////////////////api call registration more////////////////////
  const handleClickMore = () => {
    let dataExistFilter = checkDataFilter();

    if (Object.keys(dataExistFilter).length) {
      // dispatch(
      //   registeration_v1_select_actions(
      //     dataExistFilter,
      //     reducerRegistration.from + 20
      //   )
      // );
      return;
    }
  };

  //////////////////////////////api call registration////////////////////

  const apiCallSelectRegistration = () => {
    let obj = checkDataFilter();
  };

  useEffect(() => {
    apiCallSelectRegistration();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  /////////////////////////////////////COURSES///////////////////////////////////////////////////////////

  const [courses, setCourses] = useState([]);

  const Courses_Reducer = useSelector(state => state.Courses_v1_select_Reducer);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    apiCoursesSelect();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Courses_Reducer?.data?.length !== 0) {
      setCourses(Courses_Reducer?.data?.response.data.results);
    }
  }, [Courses_Reducer?.data]); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCoursesSelect = ref => {
    let obj = {};

    Object.keys(FilterCoureses).forEach(element => {
      if (FilterCoureses[element]) {
        obj[element] = FilterCoureses[element];
      }
    });

    // let { size } = Courses_Reducer;
    // let { id, ...sortRes } = sort;
    if (ref) {
      // Courses_v1_actions_select(null, size, paginationRegistration, null);
    } else {
      // dispatch(
      //   Courses_v1_actions_select(sortRes, size, paginationRegistration, obj)
      // );
    }
  };

  const apiCoursesInsert = data => {
    // dispatch(Courses_v1_actions_INSERT(data));
  };

  const apiCoursesUpdate = (data, id) => {
    const { remained_capacity, is_active, ...rest } = data;

    let obj = {
      _id: id,
      ...rest
    };
    // dispatch(Courses_v1_actions_update(obj));
  };

  const apiCoursesActive = data => {
    let obj = {
      _id: data
    };
    // dispatch(Courses_v1_actions_active(obj));
  };

  const apiCoursesDeactive = data => {
    let obj = {
      _id: data
    };
    // dispatch(Courses_v1_actions_deactive(obj));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const handelFlagRefresh = () => {
    setflagRefresh(prev => !prev);
  };

  return (
    <div>
      <Header
        Courses_Reducer={Courses_Reducer}
        handelFlagRefresh={handelFlagRefresh}
        valueTab={valueTab}
        FilterCoureses={FilterCoureses}
        stateFilterPerson={stateFilterPerson}
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
            label="لیست دروه ها"
            href="/"
            {...a11yProps(1)}
          />
          <LinkTab
            className={classes["LinkTab"]}
            label="لیست ثبت نام ها"
            href="/"
            {...a11yProps(0)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
        <>
          <TableCourses
            flagRefresh={flagRefresh}
            valueTab={valueTab}
            setValueTab={setValueTab}
            open={open}
            setopen={setopen}
            setFilterCoureses={setFilterCoureses}
          />
        </>
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
        <>
          <TablePerson
            flagRefresh={flagRefresh}
            valueTab={valueTab}
            open={open}
            setStateFilterPerson={setStateFilterPerson}
            setopen={setopen}
          />
        </>
      </TabPanel>
    </div>
  );
}
