import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectBonusComputing: "[selectBonusComputing] Action",
  selectBonusComputingLoad: "[selectBonusComputingLoad] Action",
  selectBonusComputingAsync: "[selectBonusComputingAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const bonusComputing_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectBonusComputing:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectBonusComputingLoad:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "bonus",
    method_type: "select_bonus_conflicts",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };
  yield put({
    type: actionTypes.selectBonusComputingLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectBonusComputing,
      payload: res.data.response.data
    });
    yield put({
      type: actionTypes.selectBonusComputingLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
    yield put({
      type: actionTypes.selectBonusComputingLoad,
      payload: false
    });
  }
}

export function* selectBonusComputing() {
  yield takeLatest(actionTypes.selectBonusComputingAsync, handleWorker);
}
