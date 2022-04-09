import ApiConfig from "../../../app/common/components/apiConfig";

export function competition_activate(data) {
  let config = { url: "update_request" };

  let _data = {
    table: "competition",
    method_type: "activate_competition",
    data: {
      ...data,
    },
  };
  return ApiConfig(config, _data);
}
