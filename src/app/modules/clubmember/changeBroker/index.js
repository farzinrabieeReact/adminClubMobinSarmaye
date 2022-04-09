import React, { useEffect, useState } from "react";
// import Filter from "./Filter";
import Table from "./table/index";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
// import { changeBroker_v1_select_actions } from "../../../../boot/api/stock/changeBroker/action";
// import { summaries_v1_actions_select } from './../../../../boot/api/profile/summaries/action';
import { actionTypes as selectSummaries } from "../../../../redux/summaries";
// import { actionTypes as selectChangeBroker } from "../../../../redux/clubmember/changeBroker_select";

let flag = false;

const UsersList = () => {
  const dispatch = useDispatch();

  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilterExcel, setStateFilterExcel] = useState({});
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});

  const [flagRefrsh, setflagRefrsh] = useState(false);

  const data = useSelector((state) => state.changeBroker_select_reducer);
  const Isin = useSelector((state) => state.select_summaries_Reducer).isinJson;

  const requestStatus = (key) => {
    switch (key) {
      case "-2":
        return "در انتظار انصراف";
      case "-1":
        return "در صف انتظار";
      case "1":
        return "در انتظار تایید پذیرش";
      case "2":
        return "در انتظار تایید معامله گر";
      case "3":
        return "در انتظار اقدام";
      case "4":
        return "اقدام شده";
      case "5":
        return "ابطال شده";
      default:
        return "-";
    }
  };

  useEffect(() => {
    if (Object.keys(Isin).length === 0) {
      dispatch({ type: selectSummaries.selectSummariesAsync, payload: {} });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  const handleNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const handleRefresh = () => {
    setflagRefrsh((prev) => !prev);
  };

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        requestStatus={requestStatus}
        Isin={Isin}
        stateFilterExcel={stateFilterExcel}
      />
        <Table
          flagRefrsh={flagRefrsh}
          setStateFilterExcel={setStateFilterExcel}
          flagFilter={flagFilter}
          data={data}
          handleNull={handleNull}
          requestStatus={requestStatus}
          Isin={Isin}
          pageTab1={pageTab1}
          setPageTab1={setPageTab1}
          sort={sort}
          setSort={setSort}
        />
    </>
  );
};

export default UsersList;
