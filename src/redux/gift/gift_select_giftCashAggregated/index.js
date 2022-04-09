
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    giftSelectChashLoading: "[giftSelectChashLoading] Action",
    giftSelectChashClear: "[giftSelectChashClear] Action",
    giftSelectChashAggregated: "[giftSelectChashAggregated] Action",
    giftSelectChashAggregatedAsync: "[giftSelectChashAggregatedAsync] Action",
    giftSelectChashAggregatedFilter: "[giftSelectChashAggregatedFilter] Action",
    
};

const initialState = {
    data: '',
    dataFilter: '',
    size: 50,
    total: 10000,
    loading: false
};


export const gift_select_cashAggregated_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectChashAggregated:
            return {
                ...state,
                data: payload.results,
                dataFilter: payload.results,
                total: payload.total
                    ? payload.total > 10000
                        ? 10000
                        : payload.total
                    : 0
            }

        case actionTypes.giftSelectChashAggregatedFilter:

            let res = handelFilterReducer(payload, state.data)

            return {
                ...state,
                dataFilter: res,
                total: res.length
            }

        case actionTypes.giftSelectChashLoading:
            return {
                ...state,
                loading: payload
            }

        case actionTypes.giftSelectChashClear:
            return initialState
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.giftSelectChashLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "onlinecharge",
        method_type: "online_charge_report",
        data: payload.data ? payload.data : {},
        from: payload.from ? payload.from : 0,
        size: payload.size ? payload.size : initialState.size,
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.giftSelectChashLoading, payload: false })

        if (!flag) return

        yield put({ type: actionTypes.giftSelectChashAggregated, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.giftSelectChashLoading, payload: false })

    }


}


export function* giftSelectCashAggregated() {

    yield takeLatest(actionTypes.giftSelectChashAggregatedAsync, handleWorker)
}




export  const handelFilterReducer = (stateFilter, data) => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
            obj[element] = stateFilter[element];
        }
    });

    let selected = []

    let filter = {
        "member_first_name": item => item.body['member_first_name'].includes(obj['member_first_name']),
        "member_last_name": item => item.body['member_last_name'].includes(obj['member_last_name']),
        "member_national_id": item => item.body['member_national_id'] === obj['member_national_id'],
        "member_account_code": item => item.body['member_account_code'] === obj['member_account_code'],
        "sum_amount": item => +item.body['sum_amount'] === +obj['sum_amount'],
        "sum_bonus": item => +item.body['sum_bonus'] === +obj['sum_bonus'],
        "min_sum_bonus": item => item.body['sum_bonus'] >= obj['min_sum_bonus'],
        "max_sum_bonus": item => item.body['sum_bonus'] <= obj['max_sum_bonus'],
        "sum_bonusBetween": item => item.body['sum_bonus'] <= obj['max_sum_bonus'] && item.body['sum_bonus'] >= obj['min_sum_bonus'],
        "min_sum_amount": item => item.body['sum_amount'] >= obj['min_sum_amount'],
        "max_sum_amount": item => item.body['sum_amount'] <= obj['max_sum_amount'],
        "sum_amountBetween": item => item.body['sum_amount'] <= obj['max_sum_amount'] && item.body['sum_amount'] >= obj['min_sum_amount'],
    }

    if (obj['member_first_name'])
        selected.push(filter['member_first_name'])

    if (obj['member_last_name'])
        selected.push(filter['member_last_name'])

    if (obj['member_national_id'])
        selected.push(filter['member_national_id'])

    if (obj['member_account_code'])
        selected.push(filter['member_account_code'])

    if (obj['sum_amount']) 
        selected.push(filter['sum_amount'])

    if (obj['sum_bonus']) 
        selected.push(filter['sum_bonus'])

    if (obj['min_sum_bonus'] && !obj['max_sum_bonus'])
        selected.push(filter['min_sum_bonus'])

    if (!obj['min_sum_bonus'] && obj['max_sum_bonus'])
        selected.push(filter['max_sum_bonus'])

    if (obj['min_sum_bonus'] && obj['max_sum_bonus'])
        selected.push(filter['sum_bonusBetween'])

    if (obj['min_sum_amount'] && !obj['max_sum_amount'])
        selected.push(filter['min_sum_amount'])

    if (!obj['min_sum_amount'] && obj['max_sum_amount'])
        selected.push(filter['max_sum_amount'])

    if (obj['min_sum_amount'] && obj['max_sum_amount'])
        selected.push(filter['sum_amountBetween'])


    let result = data.filter(item => selected.every(f => f(item)));

    if (selected.length > 0) {
        if (result.length > 0) {
            return result
        } else {
            return []
        }
    } else {
        return data

    }

}
