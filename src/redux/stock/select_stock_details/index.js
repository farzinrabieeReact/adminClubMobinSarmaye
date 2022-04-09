
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    selectStockDetails: "[selectStockDetails] Action",
    selectStockDetailsAsync: "[selectStockDetailsAsync] Action",
    selectStockDetailsEmpty: "[selectStockDetailsEmpty] Action",
};

const initialState = {
    data: {},
    size: 50,
    total: 10000
};


export const select_stock_details_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selectStockDetails:

            return {
                ...state,
                data: payload,
            }
        case actionTypes.selectStockDetailsEmpty:
            return initialState
        default:
            return state
    }
}

let obj = {};
function* handleWorker({ payload }) {


    for (let isin of payload.arrayIsin) {
        let config = {
            url: "select_request",
        }

        let data = {
            table: "stock",
            method_type: "select_stock_details",
            data: { isin: isin },
            from: payload.from ? (payload.from - 1) * payload.size : 0,
            size: payload.size,
            sort_by: payload.sort_by,
        }

        try {
                    let res = yield axiosCustom(config, data)
    
                    let isOk = handleNotificationAlertTrySelect(res)
                    if (!isOk) return
        
                    obj[isin] = res.data.response.data;
        
                } catch  {
                    handleNotificationAlertCatch()
                }
               
            }
    yield put({ type: actionTypes.selectStockDetails, payload: obj })
}

export function* selectStockDetails() {

    yield takeLatest(actionTypes.selectStockDetailsAsync, handleWorker)
}