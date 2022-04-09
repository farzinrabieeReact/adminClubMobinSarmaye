import AxiosCustom from "../../../app/common/components/apiConfig"

export const education_insert_newCourse= (data) =>{
    let config = { url: "insert_request" };

        let _data = {
            table: "course",
            method_type: "insert_course",
            data:{
                ...data
            }
        }
     
        return AxiosCustom(config ,_data)
}
