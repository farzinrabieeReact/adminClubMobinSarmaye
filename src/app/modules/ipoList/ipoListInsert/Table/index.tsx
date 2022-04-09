import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../common/components/customTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { sepratePriceFromComma } from "../../../../common/method/seprateNumberFromComma";
import ButtonModal from "../../IpoListSelect/button/ButtonModal";
import { actionType as ipoListSelect } from "../../../../../redux/ipoList/ipoList_select";
import { Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
    width: "96.2%",
    margin: "auto",
  },

  table: {
    minWidth: 600,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
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
  loadBtn: {
    textAlign: "center",
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
  btnActive: {
    border: "1px solid",
  },
}));

;

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

interface Pagination {
  number: number;
  count: number;
}

const Index = ({
  tabletext,
  flagRefresh,
  setflagRefresh,
}: any) => {
  const dispatch = useDispatch();
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const [sort, setSort] = useState({});

  const [state, setstate] = useState<any>([]);
  const stateReducer = useSelector(
    (state: any) => state.ipoList_select_reducer
  );
  const [stateActive, setStateActive] = useState<any>({
    id: "",
    method: "",
    active: false,
    ind: "",
  });

  const [flagButton, setFlagButton] = useState<any>(null);

  const [flagApi, setflagApi] = useState<boolean>(false);



 

  

  useEffect(() => {
    if (flagRefresh) {
      setSort({});
      setPagnation({
        number: 1,
        count: 2,
      });
      setStateTable({});
    }
    setflagApi((prev: any) => !prev);
    setflagRefresh(false);
  }, [flagRefresh]);

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]);

 

  useEffect(() => {
    apiSubmit()
  }, [flagApi]);

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
      sortRes: sortRes,
    };

    dispatch({
      type: ipoListSelect.ipoListSelectAsync,
      payload: _data,
    });
  };

  // const handleClickActive = (id: any, method: any, active: any, ind: any) => {
  //   setStateActive({
  //     id: id,
  //     method: method,
  //     active: active,
  //     ind: ind,
  //   });

  //   setFlagButton(method);
  // };

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نماد",
      title: "stock_name",
      active: false,
      type: "text",
    },
    {
      id: 3,
      label: "تاریخ عرضه",
      title: "ipo_date",
      active: true,
      type: "date",
    },
    {
      id: 4,
      label: "تاریخ شروع ثبت نام",
      title: "start_date",
      active: true,
      type: "date",
    },
    {
      id: 5,
      title: "end_date",
      label: "تاریخ پایان ثبت نام",
      active: true,
      type: "date",
    },
    {
      id: 6,
      label: "آستانه مجاز قیمت",
      title: "max_price",
      active: true,
      type: "text",
    },

    {
      id: 7,
      label: "حداکثر تعداد سهم قابل درخواست",
      title: "max_quantity",
      active: false,
      type: "text",
    },
  ];


  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };














  const handleChange = (
    event: any,
    id: any,
    method: any,
    active: any,
    ind: any
  ) => {
    
    setStateActive({
      id: id,
      method: method,
      active: active,
      ind: ind,
    });
  };

  return (
    <>
      <Table
        head={head}
        height={"header"}
        filterTable={stateTable}
        setFilterTable={setStateTable}
        sort={sort}
        setSort={setSort}
        pagnation={pagnation}
        setPagnation={setPagnation}
        submitTable={submitTable}
      >
        {tabletext?.data?.map((info: any, ind: any) => (
          <TableRow
            key={ind}
            >
            <TableCell className="colorInherit" align="center">
              {ind + 1}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {info.body.stock_name}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {dateMiladiToShamsi(info.body.ipo_date.split(" ")[0])}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {dateMiladiToShamsi(info.body.start_date.split(" ")[0])}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {dateMiladiToShamsi(info.body.end_date.split(" ")[0])}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {sepratePriceFromComma(info.body.max_price)} -{" "}
              {sepratePriceFromComma(info.body.min_price)}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {info.body.max_quantity}
            </TableCell>

            <TableCell className="colorInherit" align="center">
              <Switch
                checked={info.body.is_active === 'TRUE'? true : false}
                onChange={(event) =>
                  handleChange(event, info.id, info.body.is_active, true, ind)
                }
                inputProps={{ "aria-label": "controlled" }}
              />

              {stateActive.active && stateActive.ind === ind && (
                <ButtonModal
                  ind={ind} 
                  setflagApi={setflagApi}
                  indexClick={stateActive.ind}
                  // open={open}
                  // setOpen={setOpen}
                  setStateActive={setStateActive}
                  active={stateActive.active}
                  id={stateActive.id}
                  isActive={stateActive.method}
                  flagButton={flagButton}
                  setFlagButton={setFlagButton}
                />
              )}

              {/* <Button
                className="btnsGreen"
                variant="outlined"
                color="secondary"
                onClick={(e) =>
                  handleClickActive(info.id, "activate_ipo", true, ind)
                }
              >
                فعال
                {flagButton ==="activate_ipo" && (
                  <ButtonModal
                    ind={ind}
                    indexClick={stateActive.ind}
                    // open={open}
                    // setOpen={setOpen}
                    active={stateActive.active}
                    id={stateActive.id}
                    method={stateActive.method}
                    flagButton={flagButton}
                    setFlagButton={setFlagButton}
                  />
                )}
              </Button>
              <Button
                style={{ marginRight: "10px" }}
                className="btnsGreen"
                variant="outlined"
                color="primary"
                onClick={(e) =>
                  handleClickActive(info.id, "deactivate_ipo", false, ind)
                }
              >
                غیر فعال
                {flagButton === "deactivate_ipo" && (
                  <ButtonModal
                    ind={ind}
                    indexClick={stateActive.ind}
                    // open={open}
                    // setOpen={setOpen}
                    active={stateActive.active}
                    id={stateActive.id}
                    method={stateActive.method}
                    flagButton={flagButton}
                    setFlagButton={setFlagButton}
                  />
                )}
              </Button> */}

       
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default Index;