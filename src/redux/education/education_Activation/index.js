import AxiosCustom from "./../../../app/common/components/apiConfig"

export const course_activation= (type,id) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: type,
            data:{
                _id:id
            }
        }
     
        return AxiosCustom(config ,_data)
}

