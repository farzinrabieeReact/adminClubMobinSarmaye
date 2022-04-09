import React from 'react'
import Excel from '../../../../../../common/components/Excel'
import { useSelector } from 'react-redux';

interface elem {
    stateFilter: any,
    handleNull: any,
    CheckTrade_type: any,
    handelDate: any,
    checkIsin: any
}

export default function Index({ stateFilter, handleNull, CheckTrade_type, handelDate, checkIsin }: elem) {

    const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    const headers = [
        { label: "ردیف", key: "row" },
        { label: "تاریخ ثبت", key: "date_time" },
        { label: "نماد", key: "instrument_type" },
        { label: "قیمت", key: "average_price" },
        { label: "تعداد سهم	", key: "quantity" },
        { label: "نوع درخواست", key: "trade_type" },

    ];

    const handleExcelData = () => {

        let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {

            return {
                row: index + 1,
                date_time: handelDate(info.body.date_time),
                instrument_type: checkIsin(info.body.instrument_type),
                average_price: handleNull(info.body.average_price),
                quantity: handleNull(info.body.quantity),
                trade_type: CheckTrade_type(info.body.trade_type),

            };
        });

        return dataExcel;
    };

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select_aggregates"}
            tableApi={"order"}
            filename={'select_aggregates'}
            methodType2={null}
            valueTab={0}
        />
    )
}
