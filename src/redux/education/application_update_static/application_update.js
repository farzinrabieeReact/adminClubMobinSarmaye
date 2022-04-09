import AxiosCustom from "../../../app/common/components/apiConfig";

export const application_update = dataa => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "static",
    method_type: "update",
    data: dataa ? dataa : {}
  };
  return AxiosCustom(config, data);
};
