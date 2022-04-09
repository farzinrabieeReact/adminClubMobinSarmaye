import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  stageSelect: "[stageSelect] Action",
  stageSelectAsync: "[stageSelectAsync] Action"
};

const initialState = {
  data: [],
  size: 20,
  total: 1000,

  loading: false
};

export const stage_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.stageSelect:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total,
        isOk: true
      };

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  // yield put({ type: actionTypes.creaditSelectLoad, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "staging",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    api_key: "d025488f-8ec6-4434-afbe-b6a5343815a7",
    method_type: "select_stage_info",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    // yield put({ type: actionTypes.creaditSelectLoad, payload: false });
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.stageSelect,
      payload: res.data.response
    });
  } catch {
    handleNotificationAlertCatch();
    // yield put({ type: actionTypes.creaditSelectLoad, payload: false });
  }
}

export function* stageSelect() {
  yield takeLatest(actionTypes.stageSelectAsync, handleWorker);
}
