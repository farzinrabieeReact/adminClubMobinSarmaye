
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert'

export const actionTypes = {
    sliderSelectLoading: "[sliderSelectLoading] Action",
    sliderSelectClear: "[sliderSelectClear] Action",
    sliderSelect: "[sliderSelect] Action",
    sliderSelectAsync: "[sliderSelectAsync] Action",
    sliderSelectFilter: "[sliderSelectFilter] Action",

};

const initialState = {
    data: '',
    dataFilter: '',
    size: 10,
    total: 10000,
    loading: false
};


export const slider_select_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.sliderSelect:
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

        case actionTypes.sliderSelectFilter:

            let res = handelFilterReducer(payload, state.data)

            return {
                ...state,
                dataFilter: res,
                total: res.length
            }

        case actionTypes.sliderSelectLoading:
            return {
                ...state,
                loading: payload
            }

        case actionTypes.sliderSelectClear:
            return initialState
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.sliderSelectLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "slider"
        },
    }


    try {

        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.sliderSelectLoading, payload: false })

        if (!flag) return

        yield put({ type: actionTypes.sliderSelect, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.sliderSelectLoading, payload: false })

    }


}


export function* sliderSelect() {

    yield takeLatest(actionTypes.sliderSelectAsync, handleWorker)
}




export const handelFilterReducer = (stateFilter, data) => {

    let obj = {};

    Object.keys(stateFilter).forEach((element) => {

        if (element === 'IsNewPage' && typeof stateFilter[element] !== 'string') {
            obj[element] = stateFilter[element];
            return
          }
          if (element === 'showSlider' && typeof stateFilter[element] !== 'string') {
            obj[element] = stateFilter[element];
            return
          }

        if (stateFilter[element]) {
            obj[element] = stateFilter[element];
        }
    });

    let selected = []

    let filter = {
        "Title": item => item['Title'].includes(obj['Title']),
        "Link": item => item['Link'].includes(obj['Link']),
        "IsNewPage": item => item['IsNewPage'] === obj['IsNewPage'],
        "showSlider": item => item['showSlider'] === obj['showSlider'],
        "Priority": item => +item['Priority'] === +obj['Priority'],
    }

    if (obj['Title'])
        selected.push(filter['Title'])

    if (obj['Link'])
        selected.push(filter['Link'])

    if (obj['IsNewPage'])
        selected.push(filter['IsNewPage'])

    if (obj['Priority'])
        selected.push(filter['Priority'])

    if ( obj.hasOwnProperty("showSlider"))
        selected.push(filter['showSlider'])

    


    let content = data ? JSON.parse(data[0].body.content).content : []
    console.log('content' , content);
    let result = content.filter(item => selected.every(f => f(item)));

    let res = [
        {
            id: data ? data[0].id : '',
            body: {
                content: JSON.stringify({content :result })
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
                        content: JSON.stringify({content :[] })
                    }
                }
            ]
        }
    } else {
        return data

    }

}
