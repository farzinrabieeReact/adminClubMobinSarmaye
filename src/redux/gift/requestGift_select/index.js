
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    requestGiftSelect: "[requestGiftSelect] Action",
    requestGiftSelectAsync: "[requestGiftSelectAsync] Action",
    requestGiftSelectLoading: "[requestGiftSelectLoading] Action",
};

const initialState = {
    data: [],
    size: 20,
    total: 10000,
    loading: false
};


export const requests_gift_select_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.requestGiftSelect:
            return {
                data: payload.results,
                size: state.size,
                total: payload.total === 0 ? 0 : payload.total
                    ? payload.total > 10000 ? 10000 : payload.total
                    : 10000,
            }
        case actionTypes.requestGiftSelectLoading:
            return {
                ...state,
                loading : payload
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {
    yield put({ type: actionTypes.requestGiftSelectLoading, payload: true })
    let { size } = payload
    let { data } = payload
    let { from } = payload
    let { sort_by } = payload

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "gift",
        method_type: "select_registrations",
        data: data ? data : {},
        from: from ? (from - 1) * size : 0,
        size: size,
        sort_by : sort_by
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.requestGiftSelect, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
    }
    finally {
        yield put({ type: actionTypes.requestGiftSelectLoading, payload: false })
    }


}


export function* requestGiftSelectList() {

    yield takeLatest(actionTypes.requestGiftSelectAsync, handleWorker)
}