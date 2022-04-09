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
        { label: "ردیف", key: "row" },
        { label: "نام", key: "member_first_name" },
        { label: "نام خانوادگی", key: "member_last_name" },
        { label: "کد ملی", key: "member_national_id" },
        { label: "کد تفصیلی	", key: "member_account_code" },
        { label: "مجموع امتیاز", key: "sum_bonus" },
        { label: "مجموع مبلغ", key: "sum_amount" },
       
    ];

    const handleExcelData = () => {

        let dataExcel = state?.map((info: any, index: any) => {

            return {
                row: index + 1,
                member_first_name: handleNull(info.body.member_first_name),
                member_last_name: handleNull(info.body.member_last_name),
                member_national_id: handleNull(info.body.member_national_id),
                member_account_code: handleNull(info.body.member_account_code),
                sum_bonus: handleNull(info.body.sum_bonus),
                sum_amount: handleNull(info.body.sum_amount),
            };
        });
        
        return dataExcel;
    };

    let concatFilter = {...date }
    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={handeData(concatFilter, ['from_date', 'to_date'])}
            methodType={"online_charge_report"}
            tableApi={"onlinecharge"}
            filename={'online_charge_report'}
            methodType2={null}
            valueTab={0}
        />
    )
}
