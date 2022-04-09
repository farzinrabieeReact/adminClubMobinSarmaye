import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const insert_subscriptionPlans_dispatch = (data) =>{
    
    let config = { url: "insert_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'insert_new_subscription_plan',
        data: data
    }

        return AxiosCustom(config ,_data)
}



