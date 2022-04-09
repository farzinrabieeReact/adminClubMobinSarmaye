import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ModalDetails from "../tableRow/buttonModal/ModalDetails";
import React, { useState } from "react";
import { actionTypes as actionTypesContactId } from "../../../../../redux/formManager/contactUS/contactUs_select_id/index";
import { useDispatch, useSelector } from "react-redux";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  setflagApi: any;
}

export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  
}: elem) {
  const dispatch = useDispatch();
  const [flagDetails, setFlagDetails] = useState(false);

  
  return (
    <TableRow key={index}>
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
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      <TableCell align="center">
        <button className="btnsGreen" onClick={e => setFlagDetails(true)}>
          جزئیات
        </button>
        <ModalDetails
          flagDetails={flagDetails}
          setFlagDetails={setFlagDetails}
          item={item}
        />
      </TableCell>
    </TableRow>
  );
}
