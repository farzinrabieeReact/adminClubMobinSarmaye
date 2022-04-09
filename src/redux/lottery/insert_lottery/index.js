import AxiosCustom from "./../../../app/common/components/apiConfig"

export const insert_lottery_dispatch = (data) =>{
    
    let config = { url: "insert_request" };

    let _data = {
        table: "LOTTERY",
        method_type: 'insert_lottery_chance',
        data: data
    }

        return AxiosCustom(config ,_data)
}



