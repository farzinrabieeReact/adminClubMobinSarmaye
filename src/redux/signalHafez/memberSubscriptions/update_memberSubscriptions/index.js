import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const update_memberSubscriptions_document_dispatch = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'update_signal_document',
        data: data
    }

        return AxiosCustom(config ,_data)
}



