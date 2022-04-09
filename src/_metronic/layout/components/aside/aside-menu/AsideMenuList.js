import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
// import SVG from "react-inlinesvg";
// import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { checkIsActive } from "../../../../_helpers";
import {
  School,
  Sports,
  StarRate,
  Notifications,
  Group,
  PlaylistAddCheck,
  FeaturedPlayList,
  SettingsInputAntenna,
  AccountCircle,
  LocalAtm,
  MoreHoriz
} from "@material-ui/icons";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { actionTypes as actionTypesNotif } from "./../../../../../redux/notificationAlert";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";

import DescriptionIcon from "@material-ui/icons/Description";
import { permitted_methods } from "../../../../../app/common/method/permitted_method";
import { getSessionParam } from "../../../../../app/common/method/getSessionParam";
import { useDispatch } from "react-redux";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

import FingerprintIcon from "@material-ui/icons/Fingerprint";

let searchForTrim;
let flag;

export function AsideMenuList({ layoutProps }) {
  let member_permitted_methods = getSessionParam("member_permitted_methods");
  const location = useLocation();
  const [regex, setRegex] = useState("");
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  const [searchFor, setSearchFor] = useState("")

  useEffect(() => {
    let list = [
      {
        title: "داشبورد",
        icon: <Group />,
        route: "/dashboard"
      },
      {
        title: "سطح دسترسی",
        icon: <DescriptionIcon />,
        route: "/permitions",
        children: [
          {
            lable: "سطح دسترسی",
            route: "/permitions/permitions",
            zone: regex.includes("permisson_manager") ? true : ConvertToUpperCase("permisson_manager.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "مدیریت کاربران",
        icon: <Group />,
        route: "/clubmember",
        children: [
          {
            lable: "آمار کلی",
            route: "/clubmember/all",
            zone: ConvertToUpperCase("clubmember.").match(regex) ? true : false
          },
          {
            lable: "لیست کاربران",
            route: "/clubmember/select",
            zone: "CLUBMEMBER.".match(regex) ? true : false
          },
          {
            lable: "تغییر ناظر",
            route: "/clubmember/changeBroker",
            zone: ConvertToUpperCase("changebroker.").match(regex)
              ? true
              : false
          },
          {
            lable: "اطلاعات کاربر",
            route: "/user-profile",
            zone: ConvertToUpperCase("clubmember.").match(regex) ? true : false
          },
          {
            lable: "پرتفوی",
            route: "/stock/select",
            zone: ConvertToUpperCase("portfolio.").match(regex) ? true : false
          },
          {
            lable: "لیست ورود و خروج ها",
            route: "/clubmember/loginlist",
            zone: ConvertToUpperCase("CLUBMEMBER.").match(regex) ? true : false
          },
          {
            lable: "درخواست های مشتری شدن",
            route: "/clubmember/requestCustomer",
            zone: ConvertToUpperCase("brokercustomer.").match(regex)
              ? true
              : false
          }
        ]
      },

      {
        title: "معاملات",
        icon: <DescriptionIcon />,
        route: "/order",
        children: [
          {
            lable: "گزارش تخفیف پله‌ای",
            route: "/order/Stepbystepdiscount",
            zone: ConvertToUpperCase("order.").match(regex) ? true : false
          },
          {
            lable: "گزارشات معاملات",
            route: "/order/order",
            zone: ConvertToUpperCase("order.").match(regex) ? true : false
          },
          {
            lable: "گزارش اتوماسیون",
            route: "/order/automationLog",
            zone: ConvertToUpperCase("orderLog.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "امتیازات",
        icon: <StarRate />,
        route: "/bonus",
        children: [
          {
            lable: "گزارش امتیازات",
            route: "/bonus/select",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false
          },
          {
            lable: "ویرایش امتیازات",
            route: "/bonus/update",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false
          },
          {
            lable: " گزارش تجمیعی امتیازات",
            route: "/bonus/aggregated",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false
          },
          {
            lable: " گزارش مدیریتی امتیازات",
            route: "/bonus/bonusMangement",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false
          }
          // {
          //   lable: "محاسبه مجدد امتیازات",
          //   route: "/bonus/bonusComputing",
          //   zone: ConvertToUpperCase("bonus.").match(regex) ? true : false
          // }
        ]
      },
      {
        title: "جوایز",
        icon: <CardGiftcardIcon />,
        route: "/gift",
        children: [
          {
            lable: "لیست جوایز",
            route: "/gift/select",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false
          },
          {
            lable: "لیست درخواست های جوایز",
            route: "/gift/requests",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false
          },
          {
            lable: "جایزه جدید",
            route: "/gift/insert",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false
          },
          {
            lable: "گزارش تجمیعی جوایز",
            route: "/gift/Aggregated",
            zone: ConvertToUpperCase("ONLINECHARGE.").match(regex)
              ? true
              : false
          },
          {
            lable: "گزارش تجمیعی شارژ نقدی",
            route: "/gift/CashAggregated",
            zone: ConvertToUpperCase("ONLINECHARGE.").match(regex)
              ? true
              : false
          },
          {
            lable: "کد های تخفیف",
            route: "/gift/dicountCode",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false
          },
          {
            lable: "گزارش جوایز شارژ نقدی",
            route: "/gift/giftCash",
            zone: ConvertToUpperCase("onlineChargee.").match(regex)
              ? true
              : false
          }
        ]
      },
      {
        title: "آموزش",
        icon: <School />,
        route: "/education",
        children: [
          // {
          //   lable: "افزودن دوره های آموزشی",
          //   route: "/education/Courses/newCourse",
          // },
          {
            lable: "نرم افزارها",
            route: "/education/Courses/application",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "لیست دوره های آموزشی",
            route: "/education/Courses/List",
            zone: ConvertToUpperCase("course.").match(regex) ? true : false
          },
          // {
          //   lable2: "لیست ثبت نام ها",
          //   route: "/education/Courses/listRegisters"
          // },
          {
            lable: "ثبت نام کاربر",
            route: "/education/Courses/registerPerson",
            zone: ConvertToUpperCase("clubmember.").match(regex) ? true : false
          },
          {
            lable: "بروشور های آموزشی",
            route: "/education/Courses/brochures",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "ویدیوهای آموزشی",
            route: "/education/videos",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "اعلانات",
        icon: <Notifications />,
        route: "/notify",
        children: [
          {
            lable: "لیست اعلانات",
            route: "/notify/select",
            zone: ConvertToUpperCase("notification.").match(regex)
              ? true
              : false
          },
          {
            lable: "افزودن اعلان جدید",
            route: "/notify/insert",
            zone: ConvertToUpperCase("notification.").match(regex)
              ? true
              : false
          }
        ]
      },
      {
        title: "مسابقات",
        route: "/Compatitions",
        icon: <Sports />,
        children: [
          {
            lable: "افزودن مسابقه جدید",
            route: "/Compatitions/NewCompatitions",
            zone: ConvertToUpperCase("competition.").match(regex) ? true : false
          },
          {
            lable: "لیست مسابقات",
            route: "/Compatitions/CompatitionsList",
            zone: ConvertToUpperCase("competition.").match(regex) ? true : false
          }
        ]
      },

      {
        title: "عرضه اولیه",
        icon: <PlaylistAddCheck />,
        route: "/ipoList",
        children: [
          {
            lable: "لیست عرضه اولیه",
            route: "/ipoList/list",
            zone: ConvertToUpperCase("ipo.").match(regex) ? true : false
          },
          {
            lable: "تعریف عرضه اولیه",
            route: "/ipoList/add",
            zone: ConvertToUpperCase("ipo.").match(regex) ? true : false
          },
          {
            lable: "توضیحات عرضه اولیه",
            route: "/ipoList/ipo",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "محتوا",
        icon: <FeaturedPlayList />,
        route: "/content",
        children: [
          {
            lable: "سوالات متداول",
            route: "/content/faq",
            zone: ConvertToUpperCase("faq.").match(regex) ? true : false
          },
          {
            lable: "پست",
            route: "/content/posts",
            zone: ConvertToUpperCase("post.").match(regex) ? true : false
          },
          {
            lable: "تالار های گفتگو",
            route: "/content/category",
            zone: ConvertToUpperCase("post.").match(regex) ? true : false
          },
          {
            lable: "درباره ما",
            route: "/content/aboutUs",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "اسلایدر",
            route: "/content/slider",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "راهنمای ثبت نام",
            route: "/content/signUpHelp",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          }
          // {
          //   lable: "اخبار",
          //   route: "/content/news",
          //   zone: ConvertToUpperCase("news.").match(regex) ? true : false
          // }
        ]
      },
      {
        title: "راه های ارتباطی",
        icon: <SettingsInputAntenna />,
        route: "/connect",
        children: [
          {
            lable: "دفاتر پیشخوان",
            route: "/connect/goverment",
            zone: ConvertToUpperCase("pishkhan.").match(regex) ? true : false
          },
          {
            lable: "شعب",
            route: "/connect/branches",
            zone: ConvertToUpperCase("shoab.").match(regex) ? true : false
          },
          {
            lable: "کانال های تلگرامی",
            route: "/connect/telegramLink",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "صدای مشتری",
        icon: <AccountCircle />,
        route: "/feedback",
        children: [
          {
            lable: "صدای مشتری",
            route: "/feedback/feedback",
            zone: ConvertToUpperCase("feedback.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "اعتبارات",
        icon: <AccountCircle />,
        route: "/creaditPerson",
        children: [
          {
            lable: "اطلاعات اعتبار کاربر",
            route: "/creaditPerson/details",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "شرایط دریافت اعتبار",
            route: "/creaditPerson/condition",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          }
        ]
      },
      // {
      //   title: "قرعه کشی",
      //   icon: <AccountCircle />,
      //   route: "/lottery",
      //   children: [
      //     {
      //       lable: "لیست قرعه کشی",
      //       route: "/lottery/select",
      //       zone: ConvertToUpperCase("lottery.").match(regex) ? true : false
      //     },
      //   ]
      // },
      {
        title: "سهام",
        icon: <ViewCompactIcon />,
        route: "/stocks",
        children: [
          {
            lable: "مدیریت نمادها",
            route: "/stocks/stockManagement",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false
          },
          {
            lable: "سود نقدی سهام",
            route: "/stocks/stockCash",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false
          },
          {
            lable: "مدیریت داده های سهام",
            route: "/stocks/stockDataManagement",
            zone: ConvertToUpperCase("stockDataManagement.").match(regex)
              ? true
              : false
          }
        ]
      },
      {
        title: "مدیریت فرم ها",
        icon: <AccountCircle />,
        route: "/formManger",
        children: [
          {
            lable: "ارتباط با ما",
            route: "/formManger/contactUs",
            zone: ConvertToUpperCase("contactUs.").match(regex) ? true : false
          },
          {
            lable: "فرم بازاریابی",
            route: "/formManger/marketer",
            zone: ConvertToUpperCase("contactUs.").match(regex) ? true : false
          },
          {
            lable: "فرم همکاری با ما",
            route: "/formManger/workWithUS",
            zone: ConvertToUpperCase("workWithUs.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "احراز هویت",
        icon: <FingerprintIcon />,
        route: "/AuthenticationLiveness",
        children: [
          {
            lable: "لیست درخواست ها",
            route: "/AuthenticationLiveness",
            zone: ConvertToUpperCase("ehraz.").match(regex) ? true : false
          }
        ]
      },
      // {
      //   title: "پرداخت وجه",
      //   icon: <LocalAtm />,
      //   route: "/payments",
      //   children: [
      //     {
      //       lable: "گزارش پرداخت وجه",
      //       route: "/payments/select",
      //       zone: ConvertToUpperCase("payments.").match(regex) ? true : false
      //     }
      //   ]
      // },
      {
        title: "تحلیل هدف حافظ",
        icon: <SubscriptionsIcon />,
        route: "/HADAFHAFEZ",
        children: [
          {
            lable: "تحلیل ها",
            route: "/HADAFHAFEZ/signals",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false
          },
          {
            lable: "پلن های اشتراکی",
            route: "/HADAFHAFEZ/subscriptionPlans",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false
          },
          {
            lable: "لیست سابقه کاربران",
            route: "/HADAFHAFEZ/memberSubscriptions",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false
          }
        ]
      },
      {
        title: "سایر",
        icon: <MoreHoriz />,
        route: "/static",
        children: [
          {
            lable: "شماره حساب ها",
            route: "/static/accounts",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          {
            lable: "سامانه ها",
            route: "/static/systems",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false
          },
          // {
          //   lable: "فرصت های شغلی",
          //   route: "/static/jobOpportunity",
          //   zone: ConvertToUpperCase("static.").match(regex) ? true : false
          // }
        ]
      }
    ];

    let filterLevel2 = [];
    for (let i = 0; i < list.length; i++) {
      let children = list[i].children?.filter(i => i?.zone);
      let data = { ...list[i], children: children };
      filterLevel2.push(data);
    }

    let res = filterLevel2.filter((item, ind) =>
      ind === 0 ? true : item.children.length > 0
    );

    setstate(res);
  }, [regex]);

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
      "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  useEffect(() => {
    setTimeout(() => {
      setRegex(permitted_methods(member_permitted_methods.trim()));
    }, 1000);
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  if (regex.trim() === "CLUB null") {
    dispatch({
      type: actionTypesNotif.warning,
      textAlert: "شما به ادمین دسترسی ندارید"
    });
    // setstate([])
  }

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className="text-center">
          <input
            value={searchFor}
            onChange={(e) => setSearchFor(e.target.value)}
            placeholder="جستجو در منو"
          />
        </li>
        {state
          .filter(item => {
            searchForTrim = searchFor.trim()
            flag = false
            if (!searchForTrim) {
              return true
            }
            if (item.title.includes(searchForTrim)) {
              return true
            }
            if (!item.children) {
              return false
            }
            item.children.forEach((child) => {
              if (child.lable.includes(searchForTrim)) {
                flag = true
              }
            })
            if (flag) {
              return true
            }
            return false
          })
          .map((itm, ind) => (
            <li
              key={ind}
              data-menu-toggle={layoutProps.menuDesktopToggle}
              aria-haspopup="true"
              className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
                itm.route
              )}`}
            >
              <NavLink
                className={itm.children ? "menu-link menu-toggle" : "menu-link"}
                to={itm.route}
              >
                <div className="mr-2"> {itm.icon}</div>
                <span className="menu-text">{itm.title}</span>
                {itm.children ? <i className="menu-arrow" /> : null}
              </NavLink>

              <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                <ul className="menu-subnav">
                  {itm.children
                    ? itm.children.map((itm, ind) => (
                      <li
                        key={ind}
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                          itm.route
                        )}`}
                        data-menu-toggle="hover"
                        aria-haspopup="true"
                      >
                        <NavLink
                          className={
                            itm.children2
                              ? "menu-link menu-toggle"
                              : "menu-link"
                          }
                          to={itm.route}
                        >
                          {/*<span className="svg-icon menu-icon">*/}
                          {/*  <SVG*/}
                          {/*    src={toAbsoluteUrl(*/}
                          {/*      "/media/svg/icons/Design/PenAndRuller.svg"*/}
                          {/*    )}*/}
                          {/*  />*/}
                          {/*</span>*/}
                          <span className="menu-text">{itm.lable}</span>
                          {itm.children2 ? <i className="menu-arrow" /> : null}
                        </NavLink>

                        <div
                          className={`menu-submenu menu-submenu-classic menu-submenu-right`}
                        >
                          <ul className="menu-subnav">
                            {itm.children2
                              ? itm.children2.map((itm, ind) => (
                                <li
                                  key={ind}
                                  className={`menu-item ${getMenuItemActive(
                                    itm.route
                                  )}`}
                                >
                                  <NavLink
                                    className="menu-link"
                                    to={itm.route}
                                  >
                                    <i className="menu-bullet menu-bullet-dot">
                                      <span />
                                    </i>
                                    <span className="menu-text">
                                      {itm.lable2}
                                    </span>
                                  </NavLink>
                                </li>
                              ))
                              : null}
                          </ul>
                        </div>
                      </li>
                    ))
                    : null}
                </ul>
              </div>
            </li>
          ))}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}

/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

let ConvertToUpperCase = item => {
  return item.toUpperCase();
};
