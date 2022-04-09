import AxiosCustom from '../../../../app/common/components/apiConfig'

export const account_update_action = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "static",
        method_type: "update",
        data: data ? data : {}
    }

        return AxiosCustom(config ,_data)
}



