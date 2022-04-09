import { put, takeLatest } from "@redux-saga/core/effects"
import AxiosCustom from "../../../app/common/components/apiConfig"
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert"




 export const actionTypes={
    changeBrokerSelect : "[changeBrokerSelect] Action",
    changeBrokerSelectLoading : "[changeBrokerSelectLoading] Action",
    changeBrokerSelectImg : "[changeBrokerSelectImg] Action",
    changeBrokerSelectEmpty : "[changeBrokerSelectEmpty] Action",
    changeBrokerSelectAsync: "[changeBrokerSelectAsync] Action",
    changeBrokerSelectAsync2: "[changeBrokerSelectAsync2] Action",
}


const initialState = {
    data:[],
    dataImg:[],
    size:50,
    total:10000,
    loading:false
}



export const changeBroker_select_reducer = (state=initialState,{type,payload})=>{
    switch (type) {
        case actionTypes.changeBrokerSelect:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : state.total
            }
        case actionTypes.changeBrokerSelectImg:
            return {
                ...state,
                dataImg: payload.response.data.results,
            }
        case actionTypes.changeBrokerSelectLoading:
            return {
                ...state,
               loading:payload
            }
        case actionTypes.changeBrokerSelectEmpty:
            return {
                ...state,
                dataImg: []
            }
            
            default:
                return state;
            }
        }
        
        
function* handleWorker({payload}){
    yield put({type:actionTypes.changeBrokerSelectLoading,payload:true})
    let config = { url: "select_request" };
    
    let _data = {
        table: "changebroker",
        method_type: "select_change_brokers",
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by : payload.sort_by ?payload.sort_by : {},
        data: payload.data ? payload.data : {}
    }
    
    
    try {
        let response = yield AxiosCustom(config, _data)
       
        
        let isOk = handleNotificationAlertTrySelect(response)
        if (!isOk) {
            return
        }
        yield put({type:actionTypes.changeBrokerSelect,payload:response.data})
        yield put({type:actionTypes.changeBrokerSelectLoading,payload:false})
    } catch (err) {
        yield put({type:actionTypes.changeBrokerSelectLoading,payload:false})
        handleNotificationAlertCatch()
    }
    
}
function* handleWorker2({payload}){

    yield put({type:actionTypes.changeBrokerSelectLoading,payload:true})
    let config = { url: "select_request" };
    
    let _data = {
        table: "changebroker",
        method_type: "select_change_brokers",
        data: payload?.info ? payload.info : {}
    }
    
    try {
        let response = yield AxiosCustom(config, _data)
        
        let isOk = handleNotificationAlertTrySelect(response)
        if (!isOk) {
            return
        }
        
        // if (!response.data.response.data.results.length) {
            //     dispatch({ type: "ALERT", payload: { status: true, textAlert: "رکوردی وجود ندارد", typeAlert: "warning" } })
            //     return;
            // }
            
            // dispatch({ type: CHANGE_BROKER_SELECT, payload: response.data })
            yield put({type:actionTypes.changeBrokerSelectImg,payload:response.data})
            yield put({type:actionTypes.changeBrokerSelectLoading,payload:false})
            
            
        } catch (err) {
            yield put({type:actionTypes.changeBrokerSelectLoading,payload:false})
        handleNotificationAlertCatch()
    }

}

export function* selectChangeBroker() {
    yield takeLatest(actionTypes.changeBrokerSelectAsync, handleWorker)
    yield takeLatest(actionTypes.changeBrokerSelectAsync2, handleWorker2)
}