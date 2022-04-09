
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    selecClubmemberWithProfilePicture: "[selecClubmemberWithProfilePicture] Action",
    selecClubmemberWithProfilePictureloading: "[selecClubmemberWithProfilePictureloading] Action",
    selecClubmemberWithProfilePictureAsync: "[selecClubmemberWithProfilePictureAsync] Action",
};

const initialState = {
    data: [],
    size: 50,
    total: 10000,
    loading: false,
};


export const select_clubmember_with_profile_picture_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selecClubmemberWithProfilePicture:
            return {
                ...state,
                data: payload.results,
                total: payload.total
                    ? payload.total > 10000
                        ? 10000
                        : payload.total
                    : 0,
            }
        case actionTypes.selecClubmemberWithProfilePictureloading:
            return {
                ...state,
                loading: payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.selecClubmemberWithProfilePictureloading, payload: true })

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

        yield put({ type: actionTypes.selecClubmemberWithProfilePictureloading, payload: false })

        if (!isOk) return

        yield put({ type: actionTypes.selecClubmemberWithProfilePicture, payload: res.data.response.data })


    } catch  {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.selecClubmemberWithProfilePictureloading, payload: false })
    }


}


export function* selecClubmemberWithProfilePicture() {

    yield takeLatest(actionTypes.selecClubmemberWithProfilePictureAsync, handleWorker)
}