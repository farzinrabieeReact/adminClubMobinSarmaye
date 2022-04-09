import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect,handleNotificationAlertCatch } from "../../../app/common/method/handleNotificationAlert";

export const actionType = {
  ipoListSelectRegistered: "[ipoListSelectRegistered] Action",
  ipoListSelectRegisteredAsync: "[ipoListSelectRegisteredAsync] Action",
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
};

export const ipoList_select_Registered_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionType.ipoListSelectRegistered:
      return {
        ...state,
        data: payload.results,
        total: payload.total?payload.total:state.total,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {

  let config = {
    url: "select_request",
  };
  let data = {
    table: "ipo",
    method_type: "select_registered_ipos",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size?payload.size:{},
    sort_by: payload.sortRes?payload.sortRes:{},
  };
  


  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionType.ipoListSelectRegistered,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* ipoListSelectRegistered() {
  yield takeLatest(actionType.ipoListSelectRegisteredAsync, handleWorker);
}
