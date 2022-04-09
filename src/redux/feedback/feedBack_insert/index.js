import AxiosCustom from "../../../app/common/components/apiConfig";

export function feedbackInsert(_data) {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "feedback",
    method_type: "insert_feedback",
    data: {
      ..._data
    }
  };

  return AxiosCustom(config, data);
}
