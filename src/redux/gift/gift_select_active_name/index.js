
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    GiftSelectActiveName: "[GiftSelectActiveName] Action",
    GiftSelectActiveNameAsync: "[GiftSelectActiveNameAsync] Action",
    GiftSelectActiveNameLoading: "[GiftSelectActiveNameLoading] Action",
};

const initialState = {
    data: [],
    loading: false
};


export const gift_select_active_name_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GiftSelectActiveName:
            let res = payload.results.map(item => {
                return { id: item.id, name: item.body.name }
            })
            return {
                data: res,
            }
        case actionTypes.GiftSelectActiveNameLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

function* handleWorker() {
    yield put({ type: actionTypes.GiftSelectActiveNameLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "gift",
        method_type: "select_active_gift_names",
        data: {}
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.GiftSelectActiveName, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
    }
    finally {
        yield put({ type: actionTypes.GiftSelectActiveNameLoading, payload: false })
    }


}


export function* GiftSelectActiveNameList() {
    yield takeLatest(actionTypes.GiftSelectActiveNameAsync, handleWorker)
}