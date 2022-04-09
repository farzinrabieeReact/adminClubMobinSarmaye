import AxiosCustom from "./../../../app/common/components/apiConfig"

export const update_notify_dispatch = (data) =>{
    
    let config = { url: "update_request" };

    let _data = {
        table: "notification",
        method_type: "update_time",
        data: data
    }

        return AxiosCustom(config ,_data)
}



