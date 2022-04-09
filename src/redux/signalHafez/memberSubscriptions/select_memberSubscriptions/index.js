import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "./../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "./../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectMemberSubscriptions: "[selectMemberSubscriptions] Action",
  selectMemberSubscriptionsLoad: "[selectMemberSubscriptionsLoad] Action",
  selectMemberSubscriptionsAsync: "[selectMemberSubscriptionsAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_memberSubscriptions_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectMemberSubscriptions:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selectMemberSubscriptionsLoad:
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
    table: "HADAFHAFEZ",
    method_type: "select_member_subscriptions",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };

  yield put({
    type: actionTypes.selectMemberSubscriptionsLoad,
    payload: true
  });

  try {

    let res = yield axiosCustom(config, data);
    let isOk = handleNotificationAlertTrySelect(res);

    if (!isOk) return;

    yield put({
      type: actionTypes.selectMemberSubscriptions,
      payload: res.data.response.data
    });

  }
  catch {
    handleNotificationAlertCatch();
  }
  finally {

    yield put({
      type: actionTypes.selectMemberSubscriptionsLoad,
      payload: false
    });

  }
}

export function* selectMemberSubscriptions() {
  yield takeLatest(actionTypes.selectMemberSubscriptionsAsync, handleWorker);
}
