import ApiConfig from "../../../../../Containers/Common/Components/apiConfig"
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import {SELECT_INTRODUCTION_DETAIL} from "../../../typeActions";

export const introduction_v1_select_action = (IntroducingMemberId) => {

  return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select_with_profile_picture",
            
            data: {"_id": IntroducingMemberId}
            
        };
        
          try {
            let res = await ApiConfig(config, _data);
      
            if (res.data.status !== 200 || !res.data.response.is_successful) {
              handleNoAnswarApi(dispatch);
              return;
            }

            dispatch({
                type: SELECT_INTRODUCTION_DETAIL,
                payload: res.data.response.data.results,
            });
          } catch (err) {
            handleNoAnswarApi(dispatch);
          }          

    }
}





