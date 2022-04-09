import AxiosCustom from "./../../../app/common/components/apiConfig"

export const Insert_activeIpo = (data,method) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "ipo",
            method_type: method,
            data:{
                _id:data
            }
        }
        return AxiosCustom(config ,_data)
}


