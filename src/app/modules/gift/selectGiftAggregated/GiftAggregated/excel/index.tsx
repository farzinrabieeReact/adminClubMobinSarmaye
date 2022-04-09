import React from 'react'
import Excel from '../../../../../common/components/Excel'
// import { useSelector } from 'react-redux';
import {handeData} from './../../index';



interface elem {
    stateFilter: any,
    handleNull: any,
    date:any,
    state:any
}

export default function Index({ stateFilter, handleNull , date , state }: elem) {

    // const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    const headers = [
        { label: "ردیف", key: "ردیف" },
        { label: "نام و نام خانوادگی", key: "نام و نام خانوادگی" },
        { label: "کد ملی", key: "کد ملی" },
        { label:  "کد تفصیلی", key:  "کد تفصیلی" },
        { label:  "مجموع امتیاز", key:  "مجموع امتیاز" },
    ];

    const handleExcelData = () => {

        let dataExcel = state?.map((info: any, index: any) => {

            return {
                "ردیف": index + 1,
                "نام و نام خانوادگی": handleNull(info.body["نام و نام خانوادگی"]),
                "کد ملی": handleNull(info.body["کد ملی"]),
                "کد تفصیلی": handleNull(info.body[ "کد تفصیلی"]),
                "مجموع امتیاز": handleNull(info.body[ "مجموع امتیاز"]),
            };
        });
        
        return dataExcel;
    };

    let concatFilter = {...date }
    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={handeData(concatFilter, ['start_time', 'end_time'])}
            methodType={"select_aggregated_user_registrations"}
            tableApi={"gift"}
            filename={'select_aggregated_user_registrations'}
            methodType2={null}
            valueTab={0}
        />
    )
}
