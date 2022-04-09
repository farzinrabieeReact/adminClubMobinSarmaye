import store from "./../../../../redux/store";
import { actionTypes as actionTypesNotif } from "./../../../../redux/notificationAlert";
import { EMPTYALLREDUCERS } from "../../../../redux/type";
import { actionTypes as actionTypesLogOut } from "../../../modules/Auth/_redux/authRedux";

export const handleNotificationAlertTryUpdate = responseData => {
  const { dispatch } = store;

  if (responseData.status === 200 && responseData.data.response.is_successful) {
    dispatch({ type: actionTypesNotif.success });
    return true;
  } else if (
    responseData?.data?.error === "INVALID INPUT token: Not Authorized"
  ) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "زمان ورود شما به پایان رسید، لطفا دوباره لاگین کنید."
    });
    dispatch({ type: EMPTYALLREDUCERS });
    dispatch({ type: actionTypesLogOut.Logout });
    return false;
  } else if (
    responseData.status === 403 &&
    responseData.error === "PERMISSION DENIED"
  ) {
    dispatch({
      type: "ALERT",
      payload: {
        status: true,
        textAlert: `شما دسترسی به انجام این عملیات را ندارید.`,
        typeAlert: "warning"
      }
    });
    return false;
  } else if (responseData.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد"
    });
    return false;
  } else if (responseData.data.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });
    return false;
  } else if (
    responseData.status === 200 &&
    !responseData.data.response.is_successful
  ) {
    let textError = handelError(responseData.data.response.error_code);
    dispatch({ type: actionTypesNotif.warning, textAlert: textError });
    return false;
  } else {
    dispatch({
      type: actionTypesNotif.warning,
      textAlert: "مشکل رخ داده در لیست خطاها وجود ندارد."
    });
    return false;
  }
};

export const handleNotificationAlertCatch = () => {
  const { dispatch } = store;

  dispatch({
    type: "ALERT",
    payload: {
      status: true,
      textAlert: "در ارتباط با سرور مشکلی رخ داده است.",
      typeAlert: "error"
    }
  });
};

export const handleNotificationAlertTrySelect = item => {
  const { dispatch } = store;

  if (item?.data?.response?.is_successful) {
    return true;
  } else if (item.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });
    return false;
  } else if (item.data.error === "INVALID INPUT token: Not Authorized") {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "زمان ورود شما به پایان رسید، لطفا دوباره لاگین کنید."
    });
    dispatch({ type: EMPTYALLREDUCERS });
    dispatch({ type: actionTypesLogOut.Logout });
    return false;
  } else if (
    item.data.status === 403 &&
    item.data.error === "PERMISSION DENIED"
  ) {
    dispatch({
      textAlert: `شما دسترسی به انجام این عملیات را ندارید.`,
      type: actionTypesNotif.warning
    });
    return false;
  } else if (item.data.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });

    return false;
  } else if (!item.data.response.is_successful) {
    let textError = handelError(item.data.response.error_code);
    dispatch({ type: actionTypesNotif.warning, textAlert: textError });
    return false;
  } else {
    dispatch({
      type: actionTypesNotif.warning,
      textAlert: "مشکل رخ داده در لیست خطاها وجود ندارد."
    });
  }
};

const handelError = key => {
  switch (key) {
    case 701:
      return "اجازه انجام عملیات را ندارید. ";
    case 601:
      return "مقادیر ارسالی پارامترها معتبر نیستند.";
    case 401:
      return "خطای عمومی ";
    case 801:
      return "عدم رعایت وابستگی ها";
    case 602:
      return "یک فیلد اجباری ارسال نشده است.";
    case 603:
      return "مقدار یکی از فیلدهای ارسالی معتبر نیست.";
    case 604:
      return "نام یکی از فیلدهای ارسالی معتبر نیست.";
    case 605:
      return "کاربر مورد نظر یافت نشد";
    case 901:
      return "فروم مورد نظر یافت نشد. ";
    case 107101:
      return "سفارش با وضعیت کنسل شده قابل ثبت نیست";
    case 102101:
      return "امتیاز کاربر برای انجام عملیات کافی نیست";
    case 102201:
      return "امکان ویرایش مقادیر امتیاز وجود ندارد.";
    case 103101:
      return "ظرفیت مسابقه تکمیل شده است.";
    case 103201:
      return "امکان ویرایش مسابقه وجود ند ارد";
    case 103301:
      return "امکان نهاییسازی مسابقه وج ود ندا رد.";
    case 103401:
      return "شما قبال در این مسابقه ثبت نام کردهاید.";
    case 104101:
      return "وضعیت پیام معتبر نیست.";
    case 101101:
      return "ظرفیت دوره به پایان رسیده است.";
    case 101201:
      return "عدم امکان ویرایش دوره";
    case 101301:
      return "شما قبال در این دوره ثبت نام کرده اید.";
    case 101401:
      return "وضعیت ثبتنام در دوره نامعتبر است.";
    case 102301:
      return "امکان رزرو امتیاز وجود ندارد.";
    case 102401:
      return "مکان رولبک امتیاز وجود ندارد. ";
    case 102501:
      return "امکان نهاییسازی امتیاز وجود ندارد.";
    case 102601:
      return "امکان لغو امتیاز وجود ندارد. ";
    case 105101:
      return "امکان ویرایش امتیاز وجود ندارد.";
    case 105201:
      return "تصویر پروفایل بزرگتر از حد مجاز است.";
    case 109301:
      return "عضو قبلاً درخواست تغییر کارگزار مشابهی را ارسال کرده است.";
    case 105804:
      return "کد تایید را به درستی وارد نمایید";
    case 105805:
      return "در حال حاضر دسترسی به سامانه امکان‌پذیر نیست. لطفا بعدا تلاش فرمایید";
    case 110104:
      return "شما قبلا ثبت نام کرده اید";
    case 110103:
      return "عرضه اولیه غیر فعال می باشد";
    case 110301:
      return "این درخواست قبلا لغو شده است";
    case 110106:
      return "کاربر مورد نظر مشتری نمی باشد";
    case 105301:
      return "کاربر گرامی ایمیل شما ثبت نشده است";
    case 105302:
      return "خطا در ارسال پیامک رخ داده است";
    case 105401:
      return "کاربر گرامی شماره موبایل شما ثبت نشده است";
    case 105501:
      return "رکورد فراموشی یافت نشد لطفاً دوباره درخواست فراموشی رمز عبور بدهید";
    case 105601:
      return "اطلاعات نامعتبر است لطفاً از صحت لینک اطمینان حاصل کنید";
    case 105701:
      return "کاربر گرامی تعداد درخواستهای پیامک شما بیش از حد مجاز است ";
    case 105801:
      return "شما در حال حاضر عضو باشگاه هستید. اگر قصد بازیابی رمز عبور خود را دارید لطفاً به صفحه ورود مراجعه نمایید";
    case 105802:
      return "اطلاعاتی برای فعالسازی یافت نشد در صورتی که از اطلاعات وارد شده مطمئن هستید و این خطا را دریافت می کنید با واحد پشتیبانی مبین سرمایه (0211579) تماس بگیرید";
    case 105803:
      return "کد فعالسازی وارد نشده است";
    case 105901:
      return "رمز عبور بایستی شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک رقم و حداقل 8 کاراکتر باشد";
    case 105902:
      return "نام کاربری تکراری است لطفاً نام کاربری دیگری انتخاب نمایید";
    case 105903:
      return "مشتری گرامی از مهلت تغییر معرف شما بیش از سه روز گذاشته است و در حال حاضر شما مجاز به وارد کردن معرف نمی باشید";
    case 105904:
      return "مشتری گرامی قبلا معرف شما ثبت شده است";
    case 106101:
      return "خطایی در استعلام اعتبار رخ داده است";
    case 108701:
      return "در حال حاضر امکان درخواست این جایزه وجود ندارد";
    case 102303:
      return "کاربر عضو باشگاه نیست.";
    case 120102:
      return "این کد تخفیف قبلا استفاده شده است";
    case 101701:
      return "تاریخ پایان ثبت نام باید بعد از تاریخ امروز باشد";

    case 101601:
      return "تاریخ پایان باید بعد از تاریخ شروع باشد";
    case 101501:
      return "عدد منفی نباید وارد کنید";
    case 128101:
      return "این نقش تکراری است";

    default:
      return "در حال حاضر امکان این عملیات وجود ندارد";
  }
};
