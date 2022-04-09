import axios from "axios";
// import AxiosCustom from "../../../common/components/apiConfig";
import GetUser from "../../../common/components/apiConfig/getUser";

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export async function login(national_id, password) {
  

  let config = {
    url: "login",
  };

  let data = {
    table: "login",
    method_type: "login",
    token: null,
    member_id: null,
    data: {
      user: national_id,
      pass: password,
    },
  };

    return await GetUser(config, data);
    // let {token} = res.data.response.data
    // console.log("token", token);
    // return res.data.response.data;
  
  // // let dataa =  AxiosCustom(config, data)
  // return axios.post(LOGIN_URL, { email, password });
}

export function register(national_id, fullname, username, password) {
  return axios.post(REGISTER_URL, { national_id, fullname, username, password });
}

export function requestPassword(national_id) {
  return axios.post(REQUEST_PASSWORD_URL, { national_id });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
