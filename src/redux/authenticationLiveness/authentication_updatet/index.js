import AxiosCustomAuthentication from "../../../app/common/components/apiConfigAuthenticationLiveness";

export const authenticationLiveness_update = (item) => {
  let config = {
    url: "change_state",
  };
  return AxiosCustomAuthentication(config, item);
};
