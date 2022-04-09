// import {
//     ORDERS_V1_SELECT, ORDERS_V1_SELECT_MORE
// } from "../../../typeActions";
// import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
// import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
//
//
//
//
// export function orders_v1_actions_select(from, data, method) {
//
//     return async (dispatch) => {
//
//         let config = { url: "select_request" };
//
//         let _data = {
//             table: "order",
//             method_type: method ? method : 'select_aggregates',
//             from: from ? from : 0,
//             size: 20,
//             data: data ? data : {}
//         }
//
//         try {
//             dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
//
//             let response = await ApiConfig(config, _data)
//
//             if (response.data.status !== 200 || !response.data.response.is_successful) {
//                 handleNoAnswarApi(dispatch)
//                 return
//             }
//
//
//             if (from) {
//                 dispatch({ type: ORDERS_V1_SELECT_MORE, payload: response.data.response.data.results })
//                 if (!response.data.response.data.results.length) {
//                     dispatch({ type: "ALERT", payload: { status: true, textAlert: "اعلان بیشتری وجود ندارد", typeAlert: "warning" } })
//                 }
//             } else {
//                 dispatch({ type: ORDERS_V1_SELECT, payload:  response.data.response.data.results })
//             }
//
//
//         } catch (err) {
//             handleNoAnswarApi(dispatch)
//         }
//
//     }
// }

import { ORDERS_V1_SELECT } from "../../../typeActions";
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {
  handleAlertMethodSelect,
  handleNoAnswarApi,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";

export function orders_v1_actions_select(from, data, size, method, sort_by) {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "order",
      method_type: method ? method : "select_aggregates",
      from: from ? (from - 1) * size : 0,
      size: size,
      data: data ? data : {},
      sort_by: sort_by,
    };

    try {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "در حال بازخوانی",
          typeAlert: "info",
        },
      });

      let response = await ApiConfig(config, _data);

      let isOk = handleAlertMethodSelect(response.data, dispatch);
      if (!isOk) {
        return;
      }

      // if (
      //   response.data.status !== 200 ||
      //   !response.data.response.is_successful
      // ) {
      //   handleNoAnswarApi(dispatch);
      //   return;
      // }

      if (!response.data.response.data.results.length) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "اعلان بیشتری وجود ندارد",
            typeAlert: "warning",
          },
        });
      }

      dispatch({ type: ORDERS_V1_SELECT, payload: response.data });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
