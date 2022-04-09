import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const deactivate_memberSubscriptions_dispatch = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'unregister',
        data: data
    }

        return AxiosCustom(config ,_data)
}



