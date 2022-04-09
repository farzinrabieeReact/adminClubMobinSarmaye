import AxiosCustom from "../../../../app/common/components/apiConfig";

export const workWithUs_update = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "workwithus",
    method_type: "update",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
