
import { put , takeEvery } from "redux-saga/effects";
import axiosCustom from "../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../app/common/method/handleNotificationAlert'


export const actionTypes = {
  selectSummaries: "[selectSummaries] Action",
  selectSummariesAsync: "[selectSummariesAsync] Action",
};

const initialState = {
    data: [],
    isinJson: {},
    pageStock: []
};


export const select_summaries_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selectSummaries:
            let obj = {}

            payload.forEach(element => {
                obj[element.body.isin] = element.body.short_name
            });
            let result = []
            let all = [...state.data, ...payload]
            result = all.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.place === thing.place && t.id === thing.id
                ))
            )

            return {
                data: result,
                isinJson: { ...state.isinJson, ...obj },
                pageStock: result
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
        size: 10000,
        data: payload.data ? payload.data : {},
        sort_by: payload.sort_by?payload.sort_by:{},
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.selectSummaries, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* selectSummaries() {
    
    yield takeEvery(actionTypes.selectSummariesAsync, handleWorker)
}