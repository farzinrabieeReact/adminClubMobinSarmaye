
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../app/common/method/handleNotificationAlert'


export const actionTypes = {
  selectSummariesSearch: "[selectSummariesSearch] Action",
  selectSummariesSearchAsync: "[selectSummariesSearchAsync] Action",
};

const initialState = {
    data: [],

};


export const select_summaries_search_Reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.selectSummariesSearch:
            return {
                data: payload,
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
        table: "stock",
        method_type: "select_summaries",
        from: 0,
        size: 500,
        data: payload ? payload : {},
    }



    try {
        let res = yield axiosCustom(config, data)
        
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.selectSummariesSearch, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* selectSummariesSearch() {
    
    yield takeLatest(actionTypes.selectSummariesSearchAsync, handleWorker)
}