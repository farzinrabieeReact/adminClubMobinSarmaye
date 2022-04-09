import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch } from "react-redux";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import ButtonDetails from "../../../../usersList/buttonDetails/ButtonDetails";
import Button from "@material-ui/core/Button";
import ButtonModal from "../../button/ButtonModal";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import { sepratePriceFromComma } from "../../../../../common/method/seprateNumberFromComma";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
    width: "96.2%",
    margin: "auto",
    // marginTop:10,
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

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead1 = [
  // { id: 1, label: "نمایش", title: null, active: false },
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نماد", title: "stock_name", active: false },
  { id: 3, label: "تاریخ عرضه", title: "ipo_date", active: false },
  {
    id: 4,
    label: "تاریخ شروع ثبت نام",
    title: "start_date",
    active: false,
  },
  {
    id: 5,
    label: "تاریخ پایان ثبت نام",
    title: "end_date",
    active: false,
  },
  {
    id: 6,
    label: "آستانه مجاز قیمت",
    title: "max_price",
    active: false,
  },
  {
    id: 7,
    label: "حداکثر تعداد سهم قابل درخواست",
    title: "max_quantity",
    active: false,
  },
  {
    id: 8,
    label: "عملیات",
    title: "",
    active: false,
  },
];

const Index = ({
  tabletext,
  apiCall,
  sort,
  setSort,
  handleClickActive,
  open,
  setOpen,
  stateActive,
  setStateActive,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tableHeadState, setTableHeadState] = useState(tableHead1);

  // const from = useSelector((state) => state.select_ipo_list_reducer);

  // const hanldepro = (val)=>{
  //     if(val === "NOT_PROCESSED"){
  //         return "در دست بررسی"
  //     }
  //     if(val === "FINALIZED"){
  //         return "تایید شده"
  //     }
  //     if(val === "REJECTED"){
  //         return "رد شده"
  //     }

  // }

  useEffect(() => {
    apiCall();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const handleLoadBtn =()=>{
  //     apiCall(valueIpo.id,from.from + 20)
  // }

  // // const handleLoadBtn = ()=>{
  // //     apiCall2(valueIpo.id,from.from + 20)
  // // }
  // // const apiCall2 = (id , from) => {
  // //     dispatch(ipoList_select_action(id , from));
  // // };

  // useEffect(() => {
  //     if(from.data)
  //     setState(from.data)
  // }, [from.data]);  //eslint-disable-line react-hooks/exhaustive-deps

  const handleClickSort = (title, id) => {
    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (id === sort.id) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort({});
        return;
      }
      setSort({ [title]: findState, id: id });
    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort({ [title]: stateSort.ASC, id: id });
    }
  };

  const findStateSort = (title) => {
    switch (sort[title]) {
      case stateSort.DEFAULT:
        return stateSort.ASC;
      case stateSort.ASC:
        return stateSort.DESC;
      case stateSort.DESC:
        return stateSort.DEFAULT;
      default:
        return stateSort.DEFAULT;
    }
  };

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30 }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                  // onClick={() => handleSortTable(ind, item)}
                  onClick={() => handleClickSort(item.title, item.id)}
                >
                  {item.label}
                  {item.active ? (
                    sort[item.title] === stateSort.ASC ? (
                      <ArrowUpwardIcon />
                    ) : sort[item.title] === stateSort.DESC ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <svg className={classes.boxEmpty}></svg>
                    )
                  ) : (
                    <svg className={classes.boxEmpty}></svg>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tabletext?.data?.map((info, ind) => (
              <TableRow
                key={ind}
                // className={classes.tableRow}
                // onClick={handleClickRow}
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
                  <Button
                    className="btnsGreen"
                    variant="outlined"
                    color="success"
                    onClick={(e) =>
                      handleClickActive(info.id, "activate_ipo", true)
                    }
                  >
                    فعال
                    {open && (
                      <ButtonModal
                        open={open}
                        setOpen={setOpen}
                        active={stateActive.active}
                        id={stateActive.id}
                        method={stateActive.method}
                      />
                    )}
                  </Button>
                  <Button
                    style={{ marginTop: "10px" }}
                    className="btnsRed"
                    variant="outlined"
                    color="success"
                    onClick={(e) =>
                      handleClickActive(info.id, "deactivate_ipo", false)
                    }
                  >
                    غیر فعال
                    {open && (
                      <ButtonModal
                        open={open}
                        setOpen={setOpen}
                        active={stateActive.active}
                        id={stateActive.id}
                        method={stateActive.method}
                      />
                    )}
                  </Button>

                  {/*<Button*/}
                  {/*  variant="outlined"*/}
                  {/*  color="success"*/}
                  {/*  onClick={(e) => handleClickDeactive()}*/}
                  {/*>*/}
                  {/*  غیر فعال*/}
                  {/*  {open && (*/}
                  {/*    <ButtonModal*/}
                  {/*      open={open}*/}
                  {/*      setOpen={setOpen}*/}
                  {/*      active={stateActive}*/}
                  {/*      id={info.id}*/}
                  {/*      method={"deactivate_ipo"}*/}
                  {/*    />*/}
                  {/*  )}*/}
                  {/*</Button>*/}

                  {/*<ButtonDetails*/}
                  {/*  info={{*/}
                  {/*    title: "غیر فعال",*/}
                  {/*    className: "btnsRed",*/}
                  {/*    // modal: "AlertDialogSlide",*/}
                  {/*  }}*/}
                  {/*  onClick={() => handleClickAcitve()}*/}
                  {/*/>*/}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* {resultSubmit.map((info)=>(
                        <span>
                            {console.log("yessssss",info)}
                        </span>
                    ))} */}
        </Table>
        {/* <div className={classes.loadBtn}>
                            <Button color="primary" 
                            // onClick={()=>handleLoadBtn()}
                            >بارگذاری موارد بیشتر</Button>
                        </div> */}
      </TableContainer>
    </>
  );
};

export default Index;

const tableHead = [
  "ردیف",
  "نماد",
  "تاریخ عرضه ",
  "تاریخ شروع ثبت نام",
  "تاریخ پایان ثبت نام",
  "استانه مجاز قیمت",
  "حداکثر تعداد سهم قابل درخواست",
];
