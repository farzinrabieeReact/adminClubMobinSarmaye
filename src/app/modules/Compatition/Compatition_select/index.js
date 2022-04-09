import React, { useState, useEffect } from "react";
import Header from "./Statistics/Header";

import FilterCompatitions from "./Compatition/FilterItem";
import FilterStatistics from "./Statistics/FilterItem";
import { useSelector, useDispatch } from "react-redux";

import Compatitions from "../../../modules/Compatition/Compatition_select/Compatition";
import Statistics from "../../../modules/Compatition/Compatition_select/Statistics/index";
import Separation from "./Separation";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// import {
//   PARTICIPATIONS_V1_EMPTY,
//   PARTICIPATIONS_ById_V1_EMPTY,
//   COMPETITIONS_PROFILE_V1_EMPTY,
// } from "../../../../boot/api/typeActions";
import { actionTypes as actionTypeCompatitionSelect } from "../../../../redux/Compatition/compatition_select";
// import { competitions_v1_actions_select_in_range } from "../../../../boot/api/Definitions/Compatitions/competitions_v1_select_in_range/action";
import { actionTypes as actionTypeCompatitionSelectInRange } from "../../../../redux/Compatition/compatition_select_in_range";
// import { performance_v1_actions_select_by_id } from "../../../../boot/api/Definitions/Compatitions/performance_v1_select_by_id/action";
import { actionTypes as actionTypePerformanceById } from "../../../../redux/Compatition/performance_select_by_id";

// import { participations_v1_actions_select } from "../../../../boot/api/Definitions/Compatitions/participations_v1_select/action";
import { actionTypes as actionTypeCompatitionParticipations } from "../../../../redux/Compatition/compatition_select_participations";

import { actionTypes as actionTypeCompatitionProfileSelect } from "../../../../redux/Compatition/compatition_profile_select";
// import { competitions_profile_v1_action_select } from "../../../../boot/api/Definitions/Compatitions/person_v1_select/action";
// import { participate_v1_actions_insert } from "../../../../boot/api/Definitions/Compatitions/participate_v1_insert/action";
// import { participate_v1_actions_update } from "../../../../boot/api/Definitions/Compatitions/participation_v1_update/action";
import { participate_v1_actions_update } from "../../../../redux/Compatition/partcipate_update";
// import { competition_v1_actions_deactivate } from "../../../../boot/api/Definitions/Compatitions/competitions_v1_deactive/action";

// import { competition_v1_actions_activate } from "../../../../boot/api/Definitions/Compatitions/compatition_v1_active/action";
import { participate_v1_actions_insert } from "../../../../redux/Compatition/participate_insert";
import { competition_v1_actions_deactivate } from "../../../../redux/Compatition/compatition_deactivate";
import { competition_v1_actions_activate } from "../../../../redux/Compatition/compatition_activate";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { ContactSupportOutlined } from "@material-ui/icons";
import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";

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
  },
  fieldset: {
    border: "0 !important",
    width: "100%",
    height: "45px",
    borderRadius: "5px",
    "& legend": {
      color: "grey",
      fontSize: "12px"
    },
    h4: {
      textAlign: "center",
      marginLeft: "12px",
      fontSize: "17px"
    }
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

export default function Index() {
  const [FilterCompatition, setFilterCompatitions] = useState(false);
  const [FilterStatistic, setFilterStatistics] = useState(false);
  const [stateFilterCompatitions, setStateFilterCompatitions] = useState({});
  const [stateFilterStatistic, setStateFilterStatistic] = useState({});

  const [flagTypePage, setflagTypePage] = useState("compatitions");
  const [idCompetitions, setIdCompetitions] = useState(null);
  const [value, setValue] = React.useState(0);
  const [infoCompatition, setinfoCompatition] = useState({});
  // console.log("infoCompatition",infoCompatition);

  const classes = useStyles();

  const [valueTab, setValueTab] = React.useState(0);
  const [flagRefrsh, setflagRefrsh] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openFilter = () => {
    if (flagTypePage === "compatitions")
      setFilterCompatitions(!FilterCompatition);

    if (flagTypePage === "statistics") setFilterStatistics(!FilterStatistic);
  };

  //////////////////////////////////// compatitions select //////////////////////////////////////

  const dispatch = useDispatch();
  const reducerCompetitionsSelect = useSelector(
    state => state.compatition_select_reducer
  );

  useEffect(() => {
    apiCompetitionsSelect({});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCompetitionsSelect = data => {
    dispatch({
      type: actionTypeCompatitionSelect.compatitionSelectActiveAsync,
      payload: data
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// compatitions select in range  //////////////////////////////////////
  const reducerCompetitionsSelectInRange = useSelector(
    state => state.compatition_select_in_range_reducer
  );

  useEffect(() => {
    apiCompetitionsSelectInRange({});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const apiCompetitionsSelectInRange = data => {
    dispatch({
      type:
        actionTypeCompatitionSelectInRange.compatitionSelectActiveInRangeAsync,
      payload: data
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// statistics select   //////////////////////////////////////
  const reducerParticipations = useSelector(
    state => state.compatition_select_participation_reducer
  );

  const apiParticipationsSelect = data => {
    dispatch({
      type:
        actionTypeCompatitionParticipations.compatitionSelectparticipationsAsync,
      payload: data
    });
  };

  const apiParticipationsEmpty = () => {
    dispatch({
      type:
        actionTypeCompatitionParticipations.compatitionSelectParticipationsEmpty
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// Separation select   //////////////////////////////////////
  const reducerPerformanceById = useSelector(
    state => state.performance_select_by_id_reducer
  );

  const apisperformanceSelectById = data => {
    dispatch({
      type: actionTypePerformanceById.performanceSelectByIdAsync,
      payload: data
    });
  };

  const apiParticipationsByIdEmpty = () => {
    dispatch({ type: actionTypePerformanceById.performanceSelectByIdEmpty });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// participate insert   //////////////////////////////////////
  const reducerProfile = useSelector(
    state => state.competitions_profile_reducer
  );

  const apiselectProfile = national_id => {
    dispatch({
      type: actionTypeCompatitionProfileSelect.competitionsProfileSelectAsync,
      payload: national_id
    });
  };

  const apiselectProfileEmpty = () => {
    dispatch({
      type: actionTypeCompatitionProfileSelect.competitionsProfileSelectEmpty
    });
  };

  const apiParticipateInsert = data => {
    // dispatch(participate_v1_actions_insert(data))
    //   .then((res) => {
    //     let isOk = handleNotificationAlertTryUpdate(res);
    //   })
    //   .catch((err) => {
    //     handleNotificationAlertCatch();
    //   });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// participate update   /////////////////////////////////////////////

  const apiParticipateUpdate = data => {
    // dispatch(participate_v1_actions_update(data))
    //   .then((res) => {
    //     let isOk = handleNotificationAlertTryUpdate(res);
    //   })
    //   .catch((err) => {
    //     handleNotificationAlertCatch();
    //   });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// competition deactivate   /////////////////////////////////////////////

  const apiCompetitionDeactivate = data => {
    // dispatch(competition_v1_actions_deactivate(data))
    //   .then((res) => {
    //     let isOk = handleNotificationAlertTryUpdate(res);
    //   })
    //   .catch((err) => {
    //     handleNotificationAlertCatch();
    //   });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// competition activate   /////////////////////////////////////////////

  const apiCompetitionActivate = data => {
    // dispatch(competition_v1_actions_activate(data))
    //   .then((res) => {
    //     let isOk = handleNotificationAlertTryUpdate(res);
    //   })
    //   .catch((err) => {
    //     handleNotificationAlertCatch();
    //   });
  };

  const handleBackIconToCompatition = () => {
    setflagTypePage("compatitions");
    setValueTab(0);
  };

  const handelRefresh = () => {
    // setSort({});
    // setStateTable({});
    // setPagnation({ number: 1, count: 0 });
    // setflagApi((prev) => !prev);
    setflagRefrsh(prev => !prev);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // {console.log("valueTab",valueTab)}
  return (
    <div>
      {flagTypePage === "compatitions" && (
        <>
          <Header
            handelRefresh={handelRefresh}
            reducerParticipations={reducerParticipations}
            flagTypePage={flagTypePage}
            valueTab={valueTab}
            stateFilterCompatitions={stateFilterCompatitions}
            value={value}
          />
          <Compatitions
            setStateFilterCompatitions={setStateFilterCompatitions}
            flagRefrsh={flagRefrsh}
            setValueTab={setValueTab}
            valueTab={valueTab}
            idCompetitions={idCompetitions}
            flagFilter={FilterCompatition}
            setflagTypePage={setflagTypePage}
            flagTypePage={flagTypePage}
            setIdCompetitions={setIdCompetitions}
            reducerCompetitionsSelect={reducerCompetitionsSelect}
            reducerCompetitionsSelectInRange={reducerCompetitionsSelectInRange}
            apiselectProfile={apiselectProfile}
            reducerProfile={reducerProfile}
            apiselectProfileEmpty={apiselectProfileEmpty}
            apiParticipateInsert={apiParticipateInsert}
            apiParticipationsEmpty={apiParticipationsEmpty}
            apiParticipationsSelect={apiParticipationsSelect}
            reducerParticipations={reducerParticipations}
            apiParticipateUpdate={apiParticipateUpdate}
            apiCompetitionDeactivate={apiCompetitionDeactivate}
            apiCompetitionActivate={apiCompetitionActivate}
          />
        </>
      )}

      {flagTypePage === "statistics" && (
        <>
          <Header
            handelRefresh={handelRefresh}
            reducerParticipations={reducerParticipations}
            flagTypePage={flagTypePage}
            valueTab={valueTab}
            stateFilterStatistic={stateFilterStatistic}
            value={value}
            idCompetitions={idCompetitions}
            infoCompatition={infoCompatition}
          />
          <div className={classes["grid"]}>
            <AppBar position="sticky" style={{ zIndex: 0 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs"
                className={classes.appBar}
              >
                <LinkTab
                  className={classes["LinkTab"]}
                  label="اطلاعات کلی"
                  href="/"
                  {...a11yProps(1)}
                />
                {reducerParticipations.data.length && (
                  <LinkTab
                    className={classes["LinkTab"]}
                    label="اطلاعات تفکیکی"
                    href="/"
                    {...a11yProps(0)}
                  />
                )}
                <div
                  style={{
                    color: "black",
                    position: "absolute",
                    left: 30,
                    display: "flex",
                    paddingTop: 12,
                    cursor: "pointer"
                  }}
                  onClick={handleBackIconToCompatition}
                >
                  <span
                    style={{ fontSize: 10, marginTop: 3, marginLeft: "-5px" }}
                  >
                    لیست مسابقات
                  </span>
                  <ArrowBackIosIcon style={{ fontSize: 20 }} />
                </div>
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <Statistics
                setStateFilterStatistic={setStateFilterStatistic}
                flagRefrsh={flagRefrsh}
                flagFilter={FilterStatistic}
                idCompetitions={idCompetitions}
                apiParticipationsEmpty={apiParticipationsEmpty}
                apiParticipationsSelect={apiParticipationsSelect}
                reducerParticipations={reducerParticipations}
              />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Separation
                setStateFilterStatistic={setStateFilterStatistic}
                flagRefrsh={flagRefrsh}
                infoCompatition={infoCompatition}
                setinfoCompatition={setinfoCompatition}
                idCompetitions={idCompetitions}
                reducerPerformanceById={reducerPerformanceById}
                apisperformanceSelectById={apisperformanceSelectById}
                apiParticipationsByIdEmpty={apiParticipationsByIdEmpty}
                apiParticipationsSelect={apiParticipationsSelect}
                apiParticipationsEmpty={apiParticipationsEmpty}
                reducerParticipations={reducerParticipations}
              />
            </TabPanel>
          </div>
        </>
      )}
    </div>
  );
}
