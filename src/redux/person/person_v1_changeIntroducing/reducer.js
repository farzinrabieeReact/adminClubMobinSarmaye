import {UPDATE_CHANGE_INTRODUCER} from "../../../typeActions"

const initState = {
    data: [],
  };

  export const change_introducer_v1_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case UPDATE_CHANGE_INTRODUCER:
        return { data: payload };
      default:
        return state;
    }
  };