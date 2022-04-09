
import AxiosCustom from '../../../app/common/components/apiConfig'


export const compatition_actions_insert = (data) =>{
    let config = { url: "insert_request" };

        let _data = {
            table: "competition",
            method_type: "insert_competition",
            data:data
        }

        return AxiosCustom(config ,_data)
}
