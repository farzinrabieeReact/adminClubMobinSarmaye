
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'
import store from '../../../redux/store';
import { actionTypes as actionNotify } from './../../../redux/notificationAlert';

export const actionTypes = {
    selecClubmemberProfilePicture: "[selecClubmemberProfilePicture] Action",
    selecClubmemberProfilePictureAsync: "[selecClubmemberProfilePictureAsync] Action",
};

const initialState = {
    data: [],
    size: 50,
    total: 10000
};


export const select_clubmember_profile_picture_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selecClubmemberProfilePicture:
            return {
                ...state,
                data: payload.results,
                total: payload.total ? payload.total : 10000,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    let { dispatch } = store
    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select_with_profile_picture",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size,
        sort_by: payload.sort_by,
    }


    try {
        let res = yield axiosCustom(config, data)

        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return
        if (!res.data.response.data.results.length) {
            dispatch({
                type: actionNotify.warning,
                textAlert: "کد ملی مورد نظر یافت نشد."
            });

            return
        }

        yield put({ type: actionTypes.selecClubmemberProfilePicture, payload: res.data.response.data })


    } catch {
        handleNotificationAlertCatch()
    }


}


export function* selecClubmemberProfilePicture() {

    yield takeLatest(actionTypes.selecClubmemberProfilePictureAsync, handleWorker)
}