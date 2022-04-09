import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../common/components/componentCustomTable/index";
import TableBodyCustom from "./TableBody";

import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";

import { actionTypes as selectgoverment } from "../../../../redux/connect";
import Drawer from "../../../common/components/drawer";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    marginTop: 30
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px"
    }
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  icons: {
    width: "96.5%",
    margin: "auto",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer"
    }
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 0,
    /* left: 0; */
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr"
  },
  boxEmpty: {
    width: 24,
    height: 24
  }
});

let b = false;
interface Pagination {
  number: number;
  count: number;
}
export default function SimpleTable({ setStateFilterExcel, flagRefrsh }: any) {
  const [selectedItem, setSelectedItem] = useState([false, null]);
  const [ensureDelete, setEnsureDelete] = useState(false);

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);

  const stateReducer = useSelector(
    (state: any) => state.goverment_select_reducer
  );
  const { loading } = stateReducer;

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "استان",
      title: "ProvinceName",
      statusSort: true,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "شهر",
      title: "CityName",
      statusSort: true,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "مسئول دفتر",
      title: "FullName",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "کد دفتر",
      title: "OfficeId",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },

    {
      id: 5,
      label: "تلفن یا فکس",
      title: "PhoneNumber",
      active: false,
      type: "text",

      format: (data: any) => findRoll(data).value
    },
    {
      id: 6,
      label: "کد پستی",
      title: "PostalCode",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "آدرس",
      title: "Address",
      active: false,
      statusSort: true,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];

  const handleDeleteFaq = () => {
    if (!selectedItem[0]) {
      alert("گزینه ای انتخاب نکرده اید");
      return;
    }

    setEnsureDelete(true);
  };

  const handleOkAlert = () => {
    setEnsureDelete(false);
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
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

    setStateFilterExcel(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: selectgoverment.govermentSelectAsync,
      payload: _data
    });
  };

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefrsh]);

  const findRoll = (key: any) => {
    switch (key) {
      case "TRUE":
        return { value: "فعال", roll: "TRUE" };
      case "FALSE":
        return { value: "غیر فعال", roll: "FALSE" };
      default:
        return { value: "-", roll: "-" };
    }
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null" || key === undefined) {
      return "_";
    } else {
      return key;
    }
  };

  return (
    <>
      <div style={{ position: "absolute", left: 155, top: 155 }}>
        <Drawer
          children={null}
          tableHead={head}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
      </div>
      {loading && <LinearProgress />}
      <Table
        loading={loading}
        height={"header"}
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
        {state.map((row: any, ind: any) => (
          <TableBodyCustom
            pagnation={pagnation}
            data={row}
            stateReducer={stateReducer}
            selectedItem={selectedItem}
            changedSelected={setSelectedItem}
            key={ind}
            index={ind}
          />
        ))}
      </Table>

      {/* <div className={classes["icons"]}>
        <div style={{ paddingRight: 15 }}>
          <span>
            <DeleteForeverIcon onClick={handleDeleteFaq} />
          </span>
        </div>
      </div> */}
      {/* <AlertDialogSlide
        flagShow={ensureDelete}
        handleCloseAlert={setEnsureDelete}
        handleOkAlert={handleOkAlert}
        data={dataAlertDialogSlide}
      /> */}
    </>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};
