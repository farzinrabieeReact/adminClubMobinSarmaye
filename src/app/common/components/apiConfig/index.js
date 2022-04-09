import axios from "axios";
// import { getRandomNumber } from "../../method/getRandomNumber";

const AxiosCustom = (_config, _data) => {
  let tokenStr = localStorage.getItem("persist:admin")
    ? JSON.parse(localStorage.getItem("persist:admin")).authToken
    : null;
  let memberidStr = localStorage.getItem("persist:admin")
    ? JSON.parse(localStorage.getItem("persist:admin")).authMemberId
    : null;

  let token = tokenStr ? JSON.parse(tokenStr) : null;
  let member_id = memberidStr ? JSON.parse(memberidStr) : null;

  let config = {
    // baseURL: `http://192.168.231.65:${getRandomNumber(7004, 7040)}/GradDB/V1/`,
    baseURL: getUrl(),
    // baseURL: "http://newadmin.mobinsb.net/GradDB/V1/",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    ..._config,
    data: {
      api_key: "f8f8a4bc-62d4-4917-881b-1254004f0c0c",
      token: token,
      member_id: member_id,
      ..._data
      // table: "",
      // method_type: "login",
      // data: {
      //     "user": "ERFAN",
      //     "pass": "ERF1234"
      // }
    }
  };
  return axios(config);
};

export function getUrl() {
  let protocol = window.location.protocol;
  let hostName = window.location.hostname;

  if (!protocol || !hostName || hostName === "localhost") {
      // return "https://psradmin.gradientdp.com/GradDB/V1/"
    return "http://192.168.231.65:7005/GradDB/V1";
  }

  return `${protocol}//${hostName}/GradDB/V1/`;
}

export default AxiosCustom;
