
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    memberRemain: "[memberRemain] Action",
    memberRemainAsync: "[memberRemainAsync] Action",
    memberRemainempty: "[memberRemainempty] Action",
};

const initialState = {
    data: [],
    size: 50,
    total: 10000
};


export const select_member_remain_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.memberRemain:
            return {
                ...state,
                data: payload.results,
                total : payload.total ? payload.total  : 10000,
            }
        case actionTypes.memberRemainempty:
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
        method_type: "select_portfolio_remain",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by: payload.sort_by,
    } 


    try {
        let res = yield axiosCustom(config, data)

        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.memberRemain, payload: res.data.response.data })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* selectMemberRemain() {

    yield takeLatest(actionTypes.memberRemainAsync, handleWorker)
}