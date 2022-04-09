import AxiosCustom from '../../../app/common/components/apiConfig';

export function clubmember_send_kyc_otp(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "clubmember",
        method_type:"send_kyc_otp",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}