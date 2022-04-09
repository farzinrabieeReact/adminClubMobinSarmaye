import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert";

export const actionType = {
  ipoListSelect: "[ipoListSelect] Action",
  ipoListSelectAsync: "[ipoListSelectAsync] Action",
};

const initialState = {
  data: [],
  // size:20,
  total:100
};

export const ipoList_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionType.ipoListSelect:
      return {
        ...state,
        data: payload.results,
        // total:payload.total?payload.total:state.total
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
    method_type: "select_ipos",
    data: payload.data ? payload.data : {},
    sort_By: payload.sortRes ? payload.sortRes : {},
  };


  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionType.ipoListSelect,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* ipoListSelect() {
  yield takeLatest(actionType.ipoListSelectAsync, handleWorker);
}
