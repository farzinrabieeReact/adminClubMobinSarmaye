import React from 'react'
import Excel from '../../../../common/components/Excel'
import { useSelector } from 'react-redux';

interface elem {
    stateFilter: any,
    handleNull: any,
    findRoll: any
}

export default function Index({ stateFilter, handleNull, findRoll }: elem) {

    const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    const headers = [
        { label: "ردیف", key: "row" },
        { label: "نام", key: "first_name" },
        { label: "نام خانوادگی", key: "last_name" },
        { label: "کدملی", key: "national_id" },
        { label: "نقش	", key: "category" },
        { label: "موبایل", key: "phone" },
        { label: "ایمیل", key: "email" },
        { label: "کد معرفی", key: "automation_id" },
        { label: "امتیاز", key: "available_bonus" },
    ];

    const handleExcelData = () => {

        let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {

            return {
                row: index + 1,
                first_name: handleNull(info.body.first_name),
                last_name: handleNull(info.body.last_name),
                national_id: handleNull(info.body.national_id),
                category: findRoll(info.body.category).value,
                phone: handleNull(info.body.phone),
                email: handleNull(info.body.email),
                automation_id: handleNull(info.body.automation_id),
                available_bonus: handleNull(info.body.available_bonus),
            };
        });
        
        return dataExcel;
    };

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select"}
            tableApi={"clubmember"}
            filename={'clubmember_select'}
            methodType2={null}
            valueTab={0}
        />
    )
}
