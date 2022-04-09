
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'
import store from '../../store';

export const actionTypes = {
    clubmemberSelect: "[clubmemberSelect] Action",
    clubmemberSelectAsync: "[clubmemberSelectAsync] Action",
    CLUB_MEMBER_SELECT_ERROR: "[CLUB_MEMBER_SELECT_ERROR] Action",
    CLUB_MEMBER_SELECT_EMPTY:"[CLUB_MEMBER_SELECT_EMPTY] Action"
};

const initialState = {
    data: [],
    isOk: false,
};


export const club_member_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.clubmemberSelect:
            return {
                data: payload,
                isOk: true,
            }
        case actionTypes.CLUB_MEMBER_SELECT_ERROR:
            return {
                ...state,
                data: [],
            }
        case actionTypes.CLUB_MEMBER_SELECT_EMPTY:
            return initialState
        default:
            return state
    }
}


function* handleWorker({ payload }) {

    const { dispatch} = store;

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select",
        data: payload.national_id ?{national_id:payload.national_id}  : {}
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)

        if (!flag) {
            yield put({type: actionTypes.CLUB_MEMBER_SELECT_ERROR })
            return
        }

        if (res.data.response.data.results.length === 0) {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
            yield put({type: actionTypes.CLUB_MEMBER_SELECT_ERROR })
            return
        }

        yield put({ type: actionTypes.clubmemberSelect, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* clubmemberSelect() {

    yield takeLatest(actionTypes.clubmemberSelectAsync, handleWorker)
}