


import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";
// import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../app/common/method/handleNotificationAlert";



export const actionTypes = {
    branchesSelect : "[branchesSelect Action]",
    branchesSelectLoad : "[branchesSelectLoad Action]",
    branchesSelectAsync : "[branchesSelectAsync Action]",
}

const initialState = {
    data:[],
    size:20,
    total:10000,
    loading:false
}



export const branches_select_reducer = (state=initialState,{type,payload})=>{
    switch (type) {
        case actionTypes.branchesSelect:
          return {
            ...state,
            data: payload.results,
            total:payload.total ? payload.total : state.total
          };
        case actionTypes.branchesSelectLoad:
          return {
            ...state,
            loading:payload
          };
        default:
          return state;
      }
}

function* handleWorker({ payload }) {

    let config = {
      url: "select_request"
    };
  
    let data = {
      table: "shoab",
      method_type: "select",
      from: payload?.from ? (payload.from - 1) * payload.size : 0,
      size: payload?.size,
      data: payload?.data ? payload.data : {},
      sort_by: payload?.sort_by ? payload?.sort_by :{} ,
    };
  
    try {
      yield put({type:actionTypes.branchesSelectLoad,payload:true})
      
      let res = yield AxiosCustom(config, data);  
      let flag = handleNotificationAlertTrySelect(res);
      
      if (!flag) return;
      
      yield put({
        type: actionTypes.branchesSelect,
        payload: res.data.response.data
      });

      
    } catch {
      handleNotificationAlertCatch();
     
    } 
    finally{
      yield put({type:actionTypes.branchesSelectLoad,payload:false})
    }
  }
  
  export function* branchesSelect() {
    yield takeLatest(actionTypes.branchesSelectAsync, handleWorker);
  }
  