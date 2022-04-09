import AxiosCustom from "./../../../app/common/components/apiConfig"

export const course_activation= (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: "update_course",
            data:{
                ...data
            }
        }
     
        return AxiosCustom(config ,_data)
}

