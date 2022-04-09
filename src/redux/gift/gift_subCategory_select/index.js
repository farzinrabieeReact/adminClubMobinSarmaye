
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
   giftSelectActiveSubCategory: "[giftSelectActiveSubCategory] Action",
   giftSelectActiveSubCategoryAsync: "[giftSelectActiveSubCategoryAsync] Action",
};

const initialState = {
    data: []
};


export const gift_select_Reducer_subCategories = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectActiveSubCategory:
            return {
                data: payload
            }
        default:
            return state
    }
}

function* handleWorker({payload}) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "gift",
        method_type: "select_active_subcategories",
        data: payload  ? payload : {}
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.giftSelectActiveSubCategory, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* giftSelectActiveSubCategoryList() {

    yield takeLatest(actionTypes.giftSelectActiveSubCategoryAsync, handleWorker)
}