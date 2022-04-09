import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SelectInRangeCompatition from "./table/selectInRangeCompatition";
import SelectCompatition from "./table/selectCompatittion";
// import SelectBonus from '../../../modules/bonus/select_bonus/index.js';
// import SelectBonusRequests from '../../../modules/bonus/select_bonus_requests/index.js';

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

export default function Index({
  flagFilter,
  setflagTypePage,
  flagTypePage,
  reducerCompetitionsSelect,
  reducerCompetitionsSelectInRange,
  setIdCompetitions,
  apiselectProfile,
  reducerProfile,
  apiselectProfileEmpty,
  apiParticipateInsert,
  idCompetitions,
  apiParticipationsEmpty,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipateUpdate,
  apiCompetitionDeactivate,
  apiCompetitionActivate,
  valueTab,
  setValueTab,
  flagRefrsh,
  setStateFilterCompatitions
}: any) {
  const classes: any = useStyles();

  const handleChange = (event: any, newValue: any) => {
    setValueTab(newValue);
  };

  return (
    <div className={classes["grid"]}>
      <AppBar position="sticky" style={{ zIndex: 0 }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab
            className={classes["LinkTab"]}
            label="کلی"
            href="/"
            {...a11yProps(0)}
          />
          <LinkTab
            className={classes["LinkTab"]}
            label="در حال برگزاری"
            href="/"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
        <SelectCompatition
          setStateFilterCompatitions={setStateFilterCompatitions}
          flagRefrsh={flagRefrsh}
          key={2}
          flagFilter={flagFilter}
          flagTypePage={flagTypePage}
          idCompetitions={idCompetitions}
          setflagTypePage={setflagTypePage}
          data={reducerCompetitionsSelectInRange.data}
          setIdCompetitions={setIdCompetitions}
          reducerParticipations={reducerParticipations}
          reducerProfile={reducerProfile}
          apiselectProfile={apiselectProfile}
          apiselectProfileEmpty={apiselectProfileEmpty}
          apiParticipateInsert={apiParticipateInsert}
          apiParticipationsEmpty={apiParticipationsEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          apiParticipateUpdate={apiParticipateUpdate}
          apiCompetitionDeactivate={apiCompetitionDeactivate}
          apiCompetitionActivate={apiCompetitionActivate}
        />
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
        <SelectInRangeCompatition
          flagRefrsh={flagRefrsh}
          key={1}
          flagFilter={flagFilter}
          flagTypePage={flagTypePage}
          idCompetitions={idCompetitions}
          setflagTypePage={setflagTypePage}
          data={reducerCompetitionsSelect.data}
          setIdCompetitions={setIdCompetitions}
          reducerProfile={reducerProfile}
          reducerParticipations={reducerParticipations}
          apiselectProfileEmpty={apiselectProfileEmpty}
          apiParticipateInsert={apiParticipateInsert}
          apiselectProfile={apiselectProfile}
          apiParticipationsEmpty={apiParticipationsEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          apiParticipateUpdate={apiParticipateUpdate}
          apiCompetitionDeactivate={apiCompetitionDeactivate}
          apiCompetitionActivate={apiCompetitionActivate}
        />
      </TabPanel>
    </div>
  );
}
