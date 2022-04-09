import React, { useState } from 'react'

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditModal from "./../modal/editModal";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../common/method/handleNotificationAlert';

import RoomIcon from "@material-ui/icons/Room";


import { handeFilterForDate } from '../../../common/method/handeFilterForDate';
import { branches_update } from '../../../../redux/connect/branches_update';
import AlertDialogSlide from "../../../common/components/AlertDialogSlide";
import { branches_delete } from '../../../../redux/connect/branches_delete';
import { makeStyles } from '@material-ui/styles';

let useStyles = makeStyles({
    btns: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'nowrap'
    }
})


export default function Index({ index, pagnation, stateReducer, head, item, setflagApi }: any) {

    let classes = useStyles()
    const [flagEdite, setFlagEdite] = useState<any>(false)
    const [loading, setloading] = useState<any>(false)
    const [openAlert, setOpenAlert] = useState(false);


    const apiSubmitUpdate = (data: any) => {
        let { ...otherData }: any = data

        let _data = {
            ...otherData
        }
        setloading(true)

        branches_update(_data)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);
                if (!isOk) {
                    return;
                }
                setflagApi((prev: any) => !prev);
                setFlagEdite(false)
            })
            .catch(err => {
                handleNotificationAlertCatch();
            })
            .finally(() => {
                setloading(false)
            })
    }



    const apisubmitDelete = () => {


        setloading(true)

        branches_delete(item.id)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);
                if (!isOk) {
                    return;
                }
                setflagApi((prev: any) => !prev);
                setOpenAlert (false)
            })
            .catch(err => {
                handleNotificationAlertCatch();
            })
            .finally(() => {
                setloading(false)
            })
    }




    return (
        <>
            <TableRow key={index}>

                <TableCell align="center">
                    {pagnation.number !== 1
                        ? pagnation.number * stateReducer.size -
                        stateReducer.size +
                        (index + 1)
                        : index + 1}
                </TableCell>

                {
                    head
                        .filter((column: any, index: any) => index !== 0 && index < head.length - 1)
                        .map((column: any, index: any) => {

                            let value = item.body[column.title]

                            return (
                                <TableCell
                                    align="center"
                                    style={{ maxWidth: 200 }}
                                    key={index}
                                >
                                    {column.format ? column.format(value) : value}
                                </TableCell>
                            )
                        })
                }

                <TableCell className="colorInherit" align="center">
                    <div>
                        <a href={item.body['GoogleMapUrl']} target={'_blank'} rel=''>
                            <RoomIcon fontSize={"large"} />
                        </a>
                    </div>
                </TableCell>

                <TableCell align="center">
                    <div className={classes['btns']}>
                        <EditModal
                            modalEdit={flagEdite}
                            setmodalEdit={setFlagEdite}
                            data={item}
                            handleSubmitEdit={apiSubmitUpdate}
                            loading={loading}
                        />
                        <button className="btnsRed" onClick={() => setOpenAlert(true)}>حذف </button>
                    </div>

                </TableCell>

            </TableRow>

            {
                openAlert && (
                    <AlertDialogSlide
                        flagShow={openAlert}
                        handleCloseAlert={setOpenAlert}
                        handleOkAlert={apisubmitDelete}
                        data={dataAlertDialogSlide}
                    />

                )
            }

        </>
    )
}

const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟"
};
