import AxiosCustom from "../../../../app/common/components/apiConfig";

export const update_static_aboutUS = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "static",
    method_type: "update",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
