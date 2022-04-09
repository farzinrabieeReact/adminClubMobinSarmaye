import React from 'react'
import Excel from '../../../../../common/components/Excel'
import { useSelector } from 'react-redux';

interface elem {
    stateFilter: any,
    Head: any
}

export default function Index({ stateFilter, Head }: elem) {

    const stateReducerExcel = useSelector((state: any) => state.excel_select_reducer)

    let headerPrimary = Head.map((item: any) => {
        if (item.id === 1) {
            return {
                label: item.label,
                key: "row"
            }
        }

        return {
            label: item.label,
            key: item.title
        }
    })


    let headers = [
        ...headerPrimary ,
    ]


    const handleExcelData = () => {
        let { data } = stateReducerExcel
        let arr: any = []
        for (let i = 0; i < data.length; i++) {
            let obj: any = {}
            obj["row"] = i + 1
            for (let j = 0; j < Head.length; j++) {
                let value = data[i]["body"][Head[j]["title"]]
                let valueWithFormat = Head[j].format ? Head[j].format(value) : value
                if (Head[j].title) {
                    obj[Head[j].title] = valueWithFormat
                }
            }
            arr.push(obj)
        }
        return arr;
    };

    return (
        <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select_gifts"}
            tableApi={"gift"}
            filename={'select_gifts'}
            methodType2={null}
            valueTab={0}
        />
    )
}
