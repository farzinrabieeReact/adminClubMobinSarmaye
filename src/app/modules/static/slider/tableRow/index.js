import React from 'react'
import Buttons from './Buttons';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



export default function Index({ index, pagnation, stateReducer, head, item, setflagApi, state, _id , conditionData }) {

    let indexItem = pagnation.number !== 1
        ? pagnation.number * stateReducer.size -
        stateReducer.size +
        (index)
        : index


    return (
        <TableRow key={index}>

            <TableCell align="center">
                {pagnation.number !== 1
                    ? pagnation.number * stateReducer.size -
                    stateReducer.size +
                    (index + 1)
                    : index + 1}
            </TableCell>

            {
                head
                    .filter((column, index) => index !== 0 && index < head.length -2)
                    .map((column, index) => {

                        let value = item[column.title]

                        return (
                            <TableCell
                                align="center"
                                style={{ maxWidth: 200 }}
                            >
                                {column.format ? column.format(value) : value}
                            </TableCell>
                        )
                    })
            }

            <TableCell align="center">
                <Buttons
                    info={{
                        title: '',
                        className: 'btnsYellow',
                        modal: 'StatusSlider',
                        component: '',
                    }}
                    data={item}
                    index={indexItem}
                    conditionData={conditionData}
                    setflagApi={setflagApi}
                    state={state}
                    _id={_id}
                    stateReducer={stateReducer}

                />
            </TableCell>
            <TableCell align="center">
                <Buttons
                    info={{
                        title: '',
                        className: 'btnsYellow',
                        modal: 'ModalImage',
                        component: 'File',
                    }}
                    data={item.IMAGE_URI}
                    index={indexItem}
                    state={state}
                    _id={_id}
                    conditionData={conditionData}
 
                />
            </TableCell>
            <TableCell align="center">
                <Buttons
                    info={{
                        title: 'ویرایش',
                        className: 'btnsYellow',
                        modal: 'ModalEdite',
                    }}
                    data={item}
                    index={indexItem}
                    stateReducer={stateReducer}
                    setflagApi={setflagApi}
                    state={state}
                    _id={_id}
                    conditionData={conditionData}
                />
                <Buttons
                    info={{
                        title: 'حذف',
                        className: 'btnsRed',
                        modal: 'AlertDialogSlide'
                    }}
                    data={item}
                    index={indexItem}
                    stateReducer={stateReducer}
                    setflagApi={setflagApi}
                    state={state}
                    _id={_id}
                    conditionData={conditionData}
                />
            </TableCell>

        </TableRow>
    )
}
