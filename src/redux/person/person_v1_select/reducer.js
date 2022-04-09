import { PROFILE_V1_SELECT, PROFILE_V1_SELECT_ORDER, PROFILE_V1_SELECT_EMPTY } from "../../../typeActions";

const initState = {
    data: [],
    dataOrder: [],
    isOk: false,
}


export const profile_v1_reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PROFILE_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                isOk: true,
            }

        case PROFILE_V1_SELECT_ORDER:
            return {
                ...state,
                dataOrder: payload.response.data.results,
                isOk: state.isOk,
            }

        case PROFILE_V1_SELECT_EMPTY:
            return {
                data: [],
                dataOrder: [],
                isOk: false,
            }

        default:
            return state
    }

}