
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    selectBonusAggregated: "[selectBonusAggregated] Action",
    selectBonusAggregatedAsync: "[selectBonusAggregatedAsync] Action",
    selectBonusAggregatedLoading: "[selectBonusAggregatedLoading] Action",
};

const initialState = {
    data: [],
    loading: false,
    size: 50,
    total: 10000
};


export const select_bouns_aggregated_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selectBonusAggregated:
            return {
                ...state,
                data: payload.results,
                total: payload.total
                    ? payload.total > 10000
                        ? 10000
                        : payload.total
                    : 0
            }
        case actionTypes.selectBonusAggregatedLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.selectBonusAggregatedLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let data = {
        table: "bonus",
        method_type: "select_aggregated_bonus",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by: payload.sort_by,
    }


    try {
        let res = yield axiosCustom(config, data)
        let isOk = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.selectBonusAggregatedLoading, payload: false })

        if (!isOk) return

        yield put({ type: actionTypes.selectBonusAggregated, payload: res.data.response.data })


    } catch  {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.selectBonusAggregatedLoading, payload: false })
    }


}


export function* selectBounsAggregated() {

    yield takeLatest(actionTypes.selectBonusAggregatedAsync, handleWorker)
}