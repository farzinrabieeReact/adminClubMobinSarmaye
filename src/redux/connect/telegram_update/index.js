import { CompassCalibrationOutlined } from "@material-ui/icons";
import AxiosCustom from "../../../app/common/components/apiConfig";






export const telegram_update = (data,id)=>{

    let config = { url: "update_request" };

    let _data = {
        table: "static",
        method_type: "update",
        data: {
            name: "telegram_links",
            content: data,
            _id: id
        }
    }
    return AxiosCustom(config,_data)
}