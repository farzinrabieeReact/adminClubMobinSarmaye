import ApiConfig from "../../../app/common/components/apiConfig";

export function competition_v1_actions_deactivate(data) {
  let config = { url: "update_request" };

  let _data = {
    table: "competition",
    method_type: "deactivate_competition",
    data: {
      ...data,
    },
  };
  return ApiConfig(config, _data);
}
