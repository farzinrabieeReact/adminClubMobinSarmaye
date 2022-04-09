
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    selectPortfolioDaily: "[selectPortfolioDaily] Action",
    selectPortfolioDailyAsync: "[selectPortfolioDailyAsync] Action",
    selectPortfolioDailyempty: "[selectPortfolioDailyempty] Action",
};

const initialState = {
    data: [],
    size: 50,
    total: 10000
};


export const select_portfolio_daily_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selectPortfolioDaily:
            return {
                ...state,
                data: payload.results,
                total : payload.total ? payload.total  : 10000,
            }
        case actionTypes.selectPortfolioDailyempty:
            return initialState
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "portfolio",
        method_type: "select_portfolio_daily",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by: payload.sort_by,
    } 


    try {
        let res = yield axiosCustom(config, data)

        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.selectPortfolioDaily, payload: res.data.response.data })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* selectPortfolioDaily() {

    yield takeLatest(actionTypes.selectPortfolioDailyAsync, handleWorker)
}