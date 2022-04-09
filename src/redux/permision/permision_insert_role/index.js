import AxiosCustom from "../../../app/common/components/apiConfig";

export const permision_insert_role = data => {
  let config = { url: "insert_request" };

  let _data = {
    table: "role",
    method_type: "insert_role",
    data: data ? data : {}
  };

  return AxiosCustom(config, _data);
};
