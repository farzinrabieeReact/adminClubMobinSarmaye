import AxiosCustom from "../../../app/common/components/apiConfig";

export const permision_update_role = data => {
  let config = { url: "update_request" };

  let _data = {
    table: "role",
    method_type: "update_role",
    data: data ? data : {}
  };

  return AxiosCustom(config, _data);
};
