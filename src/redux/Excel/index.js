import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  excelSelectData: "[excelSelectData] Action",
  excelSelectData2: "[excelSelectData2] Action",
  excelSelectLoading: "[excelSelectLoading] Action",
  excelSelectEmpty: "[excelSelectEmpty] Action",
  excelSelectIsOk: "[excelSelectIsOk] Action",
  excelSelectAsync: "[excelSelectAsync] Action",
};

const initilState = {
  data: [],
  data2: [],
  loading: false,
  isOk: false,
};

export const excel_select_reducer = (
  state = initilState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.excelSelectData:
      return {
        ...state,
        data: payload,
        data2: [],
      };
    case actionTypes.excelSelectData2:
      
      return {
        ...state,
        data2: payload,
        data: [],
      };
    case actionTypes.excelSelectLoading:
      return {
        ...state,
        loading: payload,
      };
    case actionTypes.excelSelectEmpty:
      return {
        ...state,
      };
    case actionTypes.excelSelectIsOk:
      return {
        ...state,
        isOk: payload,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.excelSelectLoading, payload: true });
  let config = {
    url: "select_request",
  };
  let data = {};
  let method = payload.methodType
  if (
    method === "select_aggregated_user_registrations" ||
    method === "online_charge_report"
  ) {
    data = {
      table: payload.tableApi,
      method_type: payload.methodType,
      data: payload.obj ? payload.obj : {},
    };
  } else {
    if(payload.valueTab === 1){
     
      data = {
        table: payload.tableApi,
        method_type: payload.methodType2?payload.methodType2:"",
        data: payload.obj ? payload.obj : {},
        from: 0,
        size: 10000,
      }
    }else{      data = {
        table: payload.tableApi,
        method_type: payload.methodType?payload.methodType:"",
        data: payload.obj ? payload.obj : {},
        from: 0,
        size: 10000,
      };
    }
  }

  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    if (payload.valueTab === 0) {
      yield put({
        type: actionTypes.excelSelectData,
        payload: res.data.response.data.results,
      });
    } else {
      yield put({
        type: actionTypes.excelSelectData2,
        payload: res.data.response.data.results,
      });
    }
    yield put({type:actionTypes.excelSelectIsOk,payload:true})
  } catch (error) {
    handleNotificationAlertCatch();
  }
  finally{
    yield put({ type: actionTypes.excelSelectLoading, payload: false });
  }
}

export function* excelSelect() {
  yield takeLatest(actionTypes.excelSelectAsync, handleWorker);
}
