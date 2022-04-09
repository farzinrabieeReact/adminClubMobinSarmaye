
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert'

export const actionTypes = {
    accountSelectLoading: "[accountSelectLoading] Action",
    accountSelectClear: "[accountSelectClear] Action",
    accountSelect: "[accountSelect] Action",
    accountSelectAsync: "[accountSelectAsync] Action",
    accountSelectFilter: "[accountSelectFilter] Action",

};

const initialState = {
    data: '',
    dataFilter: '',
    size: 10,
    total: 10000,
    loading: false
};


export const account_select_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.accountSelect:
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

        case actionTypes.accountSelectFilter:

            let res = handelFilterReducer(payload, state.data)

            return {
                ...state,
                dataFilter: res,
                total: res.length
            }

        case actionTypes.accountSelectLoading:
            return {
                ...state,
                loading: payload
            }

        case actionTypes.accountSelectClear:
            return initialState
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.accountSelectLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "accounts"
        },
        // from: payload.from ? payload.from : 0,
        // size: payload.size ? payload.size : initialState.size,
    }


    try {

        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.accountSelectLoading, payload: false })

        if (!flag) return

        yield put({ type: actionTypes.accountSelect, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.accountSelectLoading, payload: false })

    }


}


export function* accountSelect() {

    yield takeLatest(actionTypes.accountSelectAsync, handleWorker)
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
        "Group": item => item['Group'].includes(obj['Group']),
        "Bank": item => item['Bank'].includes(obj['Bank']),
        "Number": item => item['Number'].includes(obj['Number']),
        "Sheba": item => item['Sheba'].includes(obj['Sheba']),
    }

    if (obj['Group'])
        selected.push(filter['Group'])

    if (obj['Bank'])
        selected.push(filter['Bank'])

    if (obj['Number'])
        selected.push(filter['Number'])

    if (obj['Sheba'])
        selected.push(filter['Sheba'])


    let content = data ? JSON.parse(data[0].body.content) : []
    let result = content.filter(item => selected.every(f => f(item)));

    let res = [
        {
            id: data ? data[0].id : '',
            body: {
                content: JSON.stringify(result)
            }
        }
    ]

    if (selected.length > 0) {
        if (result.length > 0) {
            return res
        } else {
            return [
                {
                    id: data ? data[0].id :'',
                    body: {
                        content: JSON.stringify([])
                    }
                }
            ]
        }
    } else {
        return data

    }

}
