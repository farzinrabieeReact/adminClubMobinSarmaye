import AxiosCustom from "./../../../app/common/components/apiConfig"

export const gift_insert_dispatch = (data) =>{
    let config = { url: "insert_request" };

        let _data = {
            table: "gift",
            method_type: "insert_gift",
            data
        }

        return AxiosCustom(config ,_data)
}



