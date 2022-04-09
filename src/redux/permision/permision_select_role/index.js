import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  roleSelect: "[roleSelect] Action",
  roleSelectLoading: "[roleSelectLoading] Action",
  roleSelectAsync: "[roleSelectAsync] Action"
};

const initialState = {
  data: [],
  size: 20,
  total: 1000,

  loading: false
};

export const permision_select_role_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.roleSelect:
      return {
        ...state,
        data: payload.data.results.filter(itm => itm.body.is_active === "TRUE"),
        total: payload.data.total ? payload.data.total : state.total
      };
    case actionTypes.roleSelectLoading:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.roleSelectLoading, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "role",
    method_type: "select_role",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {}
  };

  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.roleSelect,
      payload: res.data.response
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.roleSelectLoading, payload: false });
  }
}

export function* permisionRoleSelect() {
  yield takeLatest(actionTypes.roleSelectAsync, handleWorker);
}
