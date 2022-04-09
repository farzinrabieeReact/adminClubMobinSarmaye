import AxiosCustom from "./../../../../app/common/components/apiConfig"

export const active_signals_dispatch = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "HADAFHAFEZ",
        method_type: 'activate_signal_document',
        data: data
    }

        return AxiosCustom(config ,_data)
}



