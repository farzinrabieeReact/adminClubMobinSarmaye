import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {
  handleAlertMethodSelect,
  handleNoAnswarApi
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { UPDATE_CHANGE_INTRODUCER } from "../../../typeActions";
import { handleAlertAndSelectApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi/index.js";
import { introduction_v1_select_action } from "./../person_v1_introducing_details/action";

export const update_change_introducer = (
  memberId,
  state,
  introducingMemberId
) => {
  return async dispatch => {
    let configMember = { url: "select_request" };

    let _dataMember = {
      table: "clubmember",
      method_type: "select",
      data: {
        national_id: state
      }
    };

    try {
      let responseMember = await ApiConfig(configMember, _dataMember);

      if (!responseMember.data.response.data.results.length) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "کد ملی مورد نظر یافت نشد.",
            typeAlert: "error"
          }
        });
      } else {
        let introducerMemberId =
          responseMember.data.response.data.results[0].id;

        let isOk = handleAlertMethodSelect(responseMember.data, dispatch);
        if (!isOk) {
          return;
        }

        let config = { url: "update_request" };

        let _data = {
          table: "clubmember",
          method_type: "change_introducer",

          data: {
            _id: memberId,
            introducing_member_id: null,
            introducing_member_national_id: state,
            introducing_member_automation_id: null
          }
        };

        try {
          let res = await ApiConfig(config, _data);

          handleAlertAndSelectApi(
            res.data,
            introduction_v1_select_action,
            dispatch,
            introducerMemberId
          );

          dispatch({
            type: UPDATE_CHANGE_INTRODUCER,
            payload: res.data.response.data.id
          });
        } catch (err) {
          handleNoAnswarApi(dispatch);
        }
      }
    } catch {
      handleNoAnswarApi(dispatch);
      return;
    }
  };
};
