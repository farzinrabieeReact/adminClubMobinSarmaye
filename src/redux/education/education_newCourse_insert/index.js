import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  educationInsertNewCourse: "[educationInsertNewCourse] Action",
  educationInsertNewCourseAsync: "[educationInsertNewCourseAsync] Action"
};

const initialState = {
  data: []
};

export const education_insert_Reducer_newCourse = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.educationInsertNewCourse:
      return {
        data: payload
      };
    default:
      return state;
  }
};

function* handleWorker(val) {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "course",
    method_type: "insert_course",
    data: val.payload
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.educationInsertNewCourse,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* educationInsertNewCourse() {
  yield takeLatest(actionTypes.educationInsertNewCourseAsync, handleWorker);
}




// import AxiosCustom from "../../../app/common/components/apiConfig"

// export const education_insert_newCourse= (data) =>{
//     let config = { url: "insert_request" };

//         let _data = {
//             table: "course",
//             method_type: "register",
//             data:{
//                 ...data
//             }
//         }
     
//         return AxiosCustom(config ,_data)
// }

