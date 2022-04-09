export let PREMISSON_DATA = [
  {
    id: "CLUBMEMBER\\.permisson_manager CLUBMEMBER\\.update",
    name: "سطح دسترسی",
    active: false,
    children: [],
  },
  {
    id: "CLUBMEMBER\\..*",
    name: "مدیریت کاربران",
    active: false,
    children: [
      {
        id: "CLUBMEMBER\\.select",
        name: "لیست کاربران",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_with_profile_picture",
        name: "لیست کاربران با عکس",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.update",
        name: "ویرایش کاربر",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.deactivate_club_member",
        name: "غیر فعال کردن کاربر",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.activate_club_member",
        name: "فعال کردن کاربر",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.change_password",
        name: "تغییر پسورد کاربر",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_total_bonus",
        name: "تعداد امتیازات",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_clubmember_count",
        name: "تعداد کاربران",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_clubmember_registration_count",
        name: "تعداد کاربران ثبت نام شده",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_clubmember_by_bourse_code_count",
        name: "تعداد کاربران با کد بورسی",
        active: false,
      },
      {
        id: "CLUBMEMBER\\.select_login_log",
        name: "لیست ورود و خروج کاربران",
        active: false,
      },
    ],
  },
  {
    id: "BONUS\\..*",
    name: "امتیازات",
    active: false,
    children: [
      {
        id: "BONUS\\.select",
        name: "لیست امتیازات",
        active: false,
      },
      {
        id: "BONUS\\.select_aggregated_bonus",
        name: "گزارش تجمیعی امتیازات ",
        active: false,
      },
      {
        id: "BONUS\\.select_by_national_id",
        name: "جستجوی امتیازات بر اساس کد ملی",
        active: false,
      },
      {
        id: "BONUS\\.select_bonus_requests",
        name: "لیست درخواست های امتیازات",
        active: false,
      },
      {
        id: "BONUS\\.select_bonus_requests_by_national_id",
        name: "جستجوی درخواست ها با کدملی",
        active: false,
      },
      {
        id: "BONUS\\.reserve_bonus",
        name: "رزور امتیاز",
        active: false,
      },
      {
        id: "BONUS\\.add_bonus",
        name: "افزودن امتیاز",
        active: false,
      },
      {
        id: "BONUS\\.remove_bonus",
        name: "کسر امتیاز",
        active: false,
      },
      {
        id: "BONUS\\.finalize_bonus",
        name: "تایید امتیاز",
        active: false,
      },
      {
        id: "BONUS\\.reject_bonus",
        name: "رد امتیاز",
        active: false,
      },
    ],
  },

  {
    id: "HADAFHAFEZ\\..*",
    name: "سیگنال های هدف حافظ",
    active: false,
    children: [
      {
        id: "HADAFHAFEZ\\.select_uploaded_documents",
        name: "لیست سیگنال ها",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.insert_signal_document",
        name: "سیگنال جدید",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.update_signal_document",
        name: "ویرایش سیگنال ها",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.activate_signal_document",
        name: "فعال کردن سیگنال ها",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.deactivate_signal_document",
        name: "غیر فعال کردن سیگنال ها",
        active: false,
      },

      {
        id: "HADAFHAFEZ\\.select_subscription_plans",
        name: "لیست پلن های اشتراک",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.insert_new_subscription_plan",
        name: "پلن اشتراک جدید",
        active: false,
      }, {
        id: "HADAFHAFEZ\\.update_subscription_plan",
        name: "ویرایش پلن های اشتراک",
        active: false,
      }, {
        id: "HADAFHAFEZ\\.activate_subscription_plan",
        name: "فعال کردن پلن های اشتراک",
        active: false,
      },
      {
        id: "HADAFHAFEZ\\.deactivate_subscription_plan",
        name: "غیر فعال کردن پلن های اشتراک",
        active: false,
      },

      {
        id: "HADAFHAFEZ\\.select_member_subscriptions",
        name: "لیست سابقه کاربران",
        active: false,
      },
    ],
  },

  {
    id: "BROKERCUSTOMER\\..*",
    name: "درخواست های مشتری شدن",
    active: false,
    children: [
      {
        id: "BROKERCUSTOMER\\.select_broker_customers",
        name: "لیست درخواست های مشتری شدن",
        active: false,
      },
      {
        id: "BROKERCUSTOMER\\.cancel_broker_customer_request_by_id",
        name: "لغو درخواست مشتری شدن با شناسه",
        active: false,
      },
    ],
  },

  {
    id: "CHANGEBROKER\\..*",
    name: "درخواست های تغییر ناظر",
    active: false,
    children: [
      {
        id: "CHANGEBROKER\\.select_change_brokers",
        name: "لیست تغییرهای ناظر",
        active: false,
      },
      {
        id: "CHANGEBROKER\\.select_change_brokers_this_year",
        name: "لیست تغییرهای ناظر - امسال",
        active: false,
      },
      {
        id: "CHANGEBROKER\\.select_change_brokers_by_id",
        name: "لیست تغییرات ناظر با شناسه",
        active: false,
      },
      {
        id: "CHANGEBROKER\\.insert_change_broker",
        name: "ثبت درخواست تغییر ناظر",
        active: false,
      },
      {
        id: "CHANGEBROKER\\.cancel_change_broker_request_by_id",
        name: "رد درخواست تغییر ناظر با شناسه",
        active: false,
      },
    ],
  },

  {
    id: "COMPETITION\\..*",
    name: "مسابقات",
    active: false,
    children: [
      {
        id: "COMPETITION\\.select_competitions",
        name: "لیست مسابقات",
        active: false,
      },
      {
        id: "COMPETITION\\.select_in_range_competitions",
        name: "مشاهده مسابقات در حال برگزاری",
        active: false,
      },
      {
        id: "COMPETITION\\.select_participations",
        name: "مشاهده شرکت‌کنندگان",
        active: false,
      },
      {
        id: "COMPETITION\\.select_performance_by_id",
        name: "مشاهده آمار مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.insert_competition",
        name: "تعریف مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.participate",
        name: "َشرکت در مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.update_competition",
        name: "ویرایش مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.deactivate_competition",
        name: "غیرفعال کردن مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.activate_competition",
        name: "فعال کردن مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.update_participation_answern",
        name: "بروزرسانی پاسخ شرکت‌کننده در مسابقه",
        active: false,
      },
      {
        id: "COMPETITION\\.update_competition_answer",
        name: "َبروزرسانی پاسخ صحیح مسابقه",
        active: false,
      },
    ],
  },
  {
    id: "FEEDBACK\\..*",
    name: "صدای مشتری",
    active: false,
    children: [
      {
        id: "FEEDBACK\\.select",
        name: "لیست صدای مشتری",
        active: false,
      },
      {
        id: "FEEDBACK\\.update",
        name: "جوابدهی به سوالات صدای مشتری",
        active: false,
      },
    ],
  },
  {
    id: "COURSE\\..*",
    name: "دوره های آموزشی",
    active: false,
    children: [
      {
        id: "COURSE\\.select_courses",
        name: "لیست دوره های آموزشی",
        active: false,
      },
      {
        id: "COURSE\\.insert_course",
        name: "افزودن دوره آموزشی",
        active: false,
      },
      {
        id: "COURSE\\.register",
        name: "ثبت نام در دوره آموزشی",
        active: false,
      },
      {
        id: "COURSE\\.update_course",
        name: "ویرایش دوره های آموزشی",
        active: false,
      },
      {
        id: "COURSE\\.deactivate_course",
        name: "غیرفعال کردن دوره آموزشی",
        active: false,
      },
      {
        id: "COURSE\\.activate_course",
        name: "َفعال کردن مسابقه",
        active: false,
      },
      {
        id: "COURSE\\.unregister",
        name: "لغو ثبت نام در دوره",
        active: false,
      },
    ],
  },

  {
    id: "CREDIT\\..*",
    name: "اعتبارات",
    active: false,
    children: [
      {
        id: "CREDIT\\.select",
        name: "لیست اعتبارات",
        active: false,
      },
    ],
  },

  {
    id: "DISCOUNTCODE\\..*",
    name: "کد های تخفیف",
    active: false,
    children: [
      {
        id: "DISCOUNTCODE\\.select",
        name: "لیست کدهای تخفیف",
        active: false,
      },
      {
        id: "DISCOUNTCODE\\.insert_single_discount_code",
        name: "درج تکی کد تخفیف",
        active: false,
      },
      {
        id: "DISCOUNTCODE\\.insert_bulk_discount_code",
        name: "درج دسته ای کد تخفیف",
        active: false,
      },
      {
        id: "DISCOUNTCODE\\.delete",
        name: "حذف کد تخفیف",
        active: false,
      },
      {
        id: "DISCOUNTCODE\\.register",
        name: "تعریف کد تخفیف جدید",
        active: false,
      },
      {
        id: "DISCOUNTCODE\\.update_time",
        name: "تمدید کد تخفیف",
        active: false,
      },
    ],
  },
  {
    id: "FAQ\\..*",
    name: "سوالات متداول",
    active: false,
    children: [
      {
        id: "FAQ\\.select",
        name: "لیست سوالات متداول",
        active: false,
      },
      {
        id: "FAQ\\.insert",
        name: "افزودن سوالات متداول",
        active: false,
      },
      {
        id: "FAQ\\.update",
        name: "ویرایش سوالات متداول",
        active: false,
      },
      {
        id: "FAQ\\.delete",
        name: "حذف سوالات متداول",
        active: false,
      },
    ],
  },

  {
    id: "FORUM\\..*",
    name: "تالارهای گفتگو",
    active: false,
    children: [
      {
        id: "FORUM\\.select",
        name: "لیست تالارهای گفتگو",
        active: false,
      },
      {
        id: "FORUM\\.insert",
        name: "افزودن تالار گفتگو",
        active: false,
      },
      {
        id: "FORUM\\.update",
        name: "ویرایش تالار گفتگو",
        active: false,
      },
      {
        id: "FORUM\\.remove_forum",
        name: "غیرفعال کردن تالار گقتگو",
        active: false,
      },
      {
        id: "FORUM\\.enable_forum",
        name: "فعال کردن تالار گفتگو",
        active: false,
      },
    ],
  },
  {
    id: "GIFT\\..*",
    name: "جوایز",
    active: false,
    children: [
      {
        id: "GIFT\\.select_gifts",
        name: "لیست جوایز",
        active: false,
      },
      {
        id: "GIFT\\.select_active_gift_names",
        name: "لیست جوایز فعال",
        active: false,
      },
      {
        id: "GIFT\\.select_active_categories",
        name: "لیست گروه های فعال",
        active: false,
      },
      {
        id: "GIFT\\.select_active_subcategories",
        name: "لیست زیر گروه های فعال",
        active: false,
      },
      {
        id: "GIFT\\.select_registrations",
        name: "لیست درخواست‌های جوایز",
        active: false,
      },
      {
        id: "GIFT\\.insert_gift",
        name: "َافزودن جایزه",
        active: false,
      },
      {
        id: "GIFT\\.register",
        name: "ثبت درخواست جایزه",
        active: false,
      },
      {
        id: "GIFT\\.update_gift",
        name: "ویرایش جایزه",
        active: false,
      },
      {
        id: "GIFT\\.activate_gift",
        name: "فعال کردن جایزه",
        active: false,
      },
      {
        id: "GIFT\\.unregister",
        name: "رد جوایز",
        active: false,
      },
      {
        id: "GIFT\\.finalize",
        name: "َنهایی کردن جایزه",
        active: false,
      },
      {
        id: "GIFT\\.system_unregister",
        name: "َرد کردن جوایز سیستمی",
        active: false,
      },
      {
        id: "GIFT\\.system_finalize",
        name: "َرد کردن جوایز سیستمی",
        active: false,
      },
      {
        id: "GIFT\\.select_aggregated_user_registrations",
        name: "گزارش تجمعی جوایز",
        active: false,
      },
    ],
  },

  {
    id: "ONLINECHARGE\\..*",
    name: "جوایز نقدی",
    active: false,
    children: [
      {
        id: "ONLINECHARGE\\.select_registrations",
        name: "گزارش جوایز شارژ نقدی",
        active: false,
      },
    ],
  },
  {
    id: "IPO\\..*",
    name: "عرضه اولیه",
    active: false,
    children: [
      {
        id: "IPO\\.select_ipos",
        name: "لیست عرضه های اولیه",
        active: false,
      },
      {
        id: "IPO\\.select_registered_ipos",
        name: "لیست درخواست های عرضه اولیه",
        active: false,
      },
      {
        id: "IPO\\.select_registered_ipos_csv",
        name: "خروجی اکسل از درخواست ها",
        active: false,
      },
      {
        id: "IPO\\.insert_ipo",
        name: "افزودن نماد عرضه اولیه",
        active: false,
      },
      {
        id: "IPO\\.register_ipo",
        name: "ثبت درخواست عرضه اولیه",
        active: false,
      },
      {
        id: "IPO\\.deactivate_ipo",
        name: "َغیرفعال کردن عرضه اولیه",
        active: false,
      },
      {
        id: "IPO\\.activate_ipo",
        name: "فعال کردن عرضه اولیه",
        active: false,
      },
      {
        id: "IPO\\.select_user_status",
        name: "احراز پیش شرط ها",
        active: false,
      },
    ],
  },

  {
    id: "NOTIFICATION\\..*",
    name: "اعلانات",
    active: false,
    children: [
      {
        id: "NOTIFICATION\\.select_notifications",
        name: "لیست اعلانات",
        active: false,
      },
      {
        id: "NOTIFICATION\\.select_notifications_by_national_id",
        name: "لیست اعلانات یک شخص با کدملی",
        active: false,
      },
      {
        id: "NOTIFICATION\\.insert_web_notification",
        name: "ارسال اعلان وب",
        active: false,
      },
      {
        id: "NOTIFICATION\\.insert_offline_email_notification",
        name: " ارسال اعلان آفلاین به ایمیل ",
        active: false,
      },
      {
        id: "NOTIFICATION\\.insert_offline_sms_notification",
        name: "ارسال اعلان آفلاین به پیامک",
        active: false,
      },
      {
        id: "NOTIFICATION\\.insert_immediate_email_notification",
        name: "َارسال اعلان فوری به ایمیل",
        active: false,
      },
      {
        id: "NOTIFICATION\\.delete",
        name: "حذف اعلان",
        active: false,
      },
      {
        id: "NOTIFICATION\\.update_time",
        name: "تمدید اعلان",
        active: false,
      },
    ],
  },

  {
    id: "OFFLINEORDER\\..*",
    name: "سفارشات آفلاین",
    active: false,
    children: [
      {
        id: "OFFLINEORDER\\.select_offline_orders",
        name: "لیست سفارشات آفلاین",
        active: false,
      },
      {
        id: "OFFLINEORDER\\.select_offline_orders_by_id",
        name: "لیست سفارشات آفلاین یک کدملی    ",
        active: false,
      },
    ],
  },

  {
    id: "ORDER\\..*",
    name: "گزارش سفارشات ",
    active: false,
    children: [
      {
        id: "ORDER\\.select_details",
        name: "لیست جزئیات",
        active: false,
      },
      {
        id: "ORDER\\.select_aggregates",
        name: "لیست معاملات تجمیعی",
        active: false,
      },
    ],
  },

  {
    id: "PISHKHAN\\..*",
    name: "پیشخوان",
    active: false,
    children: [
      {
        id: "PISHKHAN\\.select",
        name: "لیست دفاتر پیشخوان",
        active: false,
      },
      {
        id: "PISHKHAN\\.insert",
        name: "افزودن دفتر پیشخوان",
        active: false,
      },
      {
        id: "PISHKHAN\\.delete",
        name: "حذف دفاتر پیشخوان",
        active: false,
      },
      {
        id: "PISHKHAN\\.update",
        name: "ویرایش دفاتر پیشخوان",
        active: false,
      },
    ],
  },

  {
    id: "PORTFOLIO\\..*",
    name: "سبد سهام ",
    active: false,
    children: [
      {
        id: "PORTFOLIO\\.select_portfolio_remain",
        name: "مانده ی سبد سهام",
        active: false,
      },
      {
        id: "PORTFOLIO\\.select_portfolio_daily",
        name: "لیست سبد سهام روزانه",
        active: false,
      },
      {
        id: "PORTFOLIO\\.select_account_transaction",
        name: "لیست معاملات",
        active: false,
      },
      {
        id: "PORTFOLIO\\.select_payment_info",
        name: "اطلاعات پرداخت",
        active: false,
      },
      {
        id: "PORTFOLIO\\.select_payment_detail",
        name: "لیست جزئیات پرداخت",
        active: false,
      },
      {
        id: "PORTFOLIO\\.payment_request",
        name: "تقاضای وجه",
        active: false,
      },
      {
        id: "PORTFOLIO\\.delete_payment_request",
        name: "حذف تقاضای وجه",
        active: false,
      },
    ],
  },

  {
    id: "POST\\..*",
    name: "پست ",
    active: false,
    children: [
      {
        id: "POST\\.select",
        name: "لیست پست ها",
        active: false,
      },
      {
        id: "POST\\.select_approve",
        name: "لیست پست های تایید شده",
        active: false,
      },
      {
        id: "POST\\.select_reject",
        name: "لیست پست های رد شده",
        active: false,
      },
      {
        id: "POST\\.insert",
        name: "افزودن پست",
        active: false,
      },
      {
        id: "POST\\.update",
        name: "ویرایش پست",
        active: false,
      },
      {
        id: "POST\\.enable_post",
        name: "فعال کردن پست",
        active: false,
      },
      {
        id: "POST\\.approve_post",
        name: "تایید پست",
        active: false,
      },
      {
        id: "POST\\.remove_post",
        name: "حذف پست",
        active: false,
      },
    ],
  },

  {
    id: "SHOAB\\..*",
    name: "شعب ",
    active: false,
    children: [
      {
        id: "SHOAB\\.select",
        name: "لیست شعب",
        active: false,
      },
      {
        id: "SHOAB\\.insert",
        name: "افزودن شعبه",
        active: false,
      },
      {
        id: "SHOAB\\.delete",
        name: "حذف شعبه",
        active: false,
      },
      {
        id: "SHOAB\\.update",
        name: "ویرایش شعبه",
        active: false,
      },
    ],
  },

  {
    id: "STATIC\\..*",
    name: "صفحات ایستا ",
    active: false,
    children: [
      {
        id: "STATIC\\.select",
        name: "لیست های صفحات ایستا",
        active: false,
      },
      {
        id: "STATIC\\.insert",
        name: "افزودن به لیست های صفحات ایستا",
        active: false,
      },
      {
        id: "STATIC\\.update",
        name: "ویرایش لیست های صفحات ایستا",
        active: false,
      },
    ],
  },

  {
    id: "STOCK\\..*",
    name: "سهام",
    active: false,
    children: [
      {
        id: "STOCK\\.select",
        name: "لیست سهام ها",
        active: false,
      },
      {
        id: "STOCK\\.insert_stock",
        name: "افزودن سهام جدید",
        active: false,
      },
      {
        id: "STOCK\\.update_stock",
        name: "ویرایش سهام",
        active: false,
      },
      {
        id: "STOCK\\.select_summaries",
        name: "لیست خلاصه سهام",
        active: false,
      },
      {
        id: "STOCK\\.insert_summery",
        name: "افزودن خلاصه سهام جدید",
        active: false,
      },
      {
        id: "STOCK\\.update_summery",
        name: "ویرایش خلاصه سهام",
        active: false,
      },
      {
        id: "STOCK\\.select_sectors",
        name: "لیست بخش های سهام",
        active: false,
      },
      {
        id: "STOCK\\.update_sector",
        name: "ویرایش بخش های سهام",
        active: false,
      },
      {
        id: "STOCK\\.insert_sector",
        name: "افزودن بخش های سهام",
        active: false,
      },
    ],
  },
  {
    id: "CONTACTUS\\..*",
    name: "فرم تماس با ما",
    active: false,
    children: [
      {
        id: "CONTACTUS\\.select",
        name: "لیست مدیریت فرم تماس با ما",
        active: false,
      },
      {
        id: "CONTACTUS\\.update",
        name: "ویرایش درخواست مدیریت فرم تماس با ما",
        active: false,
      },

    ],
  },
  {
    id: "WORKWITHUS\\..*",
    name: "فرم همکاری با ما",
    active: false,
    children: [
      {
        id: "WORKWITHUS\\.select",
        name: "لیست مدیریت فرم همکاری با ما",
        active: false,
      },
      {
        id: "WORKWITHUS\\.update",
        name: "ویرایش درخواست مدیریت فرم همکاری با ما",
        active: false,
      },

    ],
  },
  {
    id: "MARKETER\\..*",
    name: "فرم بازاریابی",
    active: false,
    children: [
      {
        id: "MARKETER\\.select",
        name: "لیست مدیریت فرم بازاریابی",
        active: false,
      },
      {
        id: "MARKETER\\.update",
        name: "ویرایش درخواست مدیریت فرم بازاریابی",
        active: false,
      },

    ],
  },

];
