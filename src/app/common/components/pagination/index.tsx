import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'conter',
        minHeight:50
    },
}));

interface Props{
    pagnation:number,
    setPagnation?:any,
    count:number
}

export default function PaginationRounded({ pagnation, setPagnation, count }:Props):any {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                 count >= 2 && (
                     <Pagination
                         count={count}
                         variant="outlined"
                         shape="rounded"
                         page={pagnation}
                         onChange={(event, page) => {
                             setPagnation(+page)
                         }}
                     />
                 )
            }
        </div>
    );
}

