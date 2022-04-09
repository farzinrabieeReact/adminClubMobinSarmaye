import store from "./../../../redux/store";
import AxiosCustom from "./../../../app/common/components/apiConfig"
import{handleNotificationAlertTrySelect , handleNotificationAlertCatch } from './../../../app/common/method/handleNotificationAlert'
import {actionTypes} from './../../../redux/notificationAlert';

export const insert_bonus_dispatch = async (data) =>{

    const { dispatch } = store;

    let configMember = { url: "select_request" };

    let _dataMember = {
        table: "clubmember",
        method_type: "select",
        data: {
            national_id: data.national_id
        }
    }

    try {

        let responseMember = await AxiosCustom(configMember, _dataMember)

        let isOk = handleNotificationAlertTrySelect(responseMember)
        if(!isOk){
                return false
        }

        if (!responseMember.data.response.data.results.length) {
            dispatch({
                type: actionTypes.warning,
                textAlert: "کد ملی مورد نظر یافت نشد."
            });
         
            return false
        }

        else {
            return responseMember
        }
    }

    catch {
        handleNotificationAlertCatch()
        return false
    }
}



