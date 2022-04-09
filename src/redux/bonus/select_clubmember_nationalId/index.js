import store from "../../store";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { actionTypes } from "../../notificationAlert";

export const select_clubmember_nationalId = async data => {
  const { dispatch } = store;

  let configMember = { url: "select_request" };

  let _dataMember = {
    table: "clubmember",
    method_type: "select",
    data: {
      national_id: data
    }
  };

  try {
    let responseMember = await AxiosCustom(configMember, _dataMember);

    let isOk = handleNotificationAlertTrySelect(responseMember);
    if (!isOk) {
      return false;
    }

    if (!responseMember.data.response.data.results.length) {
      dispatch({
        type: actionTypes.warning,
        textAlert: "کد ملی مورد نظر یافت نشد."
      });

      return false;
    } else {
      return responseMember;
    }
  } catch {
    handleNotificationAlertCatch();
    return false;
  }
};
