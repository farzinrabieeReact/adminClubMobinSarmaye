import React, { useState, useEffect } from "react";
import Table from '../../../common/components/customTable/index';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from './../../../../redux/notify/select_nofify';
import { dateMiladiToShamsi } from "../../../common/method/date";
import Header from "./header";
import CardNodate from './../../../common/components/cardNoData';
import { sepratePriceFromComma } from './../../../common/method/seprateNumberFromComma';

import { actionTypes as actionSummaries } from './../../../../redux/summaries';
import { actionTypes as actionClubmember } from './../../../../redux/clubmember/clubmember_select_common';
import { actionTypes as actionProtfolio } from "./../../../../redux/stock/select_portfolio_daily";
import { actionTypes as actionStockDetails } from './../../../../redux/stock/select_stock_details';

import { makeStyles } from "@material-ui/core";


interface Pagination {
    number: number,
    count: number
}



export default function Index() {

    const dispatch = useDispatch();

    const [national_id, setNational_id] = useState("");


    const stateReducer = useSelector((state: any) => state.select_notify_reducer);
    const summariesReducer = useSelector((state: any) => state.select_summaries_Reducer);
    const clubmemberReducer = useSelector((state: any) => state.club_member_Reducer);
    const portfolioDailyReducer = useSelector((state: any) => state.select_portfolio_daily_reducer);
    const stockDetailsReducer = useSelector((state: any) => state.select_stock_details_reducer);

    const head = [
        // { id: 1, label: "ردیف", title: null, active: false, type: '' },
        { id: 2, label: "شناسه نماد", title: "name", active: false, type: 'text' },
        { id: 3, label: "پرتفوی سپرده گذاری", title: "sender_last_name", active: false, type: 'text' },
        { id: 4, label: "پرتفوی لحظه ای", title: "source", active: false, type: 'text' },
        { id: 5, label: "قیمت آخرین معامله (ریال)", title: "receiver_id", active: false, type: 'text' },
        { id: 6, label: "سفارشات باز (خرید - فروش)", title: "state", active: false, type: 'text' },
        { id: 7, label: "میانگین قیمت خرید امروز", title: "type", active: false, type: 'text', },
        { id: 8, label: "میانگین قیمت فروش امروز", title: "start_time", active: true, type: 'text' },
        { id: 9, label: "مجموع خرید امروز", title: "end_time", active: true, type: 'text' },
        { id: 10, label: "مجموع فروش امروز", title: "end_time", active: true, type: 'text' },
        { id: 11, label: "ارزش پرتفوی سپرده گذاری (ریال)", title: "end_time", active: true, type: 'text' },
        { id: 12, label: "ارزش پرتفوی لحظه‌ای (ریال)", title: "end_time", active: true, type: 'text' },
    ];

    const [sort, setSort] = useState({});
    const [stateTable, setStateTable] = useState<any>({})
    const [pagnation, setPagnation] = useState<Pagination>({ number: 1, count: 2 });
    const [state, setstate] = useState<any>([])
    const [flag, setflag] = useState<boolean>(false)


    const submitTable = () => {
        // apiSubmit()
    }

    const apiSubmit = () => {
        let obj: any = {};
        let { size } = stateReducer;
        let { id, ...sortRes }: any = sort;

        Object.keys(stateTable).forEach((element: any) => {
            if (stateTable[element]) {
                obj[element] = stateTable[element];
            }
        });

        let _data = {
            data: obj,
            from: pagnation.number,
            size: size,
            sort_by: sortRes
        }

        dispatch({ type: actionTypes.selectNotifyAsync, payload: _data })

    };

    const apiSummaries = (data: any) => {
        dispatch({ type: actionSummaries.selectSummariesAsync, payload: data })
    }

    const apiClubmember = (data: any) => {

        dispatch({ type: actionProtfolio.selectPortfolioDailyempty })
        dispatch({ type: actionStockDetails.selectStockDetailsEmpty })

        dispatch({ type: actionClubmember.clubmemberSelectAsync, payload: data })
    }

    const apiPortfolioDaily = (data: any) => {
        dispatch({ type: actionProtfolio.selectPortfolioDailyAsync, payload: data })
    }


    useEffect(() => {
        setstate(stateReducer.data)
        setPagnation((prev: any) => ({ ...prev, count: Math.ceil(stateReducer.total / stateReducer.size) }))
    }, [stateReducer])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (flag) {
            apiSubmit()
        } else {
            setflag(true)
        }
    }, [sort])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {

        if (!summariesReducer.data.length) {
            let data = {
                data: null
            }
            apiSummaries(data)
        }

    }, [])//eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        if (clubmemberReducer.data.length > 0) {
            let data = {
                data: {
                    member_id: clubmemberReducer.data[0].id
                }
            }
            apiPortfolioDaily(data)

        }
    }, [clubmemberReducer])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {

        let flag = portfolioDailyReducer.data[0]

        if (flag) {
            let data = {
                arrayIsin: Object.keys(portfolioDailyReducer.data[0].body.customer_stock_portfolio)
            }
            dispatch({ type: actionStockDetails.selectStockDetailsAsync, payload: data })
            return
        }

        dispatch({ type: actionStockDetails.selectStockDetailsEmpty })

    }, [portfolioDailyReducer])


    return (
        <>
            <Header
                national_id={national_id}
                setNational_id={setNational_id}
                apiClubmember={apiClubmember}
                member_id={clubmemberReducer.data}
            />
    
                <Table
                    height={"header"}
                    head={head}
                    filterTable={stateTable}
                    setFilterTable={setStateTable}
                    sort={sort}
                    setSort={setSort}
                    pagnation={pagnation}
                    setPagnation={setPagnation}
                    submitTable={submitTable}
                >
                    {
                        portfolioDailyReducer.data[0] && (
                            <>
                                {
                                    Object.keys(portfolioDailyReducer.data[0].body.customer_stock_portfolio)
                                        .map((item: any, index: any) => {

                                            let data = portfolioDailyReducer.data[0].body.customer_stock_portfolio[item]
                                            let price = stockDetailsReducer.data[data.SymbolISIN]?.results[0]?.body?.last_price

                                            return (
                                                <TableRow key={index} >
                                                    <TableCell align='center' >
                                                        {
                                                            summariesReducer.isinJson[item]
                                                                ? summariesReducer.isinJson[item]
                                                                : item
                                                        }
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {data.CSDCount}
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {data.CurrentCount}
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {
                                                            stockDetailsReducer.data[data.SymbolISIN]

                                                                ? sepratePriceFromComma(price)
                                                                : "-"
                                                        }
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <p style={{ color: "green" }}>
                                                                {data.OnBoardBuy}-
                                                        </p>
                                                            <p style={{ color: "red" }}>{data.OnBoardSell}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {sepratePriceFromComma(data.AverageBuyPrice)}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {sepratePriceFromComma(data.AverageSellPrice)}
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {sepratePriceFromComma(data.TotalQuantityBuy)}
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {sepratePriceFromComma(data.TotalQuantitySell)}
                                                    </TableCell>
                                                    <TableCell align='center' >

                                                        {sepratePriceFromComma(
                                                            data.CSDCount * price
                                                                ? data.CSDCount * price
                                                                : 0
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center' >
                                                        {

                                                            sepratePriceFromComma(
                                                                data.CurrentCount * price
                                                                    ? data.CurrentCount * price
                                                                    : 0
                                                            )
                                                        }
                                                    </TableCell>

                                                </TableRow>
                                            )
                                        })
                                }
                            </>
                        )
                    }
                </Table>

         
        </>
    );
}

