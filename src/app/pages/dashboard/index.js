import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    // backgroundColor:'white',
    display: "flex",
    justifyContent: "center",
    // alignItems:'center',
    paddingTop: 40
  },
  // logo: {
  //   width: 120,
  //   height: 40,
  //   position: "absolute",
  //   top: 0,
  //   right: 5
  // },
  box: {
    position: "relative",
    width: "75%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow:
      " rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"
  },
  logo: {
    padding: "10px",
    width: "240px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  },

  parentImage: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  divParent: {
    width: "100%",
    position: "absolute",
    top: "89%"
  },
  parentButton: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto",
    gap: "10px 10px",
    padding: "0 30px"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 0,
    color: "black",
    backgroundColor: "white",
    boxShadow:
      " rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
    borderRadius: 10,
    height: 95,
    fontSize: 16
  }
}));

const Index = () => {
  const classes = useStyles();
  const stageData = useSelector(
    state => state.stage_select_reducer.data[0]?.body?.name_broker
  );

  return (
    <>
      <div className={classes.logo}>
        {stageData === "گرادیان" && (
          <img src={"/media/logo/Group1.png"} alt="" />
        )}
        {stageData === "پیشرو" && <img src={"/media/logo/pishro.jpg"} alt="" />}
        {stageData === "مبین سرمایه" && (
          <img src={"/media/logo/Group1.png"} alt="" />
        )}
        {/*<svg className={`${Styles.logo} ${classes.logo}`}>*/}
        {/*  <use xlinkHref="/sprit.svg#logo-pishro"></use>*/}
        {/*</svg>*/}
      </div>
      <div className={classes.root}>
        {!stageData && (
          <div className={`${classes.box} ${Styles.backIMgDefault}`}>
            <div className="row w-100 m-0">
              <div
                style={{ height: "150px" }}
                className="col-12 col-md-12 order-2 order-md-0 d-flex align-items-center p-0 pl-5 position-relative justify-content-center"
              >
                {/*<svg className={`${Styles.logo} ${classes.logo}`}>*/}
                {/*  <use xlinkHref="/sprit.svg#logo-pishro"></use>*/}
                {/*</svg>*/}
              </div>
              <div className="col_12 d-flex justify-content-center w-100">
                <h1
                  className={`${Styles.h1} pl-20 font-weight-bolder  text-white`}
                >
                  پنل مدیریت باشگاه مشتریان {/*{stageData === "گرادیان" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {/*{stageData === "مبین سرمایه" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {/*{stageData === "پیشرو" && (*/}
                  {/*  <span style={{ color: "green" }}>پیشرو</span>*/}
                  {/*)}*/}
                </h1>
              </div>
            </div>
            <div className={classes.divParent}>
              <div className={classes.parentButton}>
                {btnDashboard.map((item, index) => (
                  <Link
                    className={`${classes.button} ${Styles.button}`}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {stageData === "گرادیان" && (
          <div className={`${classes.box} ${Styles.backIMg}`}>
            <div className="row w-100 m-0">
              <div
                style={{ height: "150px" }}
                className="col-12 col-md-12 order-2 order-md-0 d-flex align-items-center p-0 pl-5 position-relative justify-content-center"
              ></div>
              <div className="col_12 d-flex justify-content-center w-100">
                <h1
                  className={`${Styles.h1} pl-20 font-weight-bolder  text-white`}
                >
                  پنل مدیریت باشگاه مشتریان کارگزاری{" "}
                  {stageData === "گرادیان" && (
                    <span style={{ color: "orange" }}>مبین سرمایه</span>
                  )}
                  {/*{stageData === "مبین سرمایه" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {/*{stageData === "پیشرو" && (*/}
                  {/*  <span style={{ color: "green" }}>پیشرو</span>*/}
                  {/*)}*/}
                </h1>
              </div>
            </div>
            <div className={classes.divParent}>
              <div className={classes.parentButton}>
                {btnDashboard.map((item, index) => (
                  <Link
                    className={`${classes.button} ${Styles.button}`}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {stageData === "پیشرو" && (
          <div className={`${classes.box} ${Styles.backIMgPishro}`}>
            <div className="row w-100 m-0">
              <div
                style={{ height: "150px" }}
                className="col-12 col-md-12 order-2 order-md-0 d-flex align-items-center p-0 pl-5 position-relative justify-content-center"
              ></div>
              <div className="col_12 d-flex justify-content-center w-100">
                <h1
                  className={`${Styles.h1} pl-20 font-weight-bolder  text-white`}
                >
                  پنل مدیریت باشگاه مشتریان کارگزاری{" "}
                  {/*{stageData === "گرادیان" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {/*{stageData === "مبین سرمایه" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {stageData === "پیشرو" && (
                    <span style={{ color: "green" }}>پیشرو</span>
                  )}
                </h1>
              </div>
            </div>
            <div className={classes.divParent}>
              <div className={classes.parentButton}>
                {btnDashboard.map((item, index) => (
                  <Link
                    className={`${classes.button} ${Styles.button}`}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {stageData === "مبین سرمایه" && (
          <div className={`${classes.box} ${Styles.backIMg}`}>
            <div className="row w-100 m-0">
              <div
                style={{ height: "150px" }}
                className="col-12 col-md-12 order-2 order-md-0 d-flex align-items-center p-0 pl-5 position-relative justify-content-center"
              ></div>
              <div className="col_12 d-flex justify-content-center w-100">
                <h1
                  className={`${Styles.h1} pl-20 font-weight-bolder  text-white`}
                >
                  پنل مدیریت باشگاه مشتریان کارگزاری{" "}
                  {/*{stageData === "گرادیان" && (*/}
                  {/*  <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
                  {/*)}*/}
                  {stageData === "مبین سرمایه" && (
                    <span style={{ color: "orange" }}>مبین سرمایه</span>
                  )}
                  {/*{stageData === "پیشرو" && (*/}
                  {/*  <span style={{ color: "green" }}>پیشرو</span>*/}
                  {/*)}*/}
                </h1>
              </div>
            </div>
            <div className={classes.divParent}>
              <div className={classes.parentButton}>
                {btnDashboard.map((item, index) => (
                  <Link
                    className={`${classes.button} ${Styles.button}`}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {/*<div*/}
        {/*  className={*/}
        {/*    stageData === "گرادیان"*/}
        {/*      ? `${classes.box} ${Styles.backIMg}`*/}
        {/*      : stageData === "پیشرو"*/}
        {/*      ? `${classes.box} ${StylesPishro.backIMg}`*/}
        {/*      : stageData === "مبین سرمایه"*/}
        {/*      ? `${classes.box} ${Styles.backIMg}`*/}
        {/*      : `${classes.box} ${StylesPishro.backIMg}`*/}
        {/*  }*/}
        {/*>*/}
        {/*  <div className="row w-100 m-0">*/}
        {/*    <div*/}
        {/*      style={{ height: "150px" }}*/}
        {/*      className="col-12 col-md-12 order-2 order-md-0 d-flex align-items-center p-0 pl-5 position-relative justify-content-center"*/}
        {/*    >*/}
        {/*      /!*<svg className={`${Styles.logo} ${classes.logo}`}>*!/*/}
        {/*      /!*  <use xlinkHref="/sprit.svg#logo-pishro"></use>*!/*/}
        {/*      /!*</svg>*!/*/}
        {/*    </div>*/}
        {/*    <div className="col_12 d-flex justify-content-center w-100">*/}
        {/*      <h1*/}
        {/*        className={`${Styles.h1} pl-20 font-weight-bolder  text-white`}*/}
        {/*      >*/}
        {/*        پنل مدیریت باشگاه مشتریان کارگزاری{" "}*/}
        {/*        {stageData === "گرادیان" && (*/}
        {/*          <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
        {/*        )}*/}
        {/*        {stageData === "مبین سرمایه" && (*/}
        {/*          <span style={{ color: "orange" }}>مبین سرمایه</span>*/}
        {/*        )}*/}
        {/*        {stageData === "پیشرو" && (*/}
        {/*          <span style={{ color: "green" }}>پیشرو</span>*/}
        {/*        )}*/}
        {/*      </h1>*/}
        {/*    </div>*/}
        {/*    /!*<div*!/*/}
        {/*    /!*  className="col-12 col-md-5 p-0 order-1 order-md-0 mb-10"*!/*/}
        {/*    /!*  style={{*!/*/}
        {/*    /!*    textAlign: "left"*!/*/}
        {/*    /!*  }}*!/*/}
        {/*    /!*>*!/*/}
        {/*    /!*<img*!/*/}
        {/*    /!*  src="/media/logo/IMG_0603-low-quality.png"*!/*/}
        {/*    /!*  alt=""*!/*/}
        {/*    /!*  className={`${Styles.imgResponsiv}`}*!/*/}
        {/*/>*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}
        {/*  <div className={classes.divParent}>*/}
        {/*    <div className={classes.parentButton}>*/}
        {/*      {btnDashboard.map((item, index) => (*/}
        {/*        <Link*/}
        {/*          className={`${classes.button} ${Styles.button}`}*/}
        {/*          to={item.link}*/}
        {/*        >*/}
        {/*          {item.title}*/}
        {/*        </Link>*/}
        {/*      ))}*/}
        {/*      /!* <Link className={classes.button}>آمار کلی</Link>*/}
        {/*    <Link className={classes.button}>اطلاعات کاربر</Link>*/}
        {/*    <Link className={classes.button}>لیست کاربران</Link>*/}
        {/*    <Link className={classes.button}>گزارش امتیازات</Link>*/}
        {/*    <Link className={classes.button}>گزارش معاملات</Link>*/}
        {/*    <Link className={classes.button}>اعلانات</Link>*/}
        {/*    <Link className={classes.button}>کدهای تخفیف</Link>*/}
        {/*    <Link className={classes.button}>گزارش جوایز شارژ نقدی</Link> *!/*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Index;

const btnDashboard = [
  {
    title: "آمار کلی",
    link: "/clubmember/all"
  },
  {
    title: "اطلاعات کاربر",
    link: "/user-profile"
  },
  {
    title: "لیست کاربران",
    link: "/clubmember/select"
  },
  {
    title: "گزارش امتیازات",
    link: "/bonus/select"
  },
  {
    title: "گزارش معاملات",
    link: "/order/order"
  },
  {
    title: "اعلانات",
    link: "/notify/select"
  },
  {
    title: "کدهای تخفیف",
    link: "/gift/dicountCode"
  },
  {
    title: "گزارش جوایز شارژ نقدی",
    link: "/gift/CashAggregated"
  }
];
