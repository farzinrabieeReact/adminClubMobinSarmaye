// import {
//     ORDERS_V1_SELECT , ORDERS_V1_SELECT_MORE
// } from "../../../typeActions";
//
//
// const initState = {
//     data: [],
//     isOk: false,
//     from : 0
// }
//
//
// export const orders_select_Reducer = (state = initState, { type, payload }) => {
//
//     switch (type) {
//         case ORDERS_V1_SELECT:
//             return {
//                 data: payload,
//                 from : 0
//             }
//         case  ORDERS_V1_SELECT_MORE:
//             return {
//                 data: [
//                     ...state.data,
//                     ...payload
//                 ],
//                 from: state.from + 20
//             }
//         default:
//             return state;
//     }
// }
import { ORDERS_V1_SELECT } from "../../../typeActions";

const initState = {
  data: [],
  isOk: false,
  from: 0,
  size: 20,
  total: 10000,
};

export const orders_select_Reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ORDERS_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total
          ? payload.response.data.total
          : 10000,
      };

    default:
      return state;
  }
};
