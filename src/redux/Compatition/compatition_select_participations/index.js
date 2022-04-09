import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig"
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  compatitionSelectParticipations: "[compatitionSelectParticipations] Action",
  compatitionSelectParticipationsEmpty: "[compatitionSelectParticipationsEmpty] Action",
  compatitionSelectparticipationsAsync: "[compatitionSelectparticipationsAsync] Action",
};

const initialState = {
  data: [],
  size:50,
  total:10000,
};

export const compatition_select_participation_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.compatitionSelectParticipations:
      return {
        ...state,
        data: payload.results,
        total : payload.total ? payload.total  : 10000,
      };
    case actionTypes.compatitionSelectParticipationsEmpty:
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
      table: "competition",
      method_type: "select_participations",
      data: payload.data ? payload.data : {},
      from: payload.from ? (payload.from - 1) * payload.size : 0,
      size: payload.size,
      sort_by: payload.sort_by,
    };

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.compatitionSelectParticipations, payload: res.data.response.data})
    } catch (error) {
        handleNotificationAlertCatch()
    }
}

export function* CompatitionSelectParticipations(){
    yield takeLatest(actionTypes.compatitionSelectparticipationsAsync,handleWorker)
}
