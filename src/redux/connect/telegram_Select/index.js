
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    telegramSelect: "[telegramSelect] Action",
    telegramSelectAsync: "[telegramSelectAsync] Action",
};

const initialState = {
    data: "",

};


export const select_telegram_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.telegramSelect:
            return {
                ...state,
                data: payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "telegram_links"
        }
    }

    try {
        let res = yield axiosCustom(config, _data)
        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.telegramSelect, payload: res.data })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* telegramSelect() {

    yield takeLatest(actionTypes.telegramSelectAsync, handleWorker)
}