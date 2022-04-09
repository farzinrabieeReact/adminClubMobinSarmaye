import axios from "axios";
// import { getRandomNumber } from "../../method/getRandomNumber";

const AxiosCustomAuthentication = (_config, _data={}) => {

    let config = {

        // baseURL: `http://192.168.231.65:${getRandomNumber(7004, 7040)}/GradDB/V1/`,
        baseURL: getUrl(),
        // baseURL: "http://newadmin.mobinsb.net/GradDB/V1/",
        method: "POST",
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" },
        ..._config,
        data: {
            api_key: "cfd10742-89fc-487a-b882-eee16d2fac64",
            ..._data
        }
    }

    



    return axios(config);
};

export function getUrl() {

    let protocol = window.location.protocol
    let hostName = window.location.hostname

    if (!protocol || !hostName || hostName === 'localhost') {
        return "http://192.168.231.66:7001/ehraz/"
    }

    return `${protocol}//${hostName}/ehraz/`

}



export default AxiosCustomAuthentication;

