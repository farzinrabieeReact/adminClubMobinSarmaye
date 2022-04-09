import AxiosCustom from "../../../../app/common/components/apiConfig";

export const post_update = (id, state) => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "post",
    method_type: "update",
    data: id
      ? {
          _id: id,
          ...state
        }
      : {}
  };
  return AxiosCustom(config, data);
};
