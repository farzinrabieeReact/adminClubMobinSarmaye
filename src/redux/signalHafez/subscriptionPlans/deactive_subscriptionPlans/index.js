import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const deactivate_subscriptionPlans_dispatch = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'deactivate_subscription_plan',
        data: data
    }

        return AxiosCustom(config ,_data)
}



