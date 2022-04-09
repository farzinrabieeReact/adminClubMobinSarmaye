import { Box } from '@material-ui/core'
import React, { useState } from 'react';
import Drawer from '../../../../common/components/drawer';
import Excel from './../excel';
import ExcelAnbar from './../excelAnbar';
import ExcelPost from './../excelPost';
import RefreshIcon from '@material-ui/icons/Refresh';
import { request_gift_v1_actions_finalize_bulk_registration } from '../../../../../redux/gift/requestGift_v1_finalize_bulk_registration/action';
import { request_gift_v1_actions_unregister_bulk_registration } from '../../../../../redux/gift/requestGift_v1_unregister_bulk_registration/action';
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../../common/method/handleNotificationAlert';
import { actionTypes as actionTypes_bulk } from "./../../../../../redux/gift/requestGift_v1_finalize_bulk_registration/reducer"
import { useDispatch, useSelector } from 'react-redux';
import AlertDialogSlide from "./../../../../common/components/AlertDialogSlide";
import ModalCustom from "./../../../../common/components/modal";
import { ResultModal } from "./ResultModal";
import { CircularProgress } from "@material-ui/core";




export default function Header({ selectMultiRow, setSelectMultiRow, stateTable, setStateTable, Head, headForFilter, submitTable, handelRefresh, setflagApi, sort }: any) {
    const dispatch = useDispatch()
    const stateReducerBulkRegistration = useSelector((state: any) => state.request_gift_v1_select_bulk_registration_Reducer);
    const [showAlertFinaly, setshowAlertFinaly] = useState<boolean>(false);
    const [showAlertReject, setshowAlertReject] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false)

    const handleCloseModal = () => {
        dispatch({ type: actionTypes_bulk.GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY })
    }

    const handleOkAlertFinalize = (): void => {
        handleClickFinalize_bulk_registration()
    }

    const handleOkAlertReject = (): void => {
        handleClickReject_bulk_registration()
    }

    const handleClickFinalize_bulk_registration = (): void => {
        setloading(true)
        let res = Object.keys(selectMultiRow).map(item => {
            return { _id: item }
        })

        request_gift_v1_actions_finalize_bulk_registration(res)
            .then(res => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    dispatch({ type: actionTypes_bulk.GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION, payload: res.data.response.data.results })
                    setSelectMultiRow({})
                    setflagApi((prev: any) => !prev)
                }
            })
            .catch(() => {
                handleNotificationAlertCatch()
            })
            .finally(() => {
                setshowAlertFinaly(false)
                setloading(false)
            })
    }

    const handleClickReject_bulk_registration = (): void => {
        setloading(true)
        let res = Object.keys(selectMultiRow).map(item => {
            return { _id: item }
        })

        request_gift_v1_actions_unregister_bulk_registration(res)
            .then(res => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    dispatch({ type: actionTypes_bulk.GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION, payload: res.data.response.data.results })
                    setSelectMultiRow({})
                    setflagApi((prev: any) => !prev)
                }
            })
            .catch(() => {
                handleNotificationAlertCatch()
            })
            .finally(() => {
                setshowAlertReject(false)
                setloading(false)
            })
    }


    return (
        <>
            <Box display="flex">
                {
                    loading && (
                        <Box position="absolute" top="50%" left="50%" zIndex="100">
                            <CircularProgress />
                        </Box>
                    )
                }
                <button
                    className={`btnsGreen ${Object.keys(selectMultiRow).length > 0 ? "" : "disabledItems"}`}
                    onClick={() => setshowAlertFinaly(true)}
                >
                    {`نهایی کردن دسته ای(${Object.keys(selectMultiRow).length})`}
                </button>
                {
                    !loading && (
                        <AlertDialogSlide
                            flagShow={showAlertFinaly}
                            handleCloseAlert={setshowAlertFinaly}
                            handleOkAlert={handleOkAlertFinalize}
                            data={dataAlertDialogSlideFinalize}
                        />
                    )
                }

                <button
                    className={`btnsRed ${Object.keys(selectMultiRow).length > 0 ? "" : "disabledItems"}`}
                    onClick={() => setshowAlertReject(true)}
                >
                    {`رد کردن دسته ای(${Object.keys(selectMultiRow).length})`}
                </button>

                {
                    !loading && (
                        <AlertDialogSlide
                            flagShow={showAlertReject}
                            handleCloseAlert={setshowAlertReject}
                            handleOkAlert={handleOkAlertReject}
                            data={dataAlertDialogSlideUnregister}
                        />
                    )
                }
                <ModalCustom open={stateReducerBulkRegistration.data.length !== 0} setOpen={handleCloseModal}>
                    <ResultModal rows={stateReducerBulkRegistration.data} />
                </ModalCustom>

                <ExcelAnbar
                    stateFilter={stateTable}
                    sort={sort}
                />

                <ExcelPost
                    stateFilter={stateTable}
                    sort={sort}
                />
            </Box>
            <Box display="flex">
                <Excel
                    stateFilter={stateTable}
                    Head={Head}
                />

                <Drawer
                    children={null}
                    tableHead={[...headForFilter, ...Head.filter((item: any) => item.title !== "registration_date" && item.title !== "closing_date")]}
                    stateFilter={{
                        registration_date_from: null,
                        registration_date_to: null,
                        closing_date_from: null,
                        closing_date_to: null,
                        ...stateTable
                    }}
                    setStateFilter={setStateTable}
                    apiSubmit={() => submitTable()}
                />

                <RefreshIcon style={{ height: "auto", fontSize: 25, marginRight: 20, cursor: "pointer" }} onClick={() => handelRefresh()} />
            </Box>
        </>
    )
}


const dataAlertDialogSlideFinalize = {
    title: "نهایی کردن",
    description: "از نهایی کردن این رکوردها اطمینان دارید؟",
};

const dataAlertDialogSlideUnregister = {
    title: "لغو کردن",
    description: "از لغو این رکوردها اطمینان دارید؟",
};