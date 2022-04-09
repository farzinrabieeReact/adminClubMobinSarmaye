import React from 'react'
import Excel from '../../../../common/components/Excel'
import { useSelector } from 'react-redux';

interface elem {
    stateFilter: any,
    handleNull: any,
    findRoll: any,
    handelDate:any
}

export default function Index({ stateFilter, handleNull, findRoll , handelDate }: elem) {

    const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    const headers = [
        { label: "ردیف", key: "row" },
        { label: "عنوان", key: "bonus_type_name" },
        { label: "مقدار", key: "value" },
        { label: "نوع", key: "is_removed" },
        { label: "تاریخ	", key: "date_time" },
       
    ];

    const handleExcelData = () => {

        let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {

            return {
                row: index + 1,
                bonus_type_name: handleNull(info.body.bonus_type_name),
                value: handleNull(info.body.value),
                is_removed: findRoll(info.body.is_removed).value,
                date_time: handelDate(info.body.date_time),
            };
        });
        
        return dataExcel;
    };

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select_aggregated_bonus"}
            tableApi={"bonus"}
            filename={'select_aggregated_bonus'}
            methodType2={null}
            valueTab={0}
        />
    )
}
