import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  ipoUserStatus: "[ipoUserStatus Action]",
  ipoUserStatusEmpty: "[ipoUserStatusEmpty Action]",
  ipoUserStatusAsync: "[ipoUserStatusAsync Action]",
};

const initialState = {
  data: [],
};

export const ipo_status_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ipoUserStatus:
      return { data: payload };
    case actionTypes.ipoUserStatusEmpty:
      return { data: [] };
    default:
      return state;
  }
};

function* handleWorker({payload}) {
  let config = { url: "select_request" };

  let _data = {
    table: "ipo",
    method_type: "select_user_status",
    data: payload?.data ? payload.data:{}
  };

  try {
    let response = yield AxiosCustom(config, _data);
    let isOk = handleNotificationAlertTrySelect(response);
    if (!isOk) {
      return;
    }
    yield put({ type: actionTypes.ipoUserStatus, payload: response.data.response.data.results });
  } catch (err) {
    handleNotificationAlertCatch();
  }
}
export function* ipoUser() {
  yield takeLatest(actionTypes.ipoUserStatusAsync, handleWorker);
}
