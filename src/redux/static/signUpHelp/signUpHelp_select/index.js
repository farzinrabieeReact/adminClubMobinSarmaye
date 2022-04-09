import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
    signUpHelpSelect: "[signUpHelp] Action ",
    signUpHelpSelectAsync: "[signUpHelpSelectAsync] Action",
};

const initialState = {
    data: [],
};

export const signUpHelp_select_static_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.signUpHelpSelect:
            return {
                // ...state,
                data:payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {


    let config = { url: "select_request" };

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "registration_guide"
        }
    }

    try {
        let res = yield AxiosCustom(config, _data)
        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.signUpHelpSelect, payload: res.data.response.data.results})


    } catch  {
        handleNotificationAlertCatch()
    }



}

export function* signUpHelpSelectStatic() {

    yield takeLatest(actionTypes.signUpHelpSelectAsync, handleWorker)
}