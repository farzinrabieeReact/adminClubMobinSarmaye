import React, { useState, useEffect } from 'react'
import GiftAggregated from './GiftAggregated/index'
import ModuleSearchDate from './ModuleSearchDate/index';
import { useDispatch, useSelector } from "react-redux";
import { convertDigitToEnglish } from '../../../common/method/convertDigitToEnglish';
import { actionTypes } from '../../../../redux/gift/gift_select_aggregated';
import { actionTypes as actionTypesNotif } from '../../../../redux/notificationAlert';
import { handleNumber } from '../../../common/method/displayData';

interface Pagination {
    number: number;
    count: number;
}

let initState = {
    start_time: null,
    end_time: null,
};





export default function Index() {
    let flag = false;
    const dispatch = useDispatch();

    const [sort, setSort] = useState<any>({});
    const [state, setState] = useState<any>([]);
    const [date, setDate] = useState<any>(initState)
    const [stateTable, setStateTable] = useState<any>({});
    const [flagApi, setflagApi] = useState<boolean>(false);
    const [pagnation, setPagnation] = useState<Pagination>({ number: 1, count: 2 });

    const stateReducer = useSelector((state: any) => state.gift_select_aggregated_Reducer);

    const head = [
        {
            id: 1,
            label: "ردیف",
            title: null,
            active: true,
            type: "text",
            format: (data: any) => handleNull(data),
        },
        {
            id: 2,
            label: "نام و نام خانوادگی",
            title: "نام و نام خانوادگی",
            active: false,
            type: "text",
            format: (data: any) => handleNull(data),
        },
        {
            id: 3,
            label: "کد ملی",
            title: "کد ملی",
            active: false,
            type: "text",
            format: (data: any) => handleNull(data),
        },
        {
            id: 4,
            label: "کد تفصیلی",
            title: "کد تفصیلی",
            active: false,
            type: "text",
            format: (data: any) => handleNull(data),
        },
        {
            id: 5,
            label: "وضعیت",
            title: "وضعیت",
            active: false,
            type: "text",
            format: (data: any) => handleNumber(data),
        },
        {
            id: 6,
            label: "مجموع امتیاز",
            title: "مجموع امتیاز",
            active: false,
            type: "text",
            format: (data: any) => handleNumber(data),
        },

    ];

    const headDrawer = [
        ...head.filter((item) => item.label !== "ردیف"),
        {
            id: 7,
            label: "حداقل امتیاز",
            title: "حداقل امتیاز",
            active: false,
            type: "text",
            format: (data: any) => handleNull(data),
        },
        {
            id: 8,
            label: 'حداکثر امتیاز',
            title: "حداکثر امتیاز",
            active: false,
            type: "text",
            format: (data: any) => handleNull(data),
        },

    ]

    useEffect(() => {
        if (flag)
            apiSubmit();
        if (!flag)
            flag = true
        return () => {
            flag = false
            hendelRefreshReducer()
        }
    }, [flagApi])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (typeof stateReducer.data !== 'string')
            setState(stateReducer.dataFilter);
        setPagnation((prev: any) => ({
            ...prev,
            count: Math.ceil(stateReducer.total / stateReducer.size),
        }));
    }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


    const submitTable = () => {
        setPagnation({ number: 1, count: 0 });
        apiSubmit()
        // setflagApi((prev: any) => !prev)
    };

    const apiSubmit = () => {

        let obj: any = {};
        let filter: any = {};
        let { size } = stateReducer;
        let { id, ...sortRes }: any = sort;


        Object.keys(stateTable).forEach((element: any) => {
            if (stateTable[element]) {
                filter[element] = stateTable[element];
            }
        });

        //filter local data  
        if (Object.keys(filter).length || (stateReducer.data !== 'string' && stateReducer.data.length)) {
            dispatch({ type: actionTypes.giftSelectAggregatedFilter, payload: filter });
            return
        }

        let concatData = {
            ...date,
            ...stateTable
        }

        Object.keys(concatData).forEach((element: any) => {
            if (concatData[element]) {
                obj[element] = concatData[element];
            }
        });

        let _data = {
            data: handeData(obj, ['start_time', 'end_time']),
            // data:{start_time: "2021/10/23 00:00:00.000000", end_time: "2021/11/01 23:59:59.000000"},
            from: pagnation.number,
            size: size,
            sort_by: sortRes,
        };

        if (!_data.data['start_time'] || !_data.data['end_time']) {
            dispatch({
                type: actionTypesNotif.error,
                textAlert: "لطفا تمام مقادیر را وارد نمایید"
            });
            return
        }

        dispatch({ type: actionTypes.giftSelectAggregatedAsync, payload: _data });
    };


    const handelRefresh = () => {
        setSort({});
        setStateTable({});
        setPagnation({ number: 1, count: 0 });
        dispatch({ type: actionTypes.giftSelectAggregatedFilter, payload: {} });
        // setflagApi((prev: any) => !prev)
    }

    const hendelRefreshReducer = () => {
        setDate(initState)
        setSort({});
        setStateTable({});
        setPagnation({ number: 1, count: 0 });
        dispatch({ type: actionTypes.giftSelectClear });
    }

    const handleNull = (key: any) => {
        if (key === null || key === "" || key === "null") {
            return "_";
        } else {
            return key;
        }
    };

    return (
        <div>
            {
                typeof stateReducer.data === 'string' && (
                    <ModuleSearchDate
                        state={date}
                        setState={setDate}
                        stateReducer={stateReducer}
                        apiSelectGiftAggregated={apiSubmit}
                    />
                )
            }


            {
                typeof stateReducer.data !== 'string' && (
                    <GiftAggregated
                        date={date}
                        head={head}
                        sort={sort}
                        state={state}
                        flagApi={flagApi}
                        setSort={setSort}
                        pagnation={pagnation}
                        headDrawer={headDrawer}
                        handleNull={handleNull}
                        setflagApi={setflagApi}
                        stateTable={stateTable}
                        submitTable={submitTable}
                        setPagnation={setPagnation}
                        stateReducer={stateReducer}
                        setStateTable={setStateTable}
                        handelRefresh={handelRefresh}
                        hendelRefreshReducer={hendelRefreshReducer}
                    />
                )
            }


        </div>
    )
}



export const handeData = (state: any, array: any) => {

    let obj: any = {}
    let res: any = {}

    Object.keys(state).forEach((item) => {
        array.forEach((name: string) => {
            if (item === name) {
                if (name.includes('end_')) {
                    if (state[name])
                        obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 23:59:59.000000`
                } else {
                    if (state[name])
                        obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 00:00:00.000000`
                }
            } else {
                if (!obj[item])
                    obj[item] = state[item]
            }
        })
    })

    Object.keys(obj).forEach((element) => {
        if (obj[element]) {
            res[element] = obj[element];
        }
    });

    return res
}
