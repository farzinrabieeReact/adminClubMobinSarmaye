import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import ButtonModal from "../buttonModal/ButtonModal";
import { number } from "prop-types";
import { prepareDataForValidation } from "formik";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  categotyFAQ: any;
  stateReducerCategory: any;
  setDataEdit: any;
  DataEdit: any;
  setflagApi: any;
}
export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  categotyFAQ,
  stateReducerCategory,
  setDataEdit,
  DataEdit,
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
    setDataEdit((prev: any) => {
      return {
        ...prev,
        ["category"]: item.body.category,
        ["question"]: item.body.question,
        ["answer"]: item.body.answer
      };
    });
  };

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
        {/*<ButtonDetails*/}
        {/*    info={{*/}
        {/*        title: "ویرایس",*/}
        {/*        color: "primary",*/}
        {/*        modal: "ModalDetails",*/}
        {/*    }}*/}
        {/*    data={item}*/}
        {/*/>*/}
        <div style={{ display: "flex" }}>
          <button
            className="btnsYellow"
            onClick={() => handleClickModal(1, item)}
          >
            ویرایش
          </button>
          <button className="btnsRed" onClick={() => handleClickModal(2, item)}>
            حذف
          </button>
        </div>
        <ButtonModal
          DataEdit={DataEdit}
          setDataEdit={setDataEdit}
          stateReducerCategory={stateReducerCategory}
          selected={selected}
          handleButton={handleButton}
          selectedItem={selectedItem}
          categotyFAQ={categotyFAQ}
          tableBodyData={tableBodyData}
          flagEdit={flagEdit}
          setFlagEdit={setFlagEdit}
          setflagApi={setflagApi}
        />
      </TableCell>
    </TableRow>
  );
}
