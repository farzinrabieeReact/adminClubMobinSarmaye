import React, { useEffect, useState } from "react";
import Table from "../../../../common/components/componentCustomTable";
import { makeStyles } from "@material-ui/core/styles";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as discount } from "../../../../../redux/gift/discountCode/select_single_discount_code";
import { actionTypes as profile } from "../../../../../redux/gift/discountCode/person_select";
import { LinearProgress, Tooltip } from "@material-ui/core";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import Drawer from "../../../../common/components/drawer";
import TableRow from "../../../gift/discountCode/tableRow/index";
import Excel from "../excel";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../../common/method/handeFilterForDate";
import { Add, Delete, DeleteSweepTwoTone } from "@material-ui/icons";
import DeleteIcon from "./deleteIcon/DeleteIcon";
import { object } from "prop-types";
import { delete_bulk_discount_code } from "../../../../../redux/gift/discountCode/delete_bulk_discount_code/delete_bulk_discount_code";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto"
    // marginTop:10,
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10
  },

  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  modal: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 600,
    margin: "auto",
    padding: theme.spacing(5),
    "& div": {
      width: 250
    }
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%"
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
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px"
    }
  },
  boxEmpty: {
    width: 24,
    height: 24
  }
}));

interface Pagination {
  number: number;
  count: number;
}

let b = false;

const TableUsers = ({
  stateClubmember,
  flagRefresh,
  setNational_id,
  newButton,
  setNewButton,
  setflagApi,
  flagApi
}: any) => {
  const classes = useStyles();

  const head = [
    // { id: 1, label: "", title: null, active: false, type: "" },
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "کد تخفیف",
      title: "code",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "نام جایزه",
      title: "gift_name",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "عنوان جایزه",
      title: "gift_title",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "ادمین",
      title: "issuer_first_name",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },

    {
      id: 6,
      label: "تاریخ انقضا",
      title: "expiration_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 8,
      label: "خریدار",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: " تاریخ خرید",
      title: "registration_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    }
  ];
  let headersTable = [
    {
      id: 9,
      label: "شناسه جایزه",
      title: "category",
      active: true,
      type: "text"
    },
    {
      id: 10,
      label: "از تاریخ انقضا",
      title: "expiration_date_from",
      active: true,
      type: "date"
    },
    {
      id: 11,
      label: "تا تاریخ انقضا",
      title: "expiration_date_to",
      active: true,
      type: "date"
    },
    {
      id: 12,
      label: "از  تاریخ خرید",
      title: "registration_date_from",
      active: true,
      type: "date"
    },
    {
      id: 12,
      label: "تا  تاریخ خرید",
      title: "registration_date_to",
      active: true,
      type: "date"
    }
  ];

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);

  const [headTable, setHeadTable] = useState<any>([]);
  const [arrayId, setArrayId] = useState<any>([]);
  const [selectMultiRow, setSelectMultiRow] = useState({});

  const [flagDetails, setFlagDetails] = useState(false);
  const [selectDelete, setSelectDelete] = useState<any>([]);

  // console.log("ararrar", arrayId);

  const dispatch = useDispatch();

  const stateReducer = useSelector(
    (state: any) => state.discount_code_select_reducer
  );

  const handelDeleteCheckBox = () => {
    setFlagDetails(true);
    let selectArray: any = [];
    let dataDl: any = selectMultiRow;
    stateReducer.data.map((itm: any) => {
      if (itm.body.member_id !== "null") {
        delete dataDl[itm.id];
      }
    });
    Object.keys(dataDl).forEach((item, inf) => {
      selectArray.push(item);
    });
    let _data = {
      _id: selectArray
    };

    setSelectDelete(_data);
  };
  const handleDeleteDisCode = () => {
    delete_bulk_discount_code(selectDelete)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
        setTimeout(() => {
          setflagApi((pre: any) => !pre);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setFlagDetails(false);
    setSelectDelete([]);
    setSelectMultiRow({});
  };

  const { loading } = stateReducer;

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headersTable];
    });
  }, []);

  const apiSubmit = (memberId: any) => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    if (memberId) {
      obj = { ...obj, ...memberId };
    }

    obj = handeFilterForDate(
      obj,
      [
        "expiration_date_from",
        "expiration_date_to",
        "registration_date_from",
        "registration_date_to"
      ],
      ["expiration_date_to", "registration_date_to"]
    );

    // obj.participation_deadline

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    // dispatch({
    //   type: actionTypes.compatitionSelectActiveAsync,
    //   payload: _data,
    // });
    dispatch({ type: discount.selectSingleDiscountCodeAsync, payload: _data });
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmit(null);
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateClubmember.data.length > 0) {
      let obj = {
        member_id: stateClubmember.data[0].id
      };
      // setStateFilter(prev => ({ ...prev, member_id: stateClubmember.data[0].id }))
      // apiSelectdiscountCode(null, obj)
      apiSubmit(obj);
      dispatch({ type: profile.profileSelectEmpty });
    }
  }, [stateClubmember]); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setSelectMultiRow({});
  }, [pagnation.number]);

  // useEffect(() => {
  //   if (b) {
  //     handelRefresh();
  //   }
  //   b = true;
  // }, [flagRefrsh]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setSelectMultiRow({});
    setSelectDelete([]);
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
    setNational_id("");
  };

  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefresh]);

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

  const handleDate = (date: any) => {
    if (date) {
      let dateSplit = date?.split(" ");
      return dateMiladiToShamsi(dateSplit);
    } else {
      return "-";
    }
  };
  return (
    <>
      <div
        style={{ position: "absolute", top: 140, left: 50 }}
        className="d-flex align-items-center"
      >
        <Tooltip title={"کد تخفیف جدید"} placement="top-end" arrow>
          <Add
            style={{ marginLeft: "15px" }}
            onClick={() => setNewButton((prev: any) => !prev)}
            fontSize="large"
          />
        </Tooltip>
        <DeleteIcon
          handelDeleteCheckBox={handelDeleteCheckBox}
          setFlagDetails={setFlagDetails}
          flagDetails={flagDetails}
          selectDelete={selectDelete}
          handleDeleteDisCode={handleDeleteDisCode}
        />

        <Excel stateFilter={stateTable} Head={head} />
        <Drawer
          children={null}
          tableHead={headTable.filter(
            (itm: any, ind: any) =>
              ind !== 3 && ind !== 5 && ind !== 2 && ind !== 7
          )}
          stateFilter={{
            registration_date_from: null,
            registration_date_to: null,
            expiration_date_from: null,
            expiration_date_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />

        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      {loading && <LinearProgress />}
      <Table
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
        stateReducer={stateReducer}
        selectMultiRow={selectMultiRow}
        setSelectMultiRow={setSelectMultiRow}
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
              setArrayId={setArrayId}
              arrayId={arrayId}
              selectMultiRow={selectMultiRow}
              setSelectMultiRow={setSelectMultiRow}
            />
          );
        })}{" "}
      </Table>
    </>
  );
};

export default TableUsers;
