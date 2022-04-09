import React from 'react'
import Excel from '../../../../../../common/components/Excel'
import { useSelector } from 'react-redux';

interface elem {
    stateFilter: any,
    handleNull: any,
    CheckTrade_type: any,
    handelDate: any,
    checkIsin: any,
    handelIsOnline: any,
    handelIsCanceled: any,
}

export default function Index({ stateFilter, handleNull, CheckTrade_type, handelDate, checkIsin , handelIsOnline , handelIsCanceled }: elem) {

    const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    const headers = [
        { label: "ردیف", key: "row" },
        { label: "کد معاملاتی", key: "account" },
        { label: "تاریخ ثبت", key: "back_office_insert_date_time" },
        { label: "نماد", key: "instrument_id" },
        { label: "وضعیت درخواست", key: "is_canceled" },
        { label: "منبع درخواست", key: "is_online" },
        { label: "قیمت", key: "price" },
        { label: "تعداد سهم", key: "quantity" },
        { label: "نوع درخواست", key: "trade_type" },
        { label: "مقدار", key: "value" },

    ];

    const handleExcelData = () => {

        let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {

            return {
                row: index + 1,
                account: handleNull(info.body.account),
                back_office_insert_date_time: handelDate(info.body.back_office_insert_date_time),
                instrument_id: checkIsin(info.body.instrument_id),
                is_online: handelIsOnline(info.body.is_online , true),
                is_canceled: handelIsCanceled(info.body.is_canceled , true),
                price: handleNull(info.body.price),
                quantity: handleNull(info.body.quantity),
                trade_type: CheckTrade_type(info.body.trade_type),
                value:handleNull(info.body.value),
            };
        });

        return dataExcel;
    };

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select_details"}
            tableApi={"order"}
            filename={'select_details'}
            methodType2={null}
            valueTab={0}
        />
    )
}
