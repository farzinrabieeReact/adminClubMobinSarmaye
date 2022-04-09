
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
   giftSelectActiveCategoris: "[giftSelectActiveCategoris] Action",
   giftSelectActiveCategorisAsync: "[giftSelectActiveCategorisAsync] Action",
};

const initialState = {
    data: []
};


export const gift_select_Reducer_categories = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectActiveCategoris:
            return {
                data: payload
            }
        default:
            return state
    }
}

function* handleWorker() {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "gift",
        method_type: "select_active_categories",
        data: {}
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.giftSelectActiveCategoris, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* giftSelectActiveCategorisList() {

    yield takeLatest(actionTypes.giftSelectActiveCategorisAsync, handleWorker)
}