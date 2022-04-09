
import AxiosCustom from '../../../app/common/components/apiConfig';

export function clubmember_broker_customer(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "brokercustomer",
        method_type:"insert_new_broker_customer",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}