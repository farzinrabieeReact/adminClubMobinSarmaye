import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonsTable from "./../buttonsTable";
import { Checkbox } from "@material-ui/core";

export default function Index({
  head,
  stateReducer,
  pagnation,
  setflagApi,
  item,
  index,
  selectMultiRow,
  setSelectMultiRow
}: any) {
  const handleChangeCheckboxBody = (id: any): void => {
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
          checked={selectMultiRow[item.id] ? selectMultiRow[item.id] : false}
          onChange={() => handleChangeCheckboxBody(item.id)}
          inputProps={{ "aria-label": "primary checkbox" }}
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
        .filter((column: any, ind: any) => ind !== 0 && ind !== head.length)
        .map((column: any, index: any) => {
          let value = item.body[column.title];
          return (
            <TableCell align="center" key={index}>
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}

      <TableCell
        className="colorInherit"
        // align="center"
        style={{
          minWidth: 300,
          display: "flex"
        }}
      >
        <ButtonsTable row={item} setflagApi={setflagApi} />
      </TableCell>
    </TableRow>
  );
}
