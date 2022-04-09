import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core';
import { make_Styles } from './useStyles/index'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import InputsFilter from './inputs/index';
import CardNoData from './../cardNoData/index';
import Pagination from './../pagination/index';



const useStyles = make_Styles;


interface Thead {
    id: number,
    label: string,
    title: null | string,
    active: boolean,
    type: string,
    option?: Array<Option>,
    statusSort?:boolean
}

interface Option {
    title: string,
    value: string

}

interface StateSort {
    DEFAULT: string,
    ASC: string,
    DESC: string
}

interface Props {
    children?: any,
    head: Array<Thead>,
    filterTable: any,
    setFilterTable: any,
    sort?: { id: string, title: string } | any,
    setSort?: any,
    pagnation: { number: number, count: number },
    setPagnation: any,
    submitTable: any,
    height?:any
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
    height
}: Props) {

    const classes: any = useStyles();

    const stateSort: StateSort = {
        DEFAULT: "DEFAULT",
        ASC: "asc",
        DESC: "desc"
    }

    const [tableHead, setTableHead] = useState<Thead[]>(head);
    const [flaqFilter, setflaqFilter] = useState<boolean>(false)





    // type --------> text , checkbox , number , date , option
    // const head = [
    //     { id: 1, label: "ردیف", title: null, active: false, type: '' },
    // ];

    // const [state, setFilterTable] = useState<any>({})
    // const [sort, setSort] = useState<{ id: string, title: string } | any>({});
    // const [pagnation, setPagnation] = useState<{ number: number, count: number }>({ number: 1, count: 2 });


    const handelChangeState = (value: any, type: string) => {
        setFilterTable((prev: any) => (
            {
                ...prev,
                [type]: value
            }
        ))
    }
    const handleClickSort = (title: string, id: string,statusSort:any) => {
        if (!title || title === "null" || title === null || statusSort) {
            alert("امکان فیلتر این ستون وجود ندارد.")
            return
        }

        if (String(id) === sort['id']) {
            let findState = findStateSort(title)
            if (findState === stateSort.DEFAULT) {
                setSort({})
                return
            }
            setSort({ [title]: findState, id: id })
        } else {
            let res = tableHead.map((item: any) => item.id === +id ? { ...item, active: true } : { ...item, active: false })
            setTableHead(res)
            setSort({ [title]: stateSort.ASC, id:id })
        }
    }
    const findStateSort = (title: string) => {
        switch (sort[title]) {
            case stateSort.DEFAULT:
                return stateSort.ASC
            case stateSort.ASC:
                return stateSort.DESC
            case stateSort.DESC:
                return stateSort.DEFAULT
            default:
                return stateSort.DEFAULT
        }
    }
    const handelClearState = () => {

        if (head.length) {
            let obj: any = {}
            head.forEach((item: any) => {
                if (item.title === null) {
                    return
                }
                if (item.type === 'date') {
                    obj[item.title] = null
                    return
                }
                obj[item.title] = ''
            })
            setFilterTable(obj)
        }
    }
    const handelSubmit = () => {
        let date = {
            data: filterTable,
            sort: sort,
            pagnation: pagnation
        }
        submitTable(date)
    }

    useEffect(() => {
        // create dynamic object state 

        if (head.length) {

            let obj: any = {}

            head.forEach((item: any) => {
                if (item.title === null) {
                    return
                }
                obj[item.title] = ''
            })
            setFilterTable(obj)
        }

    }, [])//eslint-disable-line  react-hooks/exhaustive-deps

    useEffect(() => {
        submitTable()
    }, [pagnation.number])//eslint-disable-line  react-hooks/exhaustive-deps

    return (
        <div>
            <TableContainer className={height === "header" ?classes.tableContainerWithHeader : height === "tab" ? classes.tableContainerWithTab: height === null? classes.tableContainer:null} component={Paper}>
                <Table stickyHeader={true} className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHead?.map((item: any, index: any) => (
                                <TableCell
                                    key={index}
                                    className={classes.head}
                                    align="center"
                                    onClick={() => handleClickSort(String(item.title), String(item.id),item.statusSort)}
                                >
                                    {item.label}
                                    {
                                        item.active ? (
                                            <>
                                                {
                                                    item.title !== null && (
                                                        sort[item.title] === stateSort.ASC ?
                                                            <ArrowUpwardIcon />
                                                            : sort[item.title] === stateSort.DESC ?
                                                                <ArrowDownwardIcon />
                                                                :
                                                                <svg className={classes.boxEmpty}></svg>
                                                    )
                                                }
                                            </>
                                        ) :
                                            <svg className={classes.boxEmpty}></svg>
                                    }
                                </TableCell>
                            ))}
                            <TableCell align="center">
                                <SearchIcon className={classes['SearchIcon']} onClick={() => setflaqFilter((prev: any) => !prev)} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            flaqFilter && (
                                <TableRow className={classes['gridfilter']} >
                                    {
                                        tableHead?.map((item: any, index: any) =>
                                            <TableCell key={index} >
                                                <InputsFilter
                                                    data={item}
                                                    state={filterTable}
                                                    handelChangeState={handelChangeState}
                                                    handelSubmit={handelSubmit}
                                                    flag={head[index].active}
                                                />
                                            </TableCell>
                                        )
                                    }
                                    <TableCell align="center">
                                        <Box className={'d-flex justify-content-center'}>
                                            <Check className={classes['icon']} onClick={() => handelSubmit()} />
                                            <Close className={classes['icon']} onClick={() => handelClearState()} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                    <TableBody>
                        {
                            children
                                ? children
                                : (
                                    <TableRow >
                                        <TableCell className={classes['CardNoData']} >
                                            <CardNoData />
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes['pagnation']}>
                <Pagination
                    count={pagnation.count}
                    pagnation={pagnation.number}
                    setPagnation={(_data: any) => setPagnation((prev: any) => ({ ...prev, number: _data }))}
                />

            </div>
        </div>

    )
}
