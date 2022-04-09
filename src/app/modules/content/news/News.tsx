import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "./tableRow/index";
import { useDispatch, useSelector } from "react-redux";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { makeStyles } from "@material-ui/styles";
import { handleNull } from "../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { actionTypes as actionTypesNews } from "../../../../redux/content/news/news_select";
import Excel from "./excel";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddNews from "./addNews/AddNews";
import { LinearProgress } from "@material-ui/core";

interface Pagination {
  number: number;
  count: number;
}
let useStles = makeStyles({
  head: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5px 0"
  },
  iconRefresh: {
    cursor: "pointer",
    margin: "0px 10px"
  }
});
const News = () => {
  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },
    {
      id: 2,
      label: "عنوان",
      title: "title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "خلاصه خبر",
      title: "short_description",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];
  const stateReducer = useSelector((state: any) => state.news_select_Reducer);

  const dispatch = useDispatch();
  let classes = useStles();
  const [newButton, setNewButton] = useState();
  const [sort, setSort] = useState({});
  const [headTable, setHeadTable] = useState<any>([]);
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  useEffect(() => {
    apiSubmit();
  }, [flagApi]);
  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]);

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({
      type: actionTypesNews.NewsSelectAsync,
      payload: _data
    });
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  return (
    <>
      <div className={classes["head"]}>
        <AddNews
          newButton={newButton}
          setNewButton={setNewButton}
          setflagApi={setflagApi}
        />
        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={head}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />

        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      {stateReducer.loading ? <LinearProgress /> : null}
      <Table
        height={"tab"}
        head={head}
        filterTable={stateTable}
        setFilterTable={setStateTable}
        sort={sort}
        setSort={setSort}
        pagnation={pagnation}
        setPagnation={setPagnation}
        submitTable={submitTable}
        setflagApi={setflagApi}
        loading={stateReducer.loading}
      >
        {state.map((item: any, index: any) => {
          return (
            <TableRow
              key={index}
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
              setflagApi={setflagApi}
              apiSubmit={apiSubmit}
            />
          );
        })}{" "}
      </Table>
    </>
  );
};

export default News;
