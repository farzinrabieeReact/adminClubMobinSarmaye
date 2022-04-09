import React from "react";
import { AppBar, Box, LinearProgress, Tab, Tabs } from "@material-ui/core";
import CardNoData from "../../../../common/components/cardNoData";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Pagination from "../../../../common/components/pagination/index";
import Post from "./post/Post";
import { post_remove } from "../../../../../redux/content/posts/post_remove/post_remove";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
import { post_enable } from "../../../../../redux/content/posts/post_enable/post_enable";
import { approve_update } from "../../../../../redux/content/posts/approve_update";

const useStyles = makeStyles(() => ({
  root2: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "96.5%",
    margin: "30px auto 0",
    overflow: "auto"
  },
  appBar: {
    backgroundColor: "white !important",
    color: "lightseagreen !important"
  },
  TabPanel: {
    " & > div": {
      // padding: '5px 24px 0px 0px'
    }
  },
  pagination: {
    position: "fixed",
    zIndex: "1000",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    right: "6%"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Index = ({
  value,
  flagFilter,
  setFlagContent,
  flagContent,
  setparent_post_id,
  stateReducerPost,
  handleChange,

  setValue,
  flagApi,
  setflagApi,
  setPagnation,
  pagnation,
  stateReducerPostReject,
  stateReducerPostApprove,

  pagnation1,
  setPagnation1,
  pagnation2,
  setPagnation2,
  apiSubmitSelectPost
}) => {
  //////////////////////////////////////////////////hook
  const classes = useStyles();
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////function
  const handelPagnation = _data => {
    setPagnation(prev => ({ ...prev, number: _data }));
    setflagApi(prev => !prev);
  };
  const handelPagnation1 = _data => {
    setPagnation1(prev => ({ ...prev, number: _data }));
    setflagApi(prev => !prev);
  };
  const handelPagnation2 = _data => {
    setPagnation2(prev => ({ ...prev, number: _data }));
    setflagApi(prev => !prev);
  };

  const handleRemove = id => {
    let size = 0;

    post_remove(id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setflagApi(prev => !prev);
    }, 1000);
  };

  const handleEnable = id => {
    let size = 0;
    post_enable(id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setflagApi(prev => !prev);
    }, 1000);
  };

  //------------------------------------------dispatch approve----------------------
  const handleApprove = id => {
    approve_update(id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setflagApi(prev => !prev);
    }, 1000);
  };

  return (
    <>
      <div
        className={classes.root2}
        style={{ height: !flagFilter ? "79vh" : "41vh" }}
      >
        {/*{stateReducerPost.loading ||*/}
        {/*  stateReducerPostApprove.loading ||*/}
        {/*  (stateReducerPostReject.loading && <LinearProgress />)}*/}
        <AppBar position="sticky" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="تایید نشده" {...a11yProps(0)} />
            <Tab label="تایید شده" {...a11yProps(1)} />
            <Tab label="مخفی شده" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} className={classes["TabPanel"]}>
          {stateReducerPostReject.loading && <LinearProgress />}
          {stateReducerPostReject?.data?.map((itm, ind) => {
            return (
              <Post
                data={itm}
                buttons={true}
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleApprove={handleApprove}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
                stateReducerPost={stateReducerPost}
                apiSubmitSelectPost={apiSubmitSelectPost}
                setflagApi={setflagApi}
              />
            );
          })}
          <div className={classes.pagination}>
            <Pagination
              count={pagnation.count}
              pagnation={pagnation.number}
              setPagnation={_data => handelPagnation(_data)}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {stateReducerPostApprove.loading && <LinearProgress />}
          {stateReducerPostApprove?.data?.map((itm, ind) => {
            return (
              <Post
                data={itm}
                buttons={false}
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleApprove={handleApprove}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
                setflagApi={setflagApi}
              />
            );
          })}
          <div className={classes.pagination}>
            <Pagination
              count={pagnation1.count}
              pagnation={pagnation1.number}
              setPagnation={_data => handelPagnation1(_data)}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          {stateReducerPost.loading && <LinearProgress />}
          {stateReducerPost?.data?.map((itm, ind) => {
            return (
              <Post
                data={itm}
                buttons={
                  itm.body.approve_date === "1970/01/01 00:00:00.000000"
                    ? true
                    : false
                }
                index={ind}
                setFlagContent={setFlagContent}
                setparent_post_id={setparent_post_id}
                key={ind}
                handleApprove={handleApprove}
                handleRemove={handleRemove}
                handleEnable={handleEnable}
                setflagApi={setflagApi}
              />
            );
          })}
          <div className={classes.pagination}>
            <Pagination
              count={pagnation2.count}
              pagnation={pagnation2.number}
              setPagnation={_data => handelPagnation2(_data)}
            />
          </div>
        </TabPanel>
      </div>
    </>
  );
};

export default Index;
