import AxiosCustom from "../../../app/common/components/apiConfig"

export const education_register_insert= (data) =>{
    let config = { url: "insert_request" };

        let _data = {
            table: "course",
            method_type: "register",
            data:{
                ...data
            }
        }
     
        return AxiosCustom(config ,_data)
}

