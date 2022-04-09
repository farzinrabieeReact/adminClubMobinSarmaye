import AxiosCustom from "./../../../app/common/components/apiConfig"

export const insert_notify_dispatch = (data , method_type) =>{
    
    let config = { url: "insert_request" };

    let _data = {
        table: "notification",
        method_type: method_type,
        data: data
    }

        return AxiosCustom(config ,_data)
}



