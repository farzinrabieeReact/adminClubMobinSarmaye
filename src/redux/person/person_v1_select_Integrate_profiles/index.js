
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";


export const actionTypes = {
    selectPofilePicture: "[selectPofilePicture] Action",
    selectPofilePictureEmpty: "[selectPofilePictureEmpty] Action",
    selectPofilePictureAsync: "[selectPofilePictureAsync] Action",
};

const initialState = {
    data: [],
    national_id: "",
};


export const person_v1_profile_picture = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selectPofilePicture:
            return {
                data: payload.data.response.data.results,
                national_id: payload.national_id,
            }
        case actionTypes.selectPofilePictureEmpty:
            return initialState
        default:
            return state
    }
}

function* handleWorker({payload}) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select_with_profile_picture",
        from: 0,
        size: 10000,
        data:{
            national_id:payload
        }
    }


    try {
        let res = yield AxiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        let dataa ={
            data: res.data,
            national_id: payload
        }
        yield put({ type: actionTypes.selectPofilePicture, payload: dataa })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function*personProfilePicture() {

    yield takeLatest(actionTypes.selectPofilePictureAsync, handleWorker)
}