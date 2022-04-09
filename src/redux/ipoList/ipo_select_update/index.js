import AxiosCustom from '../../../app/common/components/apiConfig';




export function ipo_update(data, id) {

        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "Ipo",
                content: data,
                _id: id
            }
        }
        return AxiosCustom(config, _data)

    }