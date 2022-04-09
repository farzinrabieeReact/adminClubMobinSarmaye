import React from 'react'
import { Box } from '@material-ui/core'
import Excel from './excel/index';
import Drawer from '../../../../common/components/drawer';
import RefreshIcon from '@material-ui/icons/Refresh';
import { handleNull, handleNumber } from '../../../../common/method/displayData';
import { dateMiladiToShamsi } from '../../../../common/method/date';



export default function Header({ stateTable, setStateTable, Head, submitTable, handelRefresh }: any) {

    const otherHeadForExel = [
        {
            id: 6,
            label: "امتیاز مورد نیاز",
            title: "required_bonus",
            active: false,
            type: "text",
            format: handleNumber
        },
        {
            id: 7,
            label: "ظرفیت",
            title: "remained_capacity",
            active: false,
            type: "text",
            format: handleNumber
        },
        {
            id: 8,
            label: "عنوان",
            title: "title",
            active: false,
            type: "text",
            format: handleNull
        },
        {
            id: 9,
            label: "تاریخ انقضا",
            title: "expiration_time",
            active: false,
            type: "text",
            format: dateMiladiToShamsi
        },
        {
            id: 10,
            label: "اتوماتیک",
            title: "is_physical",
            active: false,
            type: "text",
            format: (value: any) => {
                if (value === "TRUE") return "نمی باشد"
                return "می باشد"
            }
        },
        {
            id: 11,
            label: "نام جایزه",
            title: "name",
            active: false,
            type: "text",
            format: handleNull
        },
    ]


    return (
        <Box display="flex" justifyContent="end">
            <Excel
                stateFilter={stateTable}
                Head={[...Head, ...otherHeadForExel]}
            />

            <Drawer
                children={null}
                tableHead={Head}
                stateFilter={stateTable}
                setStateFilter={setStateTable}
                apiSubmit={() => submitTable()}
            />

            <RefreshIcon style={{ height: "auto", fontSize: 25, marginRight: 20, cursor: "pointer" }} onClick={() => handelRefresh()} />
        </Box>
    )
}
