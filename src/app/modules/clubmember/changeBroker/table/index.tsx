import React, { useEffect, useState } from "react";

import Table from "../../../../common/components/componentCustomTable";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { makeStyles } from "@material-ui/core/styles";
import ButtonDetails from "../ButtonDetails/index";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
// import { summaries_v1_actions_select } from './../../../../../boot/api/profile/summaries/action';
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { actionTypes as selectSummaries } from "../../../../../redux/summaries";
import { actionTypes as selectChangeBroker } from "../../../../../redux/clubmember/changeBroker_select";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import Drawer from "../../../../common/components/drawer";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    // marginTop:10,
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
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
      width: 250,
    },
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%",
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
    direction: "ltr",
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
}));

interface Pagination {
  number: number;
  count: number;
}

let b = false

interface Info{
  title:string,
  className:string,
  modal:string
}
let info={
  title: "جزئیات",
  className: "btnsGreen",
  modal: "ModalDetails",
}

const TableUsers = ({
  data,
  handleNull,
  requestStatus,
  setStateFilterExcel,
  Isin,
  flagRefrsh
}: any) => {
  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    request_date:null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateValueIsin, setstateValueIsin] = useState<any>("");
  const [flagEmptySymbol, setflagEmptySymbol] = useState(false);

  const classes = useStyles();
  let dispatch = useDispatch();








  const stateReducer = useSelector(
    (state: any) => state.changeBroker_select_reducer
  );


  const {loading} = stateReducer

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "شناسه سهام",
      title: "isin",
      shortName:stateValueIsin,
      active: true,
      type: "symbol",
      format: (data: any) => handleNull(data),
    },
    {
      id: 3,
      label: "تاریخ ثبت درخواست",
      title: "request_date",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data),
    },
    {
      id: 4,
      label: "وضعیت",
      title: "state",
      active: false,
      type: "option",
      option: [
        { title: "در انتظار انصراف", value: "-2" },
        { title: "در صف انتظار", value: "-1" },
        { title: "در انتظار تایید پذیرش", value: "1" },
        { title: "در انتظار تایید معامله گر", value: "2" },
        { title: "در انتظار اقدام", value: "3" },
        { title: "اقدام شده", value: "4" },
        { title: "ابطال شده", value: "5" },
        { title: "-", value: "-" },
      ],
      format: (data: any) => handelDate(data),
    },
    // {
    {
      id: 5,
      label: "توضیحات",
      title: null,
      active: true,
      type: "text",
      format: (data: any) => findRoll(data).value,
    },
  ];

  // const tableHeadStart = [
  //   { id: 1, label: "ردیف", title: null, active: false },
  //   { id: 2, label: "شناسه سهم", title: "isin", active: false },
  //   { id: 3, label: "تاریخ ثبت درخواست", title: "request_date", active: false },
  //   { id: 4, label: "وضعیت", title: "state", active: false },
  //   { id: 5, label: "توضیحات", title: null, active: false },
  //   { id: 6, label: "عملیات", title: null, active: false },
  // ];

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps


  // console.log("data",data)

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });




    if(obj.request_date){
      let date = convertDigitToEnglish(obj.request_date.format('YYYY/MM/DD'))
      obj.request_date = `${date} 00:00:00.000000`
    }





    //  if (obj?.isin) {
    //   if (obj?.isin.short_name) {
    //     let { isin, ...restObj } = obj;
    //     let data = {
    //       ...restObj,
    //       isin: isin.isin,
    //     };

    //     let _data = {
    //       data: data,
    //       from: pagnation.number,
    //       size: size,
    //       sort_by: sortRes,
    //     };
    //     // dispatch(changeBroker_v1_select_actions(sortRes, size, from, data));
    //     dispatch({type:selectChangeBroker.changeBrokerSelectAsync,payload:_data})
    //     return;
    //   }
    // }

    // let { isin, ...restObj } = obj;

    setStateFilterExcel(obj);


    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({
      type: selectChangeBroker.changeBrokerSelectAsync,
      payload: _data,
    });
  };



  useEffect(() => {
    apiSubmit();
  }, []); //eslint-disable-lin

  const handelDate = (date: any) => {
    let chngeDate = "";
    chngeDate = dateMiladiToShamsi(date.split(" ")[0]);
    return chngeDate;
  };
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




  
  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b=true
  }, [flagRefrsh]);



  const handelRefresh = () => {
    setSort({});
    setStateTable({
      request_date:null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
    setstateValueIsin("")
  };

  const handleValueISin = (stateIsin:any)=>{
    let value = null
    if(stateIsin){
       value = Isin[stateIsin] 
    }
    setstateValueIsin(value)
  }


  return (
    <>
      <div style={{ position: "absolute", left: 165, top: 155 }}>
        <Drawer
          children={handleValueISin}
          tableHead={head.filter((info,index)=> index !== 5 && index !== 4)}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
          // handleValueISin={handleValueISin}
        />
      </div>
      {loading && <LinearProgress/>}
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
        {data.data
          ? data.data.map((row: any, ind: any) => {
              return (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pagnation.number !== 1
                      ? pagnation.number * stateReducer.size -
                        stateReducer.size +
                        (ind + 1)
                      : ind + 1}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(
                      Isin[row.body.isin] ? Isin[row.body.isin] : row.body.isin
                    )}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(
                      dateMiladiToShamsi(row.body.request_date.split(" ")[0])
                    )}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(requestStatus(row.body.state))}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.description)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {row.body.file_name === "null" && (
                      <>
                        <button className={"btnsGray disabledItems"}>
                          جزئیات
                        </button>
                      </>
                    )}

                    
                    {
                        row.body.file_name !== 'null' && row.body.file_name && (
                          <ButtonDetails
                            info={info}
                            data={row}
                          />
                    
                        )}
                  </TableCell>
                </TableRow>
              );
            })
          : null}
      </Table>
    </>
  );
};

export default TableUsers;
