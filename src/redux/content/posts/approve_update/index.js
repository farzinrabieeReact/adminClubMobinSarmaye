import AxiosCustom from "../../../../app/common/components/apiConfig";

export const approve_update = id => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "post",
    method_type: "approve_post",
    data: id
      ? {
          _id: id
        }
      : {}
  };
  return AxiosCustom(config, data);
};
