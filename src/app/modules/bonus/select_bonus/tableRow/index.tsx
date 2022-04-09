import React, { useState } from "react";
import { number } from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonModal from "../../../content/faq/buttonModal/ButtonModal";

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

  setflagApi
}: elem) {
  const [flagEdit, setFlagEdit] = useState(false);
  const [tableBodyData, setTableBody] = useState([]);
  const [selectedItem, setSelectedItem] = useState([false, null]);
  const [handleButton, setHandleButton] = useState(1);
  const [selected, setSelected] = useState();
  const handleClickModal = (id: number, item: any) => {
    setFlagEdit(prevState => !prevState);
    setHandleButton(id);
    setSelected(item);
  };
  const findBackgroundColor = (type: any) => {
    return {
      backgroundColor: type.includes("REMOVE_")
        ? "rgba(255,0,0,0.1)"
        : "rgba(0,255,0,0.1)"
    };
  };

  return (
    <>
      <TableRow key={index} style={findBackgroundColor(item.body.bonus_type)}>
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
          {/*<ButtonDetails*/}
          {/*    info={{*/}
          {/*        title: "ویرایس",*/}
          {/*        color: "primary",*/}
          {/*        modal: "ModalDetails",*/}
          {/*    }}*/}
          {/*    data={item}*/}
          {/*/>*/}
        </TableCell>
      </TableRow>
    </>
  );
}
