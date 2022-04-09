import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
    systemsSelect: "[systemsSelect] Action ",
    systemsSelectAsync: "[systemsSelectAsync] Action",
};

const initialState = {
    data: [],
};

export const system_select_static_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.systemsSelect:
            return {
                ...state,
                data:payload,
            }
            default:
                return state
            }
        }

function* handleWorker({ payload }) {


    let config = { url: "select_request" };

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "systems"
        }
    }

    try {
        let res = yield AxiosCustom(config, _data)
        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.systemsSelect, payload: res.data})


    } catch  {
        handleNotificationAlertCatch()
    }



}

export function* systemsSelectStatic() {
    
    yield takeLatest(actionTypes.systemsSelectAsync, handleWorker)
}