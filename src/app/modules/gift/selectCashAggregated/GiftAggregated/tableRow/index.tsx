import React from 'react'


import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from '@material-ui/styles';

interface elem {
    pagnation: any;
    index: any;
    stateReducer: any;
    head: any;
    item: any
}

let useStyles = makeStyles({
    success: {
        width: 100,
        backgroundColor: 'rgba(0,255,0,0.3)'
    },
    danger: {
        backgroundColor: 'rgba(255,0,0,0.3)'
    }
})

export default function Index({ index, pagnation, stateReducer, head, item }: elem) {

    let classes = useStyles();

    const handelColorIsRemoved = (flag: any) => {
        if (flag === 'TRUE') {
            return classes['danger']
        }
        if (flag === 'FALSE') {
            return classes['success']
        }
    }

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
                    .filter((column: any, index: any) => index !== 0 && index !== head.length)
                    .map((column: any, index: any) => {
                        let value = item.body[column.title]
                        return (
                            <TableCell
                                align="center"
                                style={{ maxWidth: 200 }}
                                className={`${column.title === 'is_removed' ? handelColorIsRemoved(value) : ''}`}
                            >
                                {column.format ? column.format(value) : value}
                            </TableCell>
                        )
                    })
            }

            <TableCell align="center"> </TableCell>

        </TableRow>
    )
}
