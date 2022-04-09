import AxiosCustom from "./../../../app/common/components/apiConfig"

export const course_active= (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: "activate_course",
            data:{
                _id:data
            }
        }
     
        return AxiosCustom(config ,_data)
}

