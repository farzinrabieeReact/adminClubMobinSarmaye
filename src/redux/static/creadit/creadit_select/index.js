


   
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../app/common/method/handleNotificationAlert";


export const actionTypes = {
    creaditSelect: "[creadit_Select] Action ",
    creaditSelectAsync: "[creadit_SelectAsync] Action",
};

const initialState = {
    data: "",
};


export const creadit_select_static_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.creaditSelect:
            return {
                // ...state,
                data:payload,
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
            name: "credit"
        }
    }

    try {
        let res = yield AxiosCustom(config, _data)
        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.creaditSelect, payload: res.data})


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* creaditSelectStatic() {
    yield takeLatest(actionTypes.creaditSelectAsync, handleWorker)
}