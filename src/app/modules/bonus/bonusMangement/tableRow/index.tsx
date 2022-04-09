import React from 'react'

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



export default function Index({ index, pagnation, stateReducer, head, item, setflagApi }:any) {

    let indexItem = pagnation.number !== 1
        ? pagnation.number * stateReducer.size -
        stateReducer.size +
        (index )
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
                    .filter((column:any, index:any) => index !== 0 && index !== head.length)
                    .map((column:any, index:any) => {
                  
                        let value = item.body[column.title]
                  
                        return (
                            <TableCell
                                align="center"
                                style={{ maxWidth: 200 }}
                                key={index}
                            >
                                {column.format ? column.format(value) : value}
                            </TableCell>
                        )
                    })
            }

            <TableCell align="center">

            </TableCell>

        </TableRow>
    )
}
