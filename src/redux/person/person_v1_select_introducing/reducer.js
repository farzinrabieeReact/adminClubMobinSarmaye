import { PROFILE_V1_SELECT_INTRODUCING } from "../../../typeActions";

const initState = {
    data: [],
    size:10,
    total:5000
}


export const profile_v1_reducer_intruducing = (state = initState, { type, payload }) => {
    switch (type) {
        case PROFILE_V1_SELECT_INTRODUCING:
            return {
                ...state,
                data: payload.response.data.results,
                total:payload.response.data.total?payload.response.data.total:state.total
            }
        default:
            return state
    }

}