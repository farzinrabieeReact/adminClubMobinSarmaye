import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectClubmemberRegistrationCount: "[selectClubmemberRegistrationCount] Action",
  selectClubmemberRegistrationCountAsync: "[selectClubmemberRegistrationCountAsync] Action",
};

const initState = {
    data:{
        total:0,
        results:[]
    }
}

export const clubmember_registration_count_reducer = (
  state = initState,
  { type, payload }
) => {
    switch (type) {
        case actionTypes.selectClubmemberRegistrationCount:
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
    method_type: "select_clubmember_registration_count",
    data: payload?.data ? payload.data : {},
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectClubmemberRegistrationCount,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* clubmemberRegistrationCount() {
  yield takeLatest(actionTypes.selectClubmemberRegistrationCountAsync, handleWorker);
}
