import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "./tableRow/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/content/faq/faq_select/index";
import { actionTypes as actionTypesCategory } from "../../../../redux/content/faq/faq_select_category/index";
import { makeStyles } from "@material-ui/styles";
import { distinctMethod } from "../../../common/method/distinctMethod";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Backdrop, Fade, LinearProgress, Modal } from "@material-ui/core";
import Excel from "../../../common/components/Excel";
import Styles from "./index.module.scss";
import ModalAdd from "./modalAdd/ModalAdd";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});
interface Pagination {
  number: number;
  count: number;
}

const Faq = () => {
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
      label: "سوال",
      title: "question",
      active: false,
      type: "text"
    },
    {
      id: 3,
      label: "جواب",
      title: "answer",
      active: false,
      type: "text",
      format: (data: any) => handleData(data)
    }
  ];
  /////////////////////////////////////////////////////////////////state
  // const stateReducer=useSelector((state:any)=>state.faq_select_reducer)
  const stateReducer = useSelector((state: any) => state.faq_select_reducer);
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const stateReducerCategory = useSelector(
    (state: any) => state.faq_select_category_reducer
  );

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [flagModalAdd, setFlagModalAdd] = useState<any>(false);
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [categotyFAQ, setCategotyFAQ] = useState<any>([]);
  const [DataEdit, setDataEdit] = useState({
    answer: null,
    category: null,
    question: null
  });
  //////////////////////////////////////////////////////////////////hook
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypesCategory.selectFaqCategoryAsync });
  }, []);

  useEffect(() => {
    apiSubmit();
  }, [flagApi]);

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));

    setCategotyFAQ(distinctMethod(stateReducer.data, ["body", "category"]));
  }, [stateReducer]);

  //////////////////////////////////////////////////////////////////function
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handleData = (data: any) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: data }}
        className={Styles.danjerInnerHtmll}
      ></div>
    );
  };

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    // handleData()

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectFaqAsync, payload: _data });
  };

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi(prevState => !prevState);
  };
  const headers = [
    { label: "ردیف", key: "row" },
    { label: "سوال", key: "question" },
    { label: "جواب", key: "answer" }
  ];
  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        question: info.body.question,
        // answer: info.body.answer
        answer: (
          <div
            dangerouslySetInnerHTML={{ __html: info.body.answer }}
            className="danjerInnerHtml"
          ></div>
        )
      };
    });
    return dataExcel;
  };

  //////////////////////////////////////////////////////////////////return
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <button
            className="btnsGreen"
            onClick={() => setFlagModalAdd((prev: any) => !prev)}
          >
            افزودن
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description11"
            className="d-flex justify-content-center align-items-center"
            open={flagModalAdd}
            onClose={() => setFlagModalAdd(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={flagModalAdd}>
              <ModalAdd
                categotyFAQ={stateReducerCategory}
                setflagClose={setFlagModalAdd}
                setflagApi={setflagApi}
              />
            </Fade>
          </Modal>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateTable}
            methodType={"select"}
            tableApi={"faq"}
            filename={"faq"}
            valueTab={0}
            methodType2={null}
          />
          <Drawer
            children={null}
            tableHead={head}
            stateFilter={stateTable}
            setStateFilter={setStateTable}
            apiSubmit={() => submitTable()}
          />
          <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
        </div>
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
      >
        {state?.map((item: any, index: any) => {
          return (
            <TableRow
              key={index}
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
              categotyFAQ={categotyFAQ}
              stateReducerCategory={stateReducerCategory}
              DataEdit={DataEdit}
              setDataEdit={setDataEdit}
              setflagApi={setflagApi}
            />
          );
        })}
      </Table>
    </>
  );
};

export default Faq;
