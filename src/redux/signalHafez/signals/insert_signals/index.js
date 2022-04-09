import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const insert_signal_document_dispatch = (data) =>{
    
    let config = { url: "insert_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'insert_signal_document',
        data: data
    }

        return AxiosCustom(config ,_data)
}



