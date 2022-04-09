import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateMiladi } from "../../../common/method/date";
import Header from "./Header";
import Table from "./Table/index.tsx";
import { actionType as ipoListSelect } from "../../../../redux/ipoList/ipoList_select";
import { insert_newIpo } from "../../../../redux/ipoList/ipoList_insert";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";

const init = {
  stock_name: "",
  max_quantity: "",
  min_price: "",
  max_price: "",
  ipo_date: "",
  start_date: "",
  end_date: "",
};

let flag = false;
const Index = () => {
  const [state, setState] = useState({
    isin: "",
    stock_name: "",
    max_quantity: "",
    dateIpo: "",
    dataStart: "",
    dateEnd: "",
    min_price: "",
    max_price: "",
    ipo_date: "",
    start_date: "",
    end_date: "",
    total_value: "",
    portfo_value: "",
    account_remain: "",
    has_credit: "",
  });

  const [addedCategory, setAddedCategory] = useState(false);
  const [flagFilter, setflagFilter] = useState(false);
  const [stateFilter, setstateFilter] = useState(init);
  const [stateActive, setStateActive] = useState({});

  const [sort, setSort] = useState({});
  const [flagRefresh, setflagRefresh] = useState(false);

  const dispatch = useDispatch();
  const tabletext = useSelector((state) => state.ipoList_select_reducer);

  useEffect(() => {
    dispatch({
      type: ipoListSelect.ipoListSelectAsync,
      payload: {},
    });
  }, []);

  const handleChangeFilter = (data, type) => {
    setstateFilter((prev) => ({
      ...prev,
      [type]: data,
    }));
  };
  // const handleClickActive = (id, method, active) => {
  //   setStateActive({
  //     id: id,
  //     method: method,
  //     active: active,
  //   });

  //   setOpen(!open);
  //   // Insert_activeIpo(id, method);
  // };

  const handleExit = () => {
    setAddedCategory(false);
  };

  useEffect(() => {
    if (!addedCategory) {
      setState({
        isin: "",
        stock_name: "",
        max_quantity: "",
        dateIpo: "",
        dataStart: "",
        dateEnd: "",
        min_price: "",
        max_price: "",
        ipo_date: "",
        start_date: "",
        end_date: "",
        total_value: "",
        portfo_value: "",
        account_remain: "",
        has_credit: "",
      });
    }
  }, [addedCategory]);

  const handleSubmit = () => {
    let flag = false;
    Object.keys(state).forEach((key) => {
      if (state[key] === "") {
        flag = true;
      }
    });

    if (flag) {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `لطفا تمامی فیلد های مورد نظر را پر نمایید`,
          typeAlert: "warning",
        },
      });
      return;
    }

    let data = {
      isin: state.isin,
      stock_name: state.stock_name,
      max_quantity: state.max_quantity,
      min_price: state.min_price,
      max_price: state.max_price,
      ipo_date: `${dateMiladi(state.dateIpo)} ${state.ipo_date}`,
      start_date: `${dateMiladi(state.dataStart)} ${state.start_date}`,
      end_date: `${dateMiladi(state.dateEnd)} ${state.end_date}`,
      total_value: state.total_value,
      portfo_value: state.portfo_value,
      account_remain: state.account_remain,
      has_credit: state.has_credit,
      is_active: "TRUE",
    };

    insert_newIpo(data)
      .then((res) => {
        let isOk = handleNotificationAlertTryUpdate(res);
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
    setAddedCategory(false);
  };

  const apiCall = () => {
    const { id, ...sortRes } = sort;
    let obj = {};

    Object.keys(stateFilter)
      .filter((item) => stateFilter[item])
      .forEach((key) => {
        obj[key] = stateFilter[key];
      });

    // dispatch(ipoList_select_title_action(obj, sortRes));
  };

  const handleRefresh = () => {
    setflagRefresh(true);
  };

  const handelSubmitFilter = () => {
    apiCall();
  };

  useEffect(() => {
    if (flag) {
      apiCall();
    }
    flag = true;
  }, [sort]);

  const handleChangeText = (data, type) => {
    setState((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  return (
    <div>
      <Header
        flagRefresh={flagRefresh}
        setflagRefresh={setflagRefresh}
        handleChangeText={handleChangeText}
        state={state}
        setState={setState}
        handleSubmit={handleSubmit}
        addedCategory={addedCategory}
        setAddedCategory={setAddedCategory}
        handleExit={handleExit}
        handleShowFilter={() => setflagFilter(!flagFilter)}
        handleRefresh={handleRefresh}
      />
      {/* <FilterItem
        flagFilter={flagFilter}
        handleChangeFilter={handleChangeFilter}
        stateFilter={stateFilter}
        setstateFilter={setstateFilter}
        handelSubmitFilter={handelSubmitFilter}
      /> */}
      <Table
        flagRefresh={flagRefresh}
        tabletext={tabletext}
        apiCall={apiCall}
        handleRefresh={handleRefresh}
        setflagRefresh={setflagRefresh}
        stateActive={stateActive}
        setStateActive={setStateActive}
      />
    </div>
  );
};

export default Index;
