import ApiConfig from "../../../app/common/components/apiConfig";

export function request_gift_v1_actions_unregister(data, type) {
  let config = { url: "update_request" };

  let _data = {
    table: "gift",
    method_type:
      type === "SUBMITTED" ? "unregister" : "unregister_finalized_gift",
    data: data
  };

  return ApiConfig(config, _data);
}
