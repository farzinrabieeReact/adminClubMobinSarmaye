import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  educationCourseSelect: "[educationCourseSelect] Action",
  educationCourseSelectLoading: "[educationCourseSelectLoading] Action",
  educationCourseSelectAsync: "[educationCourseSelectAsync] Action"
};

const initialState = {
  data: [],
  size: 20,
  loading: false,
  total: 1000
};

export const education_course_select_Reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.educationCourseSelect:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total
      };
    case actionTypes.educationCourseSelectLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.educationCourseSelectLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "course",
    method_type: "select_courses",
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
      type: actionTypes.educationCourseSelect,
      payload: res.data.response
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.educationCourseSelectLoading,
      payload: false
    });
  }
}

export function* education_course_select_worker() {
  yield takeLatest(actionTypes.educationCourseSelectAsync, handleWorker);
}
