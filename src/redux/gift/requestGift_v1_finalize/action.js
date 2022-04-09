import ApiConfig from "../../../app/common/components/apiConfig";

export function request_gift_v1_actions_finalize(data, type) {
  let config = { url: "update_request" };

  let _data = {
    table: "gift",
    method_type: type === "SUBMITTED" ? "finalize" : "finalize_rejected_gift",
    data: data
  };

  return ApiConfig(config, _data);
}
