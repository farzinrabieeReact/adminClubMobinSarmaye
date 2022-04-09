import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectClubmemberBourseCode: "[selectClubmemberBourseCode] Action",
  selectClubmemberBourseCodeAsync: "[selectClubmemberBourseCodeAsync] Action",
};

const initState = {
    data:{
        total:0,
        results:[]
    }
}

export const clubmember_bourse_code_count_reducer = (
  state = initState,
  { type, payload }
) => {
    switch (type) {
        case actionTypes.selectClubmemberBourseCode:
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
    method_type: "select_clubmember_by_bourse_code_count",
    data: payload?.data ? data : {}
}

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectClubmemberBourseCode,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* selectClubmemberBourseCode() {
  yield takeLatest(actionTypes.selectClubmemberBourseCodeAsync, handleWorker);
}
