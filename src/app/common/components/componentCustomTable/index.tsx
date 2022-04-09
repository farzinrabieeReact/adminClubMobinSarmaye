import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { make_Styles } from "./useStyles/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SearchIcon from "@material-ui/icons/Search";
import { Checkbox } from "@material-ui/core";

import InputsFilter from "./inputs/index";
import CardNoData from "./../cardNoData/index";
import Pagination from "./../pagination/index";

const useStyles = make_Styles;

interface Thead {
  id: number;
  label: string;
  title: null | string;
  active: boolean;
  type: string;
  option?: Array<Option>;
  statusSort?: boolean;
}

interface Option {
  title: string;
  value: string;
}

interface StateSort {
  DEFAULT: string;
  ASC: string;
  DESC: string;
}

interface Props {
  children?: any;
  head: Array<Thead>;
  filterTable: any;
  setFilterTable: any;
  sort?: { id: string; title: string } | any;
  setSort?: any;
  pagnation: { number: number; count: number };
  setPagnation: any;
  submitTable: any;
  height?: any;
  setflagApi: any;
  selectMultiRow?: any;
  setSelectMultiRow?: any;
  stateReducer?: any;
  disable?: boolean;
  loading?: boolean;
}

export default function Index({
  children,
  head,
  filterTable,
  setFilterTable,
  sort,
  setSort,
  pagnation,
  setPagnation,
  submitTable,
  height,
  setflagApi,
  disable,
  loading,
  selectMultiRow,
  setSelectMultiRow,
  stateReducer
}: Props) {
  const classes: any = useStyles();

  const stateSort: StateSort = {
    DEFAULT: "DEFAULT",
    ASC: "asc",
    DESC: "desc"
  };

  const [tableHead, setTableHead] = useState<Thead[]>(head);
  const [flaqFilter, setflaqFilter] = useState<boolean>(false);

  const handelChangeState = (value: any, type: string) => {
    setFilterTable((prev: any) => ({
      ...prev,
      [type]: value
    }));
  };
  const handleClickSort = (title: string, id: string, statusSort: any) => {
    if (!title || title === "null" || title === null || statusSort) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (String(id) === sort["id"]) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort({});
      } else {
        setSort({ [title]: findState, id: id });
      }
    } else {
      let res = tableHead.map((item: any) =>
        item.id === +id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHead(res);
      setSort({ [title]: stateSort.ASC, id: id });
    }

    setflagApi((prev: any) => !prev);
  };
  const findStateSort = (title: string) => {
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
  const handelClearState = () => {
    if (head.length) {
      let obj: any = {};
      head.forEach((item: any) => {
        if (item.title === null) {
          return;
        }
        if (item.type === "date") {
          obj[item.title] = null;
          return;
        }
        obj[item.title] = "";
      });
      setFilterTable(obj);
    }
  };
  const handelSubmit = () => {
    let date = {
      data: filterTable,
      sort: sort,
      pagnation: pagnation
    };
    submitTable(date);
  };
  const handelPagnation = (_data: any) => {
    setPagnation((prev: any) => ({ ...prev, number: _data }));
    setflagApi((prev: any) => !prev);
  };

  useEffect(() => {
    // create dynamic object state

    if (head.length) {
      let obj: any = {};

      head.forEach((item: any) => {
        if (item.title === null) {
          return;
        }
        obj[item.title] = "";
      });
      setFilterTable(obj);
    }
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  const handleChangeCheckboxHead = (e: any): void => {
    if (e.target.checked) {
      let obj: any = {};
      stateReducer.data.forEach((item: any) => {
        obj[item.id] = true;
      });

      setSelectMultiRow(obj);
    } else {
      setSelectMultiRow({});
    }
  };

  return (
    <div>
      <TableContainer
        className={
          height === "header"
            ? classes.tableContainerWithHeader
            : height === "tab"
            ? classes.tableContainerWithTab
            : height === null
            ? classes.tableContainer
            : height
            ? height
            : null
        }
        component={Paper}
      >
        <Table
          stickyHeader={true}
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {selectMultiRow && (
                <TableCell className={classes.head} align="center">
                  <Checkbox
                    checked={
                      Object.keys(selectMultiRow).length ===
                      stateReducer.data.length
                        ? true
                        : false
                    }
                    onChange={handleChangeCheckboxHead}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
              )}
              {tableHead?.map((item: any, index: any) => (
                <TableCell
                  key={index}
                  className={classes.head}
                  align="center"
                  onClick={() =>
                    handleClickSort(
                      String(item.title),
                      String(item.id),
                      item.statusSort
                    )
                  }
                >
                  {item.label}
                  {item.active ? (
                    <>
                      {item.title !== null &&
                        (sort[item.title] === stateSort.ASC ? (
                          <ArrowUpwardIcon />
                        ) : sort[item.title] === stateSort.DESC ? (
                          <ArrowDownwardIcon />
                        ) : (
                          <svg className={classes.boxEmpty}></svg>
                        ))}
                    </>
                  ) : (
                    <svg className={classes.boxEmpty}></svg>
                  )}
                </TableCell>
              ))}
              <TableCell align="center">
                <SearchIcon
                  className={`${disable ? "disabledItems" : ""} ${
                    classes["SearchIcon"]
                  }`}
                  onClick={() => {
                    if (disable) {
                      return;
                    }
                    setflaqFilter((prev: any) => !prev);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flaqFilter && (
              <TableRow className={classes["gridfilter"]}>
                {selectMultiRow && <TableCell align="center"></TableCell>}
                {tableHead?.map((item: any, index: any) => (
                  <TableCell key={index}>
                    <InputsFilter
                      data={item}
                      state={filterTable}
                      handelChangeState={handelChangeState}
                      handelSubmit={handelSubmit}
                      flag={head[index].active}
                    />
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Box className={"d-flex justify-content-center"}>
                    <Check
                      className={classes["icon"]}
                      onClick={() => handelSubmit()}
                    />
                    <Close
                      className={classes["icon"]}
                      onClick={() => handelClearState()}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableBody>
            {children.length ? (
              children
            ) : (
              <TableRow>
                <TableCell className={classes["CardNoData"]}>
                  <CardNoData text={loading ? "در حال بارگذاری..." : null} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes["pagnation"]}>
        {children.length !== 0 && (
          <>
            <Pagination
              count={pagnation.count}
              pagnation={pagnation.number}
              setPagnation={(_data: any) => handelPagnation(_data)}
            />
          </>
        )}
      </div>
    </div>
  );
}
