import AxiosCustom from "../../../../app/common/components/apiConfig";

export const news_update = (body, id) => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "news",
    method_type: "update",
    data: {
      _id: id,
      ...body
    }
  };
  return AxiosCustom(config, data);
};
