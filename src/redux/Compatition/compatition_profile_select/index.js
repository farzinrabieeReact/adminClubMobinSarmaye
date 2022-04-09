import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig"
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  competitionsProfileSelect: "[competitionsProfileSelect] Action",
  competitionsProfileSelectEmpty: "[competitionsProfileSelectEmpty] Action",
  competitionsProfileSelectAsync: "[competitionsProfileSelectAsync] Action",
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
};

export const competitions_profile_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.competitionsProfileSelect:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : 10000,
      };
    case actionTypes.competitionsProfileSelectEmpty:
      return initialState
    default:
      return state;
  }
};


function* handleWorker({payload}){
    let config = {
        url:"select_request"
    }
    let data = {
        table: "clubmember",
        method_type: "select",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by: payload.sort_by,
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.competitionsProfileSelect, payload: res.data.response.data.results })
    } catch (error) {
        handleNotificationAlertCatch()
    }
}

export function* compatitionProfileSelect(){
    yield takeLatest(actionTypes.competitionsProfileSelectAsync,handleWorker)
}
