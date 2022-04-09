
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    selectStockManegement: "[selectStockManegement] Action",
    selectStockManegementLoading: "[selectStockManegementLoading] Action",
    selectStockManegementAsync: "[selectStockManegementAsync] Action",
};

const initialState = {
    data: [],
    size: 50,
    total: 10000,
    loading: false
};


export const select_siteManagment_Reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.selectStockManegement:
            return {
                data: payload.results,
                size: state.size,
                total: payload.total === 0 ? 0 : payload.total
                    ? payload.total > 10000 ? 10000 : payload.total
                    : 10000,
            }
        case actionTypes.selectStockManegementLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {
    yield put({ type: actionTypes.selectStockManegementLoading, payload: true })

    let { size } = payload
    let { data } = payload
    let { from } = payload
    let { sort_by } = payload


    let config = {
        url: "select_request",
    }

    let _data = {
        table: "stock",
        method_type: "select_summaries",
        data: data ? data : {},
        from: from ? (from - 1) * size : 0,
        size: size,
        sort_by: sort_by
    }



    try {
        let res = yield axiosCustom(config, _data)

        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.selectStockManegement, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
    }
    finally {
        yield put({ type: actionTypes.selectStockManegementLoading, payload: false })
    }
}


export function* selectStockManegement() {
    yield takeLatest(actionTypes.selectStockManegementAsync, handleWorker)
}

export const flowDisplay = (value) => {
    switch (value) {
        case "1":
            return "بورس"
        case "2":
            return "فرابورس"
        case "4":
            return "پایه"
        default:
            return "-"
    }
}

export const StockTypeDisplay = (value) => {
    switch (value) {
        case "MORTGAGE":
            return "تسهیلات مسکن"
        case "ETF":
            return "صندوق قابل معامله"
        case "BOND":
            return "اوراق قرضه"
        case "OPTION":
            return "اختیار"
        case "IFB":
            return "فرابورس"
        case "TSE":
            return "بورس"
        case "FUTURE":
            return "آتی"
        case "ENERGY":
            return "انرژی"
        case "IME":
            return "کالا"
        case "null":
            return "-"
        default:
            return "نا مشخص"
    }
}

export const IsActiveDisplay = (value) => {
    if (value === "TRUE") return "فعال"
    else if (value === "FALSE") return "غیرفعال"
    else return "نامشخص"
  }
