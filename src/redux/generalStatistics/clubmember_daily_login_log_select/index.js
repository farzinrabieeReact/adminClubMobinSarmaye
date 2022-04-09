import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectClubmemberDailyLogin: "[selectClubmemberDailyLogin] Action",
  selectClubmemberDailyLoginAsync: "[selectClubmemberDailyLoginAsync] Action",
};

const initState = {
    data:{
        total:0,
        results:[]
    }
}

export const clubmember_daily_login_log_reducer = (
  state = initState,
  { type, payload }
) => {
    switch (type) {
        case actionTypes.selectClubmemberDailyLogin:
            return { data: payload }
        default:
            return state;
    }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };
  let data = {
    table: "CLUBMEMBER",
    method_type: "select_daily_login_log",
    data: payload?.data ? data : {}
}

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectClubmemberDailyLogin,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* selectClubmemberLoginLog() {
  yield takeLatest(actionTypes.selectClubmemberDailyLoginAsync, handleWorker);
}
