import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React, { useEffect, useState } from "react";
import { actionTypes as actionTypesContactId } from "../../../../../redux/formManager/contactUS/contactUs_select_id/index";
import { useDispatch, useSelector } from "react-redux";
import ButtonDelete from "./buttonDelete/ButtonDelete";
import ButtonEdit from "./buttonEdit/ButtonEdit";
import { Checkbox } from "@material-ui/core";
interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  setflagApi: any;
  setArrayId: any;
  arrayId: any;
  selectMultiRow: any;
  setSelectMultiRow: any;
}
let array: any = [];
export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  setflagApi,
  setArrayId,
  arrayId,
  selectMultiRow,
  setSelectMultiRow
}: elem) {
  const dispatch = useDispatch();

  // const handleChangeCheckboxBody = (e: any, item: any) => {
  //   if (e.target.checked) {
  //     // array.push(item.id);
  //     // setArrayId(array);
  //     setArrayId((prev: any) => [...prev, item.id]);
  //   } else {
  //     let arrayFilter = arrayId.filter((itm: any, ind: any) => itm !== item.id);
  //     setArrayId(arrayFilter);
  //   }
  // };
  const handleChangeCheckboxBody = (e: any, id: any): void => {
    if (selectMultiRow[id]) {
      let dataPrev = selectMultiRow;
      delete dataPrev[id];
      setSelectMultiRow(() => ({ ...dataPrev }));
    } else {
      setSelectMultiRow((prev: any) => ({ ...prev, [id]: true }));
    }
  };
  return (
    <TableRow key={index}>
      <TableCell>
        <Checkbox
          color="primary"
          disabled={item.body.member_id === "null" ? false : true}
          checked={
            item.body.member_id !== "null"
              ? false
              : selectMultiRow[item.id]
              ? selectMultiRow[item.id]
              : false
          }
          inputProps={{ "aria-label": "primary checkbox" }}
          // // inputProps={{
          //   "aria-labelledby": labelId
          // }}
          onChange={e => handleChangeCheckboxBody(e, item.id)}
        />
      </TableCell>
      <TableCell align="center">
        {pagnation.number !== 1
          ? pagnation.number * stateReducer.size -
            stateReducer.size +
            (index + 1)
          : index + 1}
      </TableCell>

      {head
        .filter(
          (column: any, index: any) => index !== 0 && index !== head.length
        )
        .map((column: any, index: any) => {
          let value = item.body[column.title];
          return (
            <TableCell align="center">
              {column.label === "ادمین"
                ? `${item.body.issuer_first_name} ${item.body.issuer_last_name}`
                : column.format
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      <TableCell align="center">
        <div>
          <ButtonEdit data={item} setflagApi={setflagApi} />
          <ButtonDelete data={item} setflagApi={setflagApi} />
        </div>
      </TableCell>
    </TableRow>
  );
}
