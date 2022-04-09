import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectAutomationLog: "[selectAutomationLog] Action",
  selectAutomationLogLoading: "[selectAutomationLogLoading] Action",
  selectAutomationLogAsync: "[selectAutomationLogAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 0,
  loading: false
};

export const automationLog_Select_Reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectAutomationLog:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectAutomationLogLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selectAutomationLogLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "order",
    method_type: "select_automation_log",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectAutomationLog,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.selectAutomationLogLoading, payload: false });
  }
}

export function* automationLogSelect() {
  yield takeLatest(actionTypes.selectAutomationLogAsync, handleWorker);
}
