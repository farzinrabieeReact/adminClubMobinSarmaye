const initialState = {
  typeAlert: "",
  textAlert: "",
  status: false
};

export const actionTypes = {
  success: "[success] Action",
  error: "[error] Action",
  info: "[info] Action",
  warning: "[warning] Action",
  close: "[close] Action"
};

export function reducer_notificationAlert(
  state = initialState,
  { type, textAlert }
) {
  switch (type) {
    case actionTypes.success:
      return {
        typeAlert: "success",
        textAlert: textAlert ? textAlert : "با موفقیت انجام شد.",
        status: true
      };
    case actionTypes.error:
      return {
        typeAlert: "error",
        textAlert: textAlert ? textAlert : "متاسفانه انجام نشد.",
        status: true
      };
    case actionTypes.info:
      return {
        typeAlert: "info",
        textAlert: textAlert ? textAlert : "مقادیر ورودی اشتباه می باشد.",
        status: true
      };
    case actionTypes.warning:
      return {
        typeAlert: "warning",
        textAlert: textAlert ? textAlert : "اطلاعات ورودی دریافت نشد.",
        status: true
      };
    case actionTypes.close:
      return initialState;

    default:
      return state;
  }
}

// /////////////////typeAlert
// success
// info
// warning
// error
