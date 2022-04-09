import AxiosCustom from "../../../../app/common/components/apiConfig";

export const signupHelp_update_action = (data, id) => {
  let config = { url: "update_request" };

  let _data = {
    table: "static",
    method_type: "update",
    data: {
      name: "registration_guide",
      content: data,
      _id: id,
    },
  };

  return AxiosCustom(config, _data);
};
