import AxiosCustom from "./../../../app/common/components/apiConfig"

export const course_deacvtive= (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: "deactivate_course",
            data:{
                _id:data
            }
        }
     
        return AxiosCustom(config ,_data)
}

