import { put, takeLatest } from "redux-saga/effects";
import {
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert";
import AxiosCustomAuthentication from "../../../app/common/components/apiConfigAuthenticationLiveness";

export const actionTypes = {
  selectAuthentication: "[selectAuthentication] Action",
  selectAuthenticationLoading: "[selectAuthenticationLoading] Action",
  selectAuthenticationAsync: "[selectAuthenticationAsync] Action",
};

const initialState = {
  data: [],
  loading: false,
};

export const Authentication_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectAuthentication:
      return {
        ...state,
        data: payload,
      };
    case actionTypes.selectAuthenticationLoading:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

function* handleWorker() {
  yield put({ type: actionTypes.selectAuthenticationLoading, payload: true });

  let config = {
    url: "get_result",
  };

  try {
    let res = yield AxiosCustomAuthentication(config);

    yield put({
      type: actionTypes.selectAuthentication,
      payload: res.data,
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.selectAuthenticationLoading,
      payload: false,
    });
  }
}

export function* authenticationSelect() {
  yield takeLatest(actionTypes.selectAuthenticationAsync, handleWorker);
}
