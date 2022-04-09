import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  courseSelectRegistration: "[courseSelectRegistration] Action",
  courseSelectRegistrationLoading: "[courseSelectRegistrationLoading] Action",
  courseSelectRegistrationAsync: "[courseSelectRegistrationAsync] Action"
};

const initialState = {
  data: [],
  size: 20,
  total: 1000,
  loading: false
};

export const course_select_registration = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.courseSelectRegistration:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total
      };
    case actionTypes.courseSelectRegistrationLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({
    type: actionTypes.courseSelectRegistrationLoading,
    payload: true
  });
  let config = {
    url: "select_request"
  };
  //   data = {
  //     table: "course",
  //     method_type: "select_registrations",
  //     from: payload?.from ? (payload.from - 1) * payload.size : 0,
  //     size: payload?.size,
  //     data: payload?.data ? payload.data : {},
  //     sort_by: payload?.sort_by ? payload?.sort_by : {},
  //   };
  let data = {
    table: "course",
    method_type: "select_registrations",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {}
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.courseSelectRegistration,
      payload: res.data.response
    });

    if (!flag) return;
  } catch (error) {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.courseSelectRegistrationLoading,
      payload: false
    });
  }
}

export function* education_select_registration() {
  yield takeLatest(actionTypes.courseSelectRegistrationAsync, handleWorker);
}
