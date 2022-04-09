import {SELECT_INTRODUCTION_DETAIL, SELECT_INTRODUCTION_DETAIL_EMPTY} from "../../../typeActions";

const initState = {
    data: [],
  };

  export const introduction_v1_select_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case SELECT_INTRODUCTION_DETAIL:
        return { data: payload };
      case SELECT_INTRODUCTION_DETAIL_EMPTY:
        return initState;
      default:
        return state;
    }
  };