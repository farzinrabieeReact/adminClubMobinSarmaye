import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { handleNull } from '../../../common/method/displayData';
import ComponentCustomTable from "../../../common/components/componentCustomTable";
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, flowDisplay, StockTypeDisplay, IsActiveDisplay } from "./../../../../redux/stock/siteManagement"
import TableRow from "./tableRow/index";
import { siteManagementEdit_actions } from '../../../../redux/stock/siteManagement/edit/action';
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../common/method/handleNotificationAlert';
import LinearProgress from "@material-ui/core/LinearProgress";


import Header from "./header"
import { siteManagementInsert_actions } from '../../../../redux/stock/siteManagement/insert/action';


const useStyles = makeStyles(() => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        width: "100%",
        borderRadius: 8,
        margin: "15px auto 0 auto",
        display: "inline-block",
        overflow: "auto",
    },
    box: {
        width: "100%",
        margin: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        overflow: "auto",
    },
    stickyPagination: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        direction: "ltr",
    },
}))

interface Pagination {
    number: number;
    count: number;
}

export function StockManagementModule() {
    let classes = useStyles()
    const [stateTable, setStateTable] = useState<any>({});
    const [sort, setSort] = useState({});
    const [pagnation, setPagnation] = useState<Pagination>({
        number: 1,
        count: 2,
    });
    const [flagApi, setflagApi] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [loading, setloading] = useState<boolean>(false)
    const stateReducer = useSelector((state: any) => state.select_siteManagment_Reducer);

    useEffect(() => {
        apiSubmit();
    }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

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
            sort_by: sortRes,
        };

        dispatch({
            type: actionTypes.selectStockManegementAsync,
            payload: _data,
        });

    }

    useEffect(() => {
        setPagnation((prev: any) => ({
            ...prev,
            count: Math.ceil(stateReducer.total / stateReducer.size),
        }));
    }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


    let Head = [
        {
            id: 1,
            label: "ردیف",
            title: null,
            active: true,
            type: ""
        },
        {
            id: 2,
            label: "شناسه سهم",
            title: "isin",
            active: false,
            type: "text"
        },
        {
            id: 3,
            label: "شناسه اتوماسیون",
            title: "back_office_id",
            active: false,
            type: "text"
        },
        {
            id: 4,
            label: "نام مخفف",
            title: "short_name",
            active: false,
            type: "text"
        },

        {
            id: 5,
            label: "نام کامل",
            title: "full_name",
            active: false,
            type: "text",
            format: handleNull
        },
        {
            id: 6,
            label: "کد صنعت",
            title: "sector_code",
            active: false,
            type: "text",
            format: handleNull
        },
        {
            id: 7,
            label: "نام صنعت",
            title: "sector_name",
            active: false,
            type: "text",
            format: handleNull
        },
        {
            id: 8,
            label: "کد زیرگروه",
            title: "sub_sector_code",
            active: false,
            type: "text",
            format: handleNull
        },
        {
            id: 9,
            label: "بازار",
            title: "flow",
            active: false,
            type: "option",
            option: [
                { title: "بورس", value: "1" },
                { title: "فرابورس", value: "2" },
                { title: "پایه", value: "4" },
            ],
            format: (value: string) => flowDisplay(value)
        },
        {
            id: 10,
            label: "نوع سهام",
            title: "stock_type",
            active: false,
            type: "option",
            option: [
                { title: "تسهیلات مسکن", value: "MORTGAGE" },
                { title: "صندوق قابل معامله", value: "ETF" },
                { title: "اوراق قرضه", value: "BOND" },
                { title: "اختیار", value: "OPTION" },
                { title: "فرابورس", value: "IFB" },
                { title: "بورس", value: "TSE" },
                { title: "آتی", value: "FUTURE" },
                { title: "انرژی", value: "ENERGY" },
                { title: "کالا", value: "IME" },
            ],
            format: (value: string) => StockTypeDisplay(value)
        },
        {
            id: 11,
            label: "وضعیت",
            title: "is_active",
            active: false,
            type: "option",
            option: [
                { title: "فعال", value: "TRUE" },
                { title: "غیرفعال", value: "FALSE" },
            ],
            format: (value: string) => IsActiveDisplay(value)
        }
    ];

    const submitTable = () => {
        setPagnation({ number: 1, count: 0 });
        setflagApi((prev: any) => !prev);
    };

    const handleSubmitEdit = (data: {}) => {
        setloading(true)
        siteManagementEdit_actions(data)
            .then((res: any) => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    setflagApi((prev: any) => !prev)
                }
            })
            .catch(() => {
                handleNotificationAlertCatch()
            })
            .finally(() => {
                setloading(false)
            })
    }

    const handelRefresh = () => {
        setSort({});
        setStateTable({});
        setPagnation({ number: 1, count: 0 });
        setflagApi((prev: any) => !prev)
    }

    const handleSubmitInsert = (data: {}) => {
        setloading(true)
        siteManagementInsert_actions(data)
            .then((res: any) => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    setflagApi((prev: any) => !prev)
                }
            })
            .catch(() => {
                handleNotificationAlertCatch()
            })
            .finally(() => {
                setloading(false)
            })
    }


    return (
        <div
            className={classes.root}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    stateTable={stateTable}
                    setStateTable={setStateTable}
                    Head={Head}
                    submitTable={submitTable}
                    handelRefresh={handelRefresh}
                    handleSubmitInsert={handleSubmitInsert}
                />
            </Box>

            <Box height={4}>
                {
                    (loading || stateReducer.loading) && (
                        <LinearProgress />
                    )
                }
            </Box>

            < ComponentCustomTable
                height={"tab"}
                head={Head}
                filterTable={stateTable}
                setFilterTable={setStateTable}
                sort={sort}
                setSort={setSort}
                pagnation={pagnation}
                setPagnation={setPagnation}
                submitTable={submitTable}
                setflagApi={setflagApi}
                stateReducer={stateReducer}
            >
                {
                    stateReducer.data
                        .map((item: any, index: number) => (
                            <TableRow
                                handleSubmitEdit={handleSubmitEdit}
                                pagnation={pagnation}
                                stateReducer={stateReducer}
                                head={Head}
                                item={item}
                                index={index}
                                key={index}
                            />
                        ))
                }
            </ComponentCustomTable>
        </div >
    )
}
