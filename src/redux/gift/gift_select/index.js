
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    giftSelect: "[giftSelect] Action",
    giftSelectAsync: "[giftSelectAsync] Action",
    giftSelectLoading: "[giftSelectLoading] Action",
};

const initialState = {
    data: [],
    size: 20,
    total: 5000,
    loading: false
};


export const gift_select_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelect:
            return {
                data: payload.results,
                size: state.size,
                total: payload.total === 0 ? 0 : payload.total
                    ? payload.total
                    : 5000,
            }
        case actionTypes.giftSelectLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {
    yield put({ type: actionTypes.giftSelectLoading, payload: true })
    let { size } = payload
    let { data } = payload
    let { from } = payload

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "gift",
        method_type: "select_gifts",
        data: data ? data : {},
        from: from,
        size: size
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.giftSelect, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
    }
    finally {
        yield put({ type: actionTypes.giftSelectLoading, payload: false })
    }


}


export function* giftSelectList() {

    yield takeLatest(actionTypes.giftSelectAsync, handleWorker)
}