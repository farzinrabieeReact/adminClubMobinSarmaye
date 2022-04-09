import React, { useState } from 'react'

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonDetails from './../modal/buttonDetails/ButtonDetails';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditModal from "./../modal/editModal";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../common/method/handleNotificationAlert';
import AlertDialogSlide from '../../../../common/components/AlertDialogSlide';
import { CircularProgress } from '@material-ui/core';

import { update_signal_document_dispatch } from '../../../../../redux/signalHafez/signals/update_signals';
import { active_signals_dispatch } from '../../../../../redux/signalHafez/signals/active_signals';
import { deactivate_signals_dispatch } from '../../../../../redux/signalHafez/signals/deactive_signals';
import { handeFilterForDate } from '../../../../common/method/handeFilterForDate';



export default function Index({ index, pagnation, stateReducer, head, item, setflagApi }: any) {

    const [flagEdite, setFlagEdite] = useState<any>(false)
    const [loading, setloading] = useState<any>(false)
    const [alertActive, setalertActive] = useState<any>([false, null])
    const [alertdeactive, setalertdeactive] = useState<any>([false, null])

    const handleSubmitEdit = (data: any) => {

        let { is_active, ...otherData }: any = data

        let _data = {
            ...otherData
        }
        setloading(true)

        update_signal_document_dispatch(
            typeof _data.insert_date_time !== 'string'
                ? handeFilterForDate(
                    _data,
                    ['insert_date_time'],
                    []
                )
                : _data
        )
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

    const handleOkAlertActive = (id: any) => {

        let _data = {
            _id: id
        }

        setloading(true)

        active_signals_dispatch(_data)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);
                if (!isOk) {
                    return;
                }
                setflagApi((prev: any) => !prev);
                setalertActive([false, null])
            })
            .catch(err => {
                handleNotificationAlertCatch();
            })
            .finally(() => {
                setloading(false)
            })
    }

    const handleOkAlertDeactive = (id: any) => {

        let _data = {
            _id: id
        }

        setloading(true)

        deactivate_signals_dispatch(_data)
            .then(result => {
                let isOk = handleNotificationAlertTryUpdate(result);
                if (!isOk) {
                    return;
                }
                setflagApi((prev: any) => !prev);
                setalertdeactive([false, null])
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
                        .filter((column: any, index: any) => index !== 0 && index < head.length - 2)
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
                    <ButtonDetails
                        info={{
                            title: <PictureAsPdfIcon style={{ cursor: 'pointer' }} />,
                            className: "",
                            modal: "FileDetails",
                        }}
                        data={item}
                    />
                </TableCell>

                <TableCell className="colorInherit" align="center" style={{ display: "flex", justifyContent: "center" }}>
                    <EditModal
                        modalEdit={flagEdite}
                        setmodalEdit={setFlagEdite}
                        data={item}
                        handleSubmitEdit={handleSubmitEdit}
                        loading={loading}
                    />
                    <button
                        className={`btnsGreen ${item.body.is_active === "TRUE" ? "disabledItems" : ""}`}
                        onClick={() => setalertActive([true, item.id])}
                    >
                        فعال
                    </button>
                    <button
                        className={`btnsRed ${item.body.is_active === "FALSE" ? "disabledItems" : ""}`}
                        onClick={() => setalertdeactive([true, item.id])}
                    >
                        غیر فعال
                    </button>
                </TableCell>
                <TableCell align="center">

                </TableCell>

            </TableRow>

            {
                alertActive[0] && (
                    <AlertDialogSlide
                        flagShow={alertActive[0]}
                        handleCloseAlert={(flag: any) => setalertActive([flag, null])}
                        handleOkAlert={() => {
                            !loading
                                ? handleOkAlertActive(alertActive[1])
                                : alert('لطفا منتظر جواب درخواست قبلی خود بمانید')
                        }}
                        data={{
                            title: "فعال کردن تحلیل",
                            description:
                                loading
                                    ? <CircularProgress style={{ width: 20, height: 20 }} />
                                    : "آیا از فعال کردن این تحلیل اطمینان دارید؟",
                        }}
                    />
                )
            }
            {
                alertdeactive[0] && (
                    <AlertDialogSlide
                        flagShow={alertdeactive[0]}
                        handleCloseAlert={(flag: any) => setalertdeactive([flag, null])}
                        handleOkAlert={() => {
                            !loading
                                ? handleOkAlertDeactive(alertdeactive[1])
                                : alert('لطفا منتظر جواب درخواست قبلی خود بمانید')
                        }}
                        data={{
                            title: "غیر فعال کردن تحلیل",
                            description:
                                loading
                                    ? <CircularProgress style={{ width: 20, height: 20 }} />
                                    : "آیا از غیر فعال کردن این تحلیل اطمینان دارید؟",
                        }}
                    />
                )
            }
        </>
    )
}
