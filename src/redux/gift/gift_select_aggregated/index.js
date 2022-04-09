
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    giftSelectLoading: "[giftSelectLoading] Action",
    giftSelectClear: "[giftSelectClear] Action",
    giftSelectAggregated: "[giftSelectAggregated] Action",
    giftSelectAggregatedAsync: "[giftSelectAggregatedAsync] Action",
    giftSelectAggregatedFilter: "[giftSelectAggregatedFilter] Action",

};

const initialState = {
    data: '',
    dataFilter: '',
    size: 50,
    total: 10000,
    loading: false
};


export const gift_select_aggregated_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectAggregated:
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

        case actionTypes.giftSelectAggregatedFilter:

            let res = handelFilterReducer(payload, state.data)

            return {
                ...state,
                dataFilter: res,
                total: res.length
            }

        case actionTypes.giftSelectLoading:
            return {
                ...state,
                loading: payload
            }

        case actionTypes.giftSelectClear:
            return initialState
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.giftSelectLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "gift",
        method_type: "select_aggregated_user_registrations",
        data: payload.data ? payload.data : {},
        from: payload.from ? payload.from : 0,
        size: payload.size ? payload.size : initialState.size,
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.giftSelectLoading, payload: false })

        if (!flag) return

        yield put({ type: actionTypes.giftSelectAggregated, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.giftSelectLoading, payload: false })

    }


}


export function* giftSelectAggregated() {

    yield takeLatest(actionTypes.giftSelectAggregatedAsync, handleWorker)
}



export const handelFilterReducer = (stateFilter, data) => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
            obj[element] = stateFilter[element];
        }
    });

    let selected = []

    let filter = {
        "نام و نام خانوادگی": item => item.body['نام و نام خانوادگی'].includes(obj['نام و نام خانوادگی']),
        "کد ملی": item => item.body['کد ملی'] === obj['کد ملی'],
        "کد تفصیلی": item => item.body['کد تفصیلی'] === obj['کد تفصیلی'],
        "مجموع امتیاز": item => +item.body['مجموع امتیاز'] === +obj['مجموع امتیاز'],
        "وضعیت": item => item.body['وضعیت'] === obj['وضعیت'],
        "حداقل امتیاز": item => +item.body['مجموع امتیاز'] >= +obj['حداقل امتیاز'],
        "حداکثر امتیاز": item => +item.body['مجموع امتیاز'] <= +obj['حداکثر امتیاز'],
        "مجموع امتیاز(حداکثر،حداقل)": item => item.body['مجموع امتیاز'] <= obj['حداکثر امتیاز'] && item.body['مجموع امتیاز'] >= obj['حداقل امتیاز'],
    }


    if (obj['نام و نام خانوادگی'])
        selected.push(filter['نام و نام خانوادگی'])

    if (obj['کد ملی'])
        selected.push(filter['کد ملی'])

    if (obj['وضعیت'])
        selected.push(filter['وضعیت'])

    if (obj['کد تفصیلی'])
        selected.push(filter['کد تفصیلی'])

    if (obj["مجموع امتیاز"])
        selected.push(filter["مجموع امتیاز"])

    if (obj['حداقل امتیاز'] && !obj['حداکثر امتیاز'])
        selected.push(filter['حداقل امتیاز'])

    if (!obj['حداقل امتیاز'] && obj['حداکثر امتیاز'])
        selected.push(filter['حداکثر امتیاز'])

    if (obj['حداقل امتیاز'] && obj['حداکثر امتیاز'])
        selected.push(filter["مجموع امتیاز(حداکثر،حداقل)"])


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
