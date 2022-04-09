/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/staging/staging_select";

export function AuthPage() {
  const dispatch = useDispatch();
  const stageData = useSelector(
    state => state.stage_select_reducer.data[0]?.body?.name_broker
  );
  useEffect(() => {
    dispatch({ type: actionTypes.stageSelectAsync });
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/common/ClubAdminIcon.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                {stageData === "پیشرو" && (
                  <h3 className="font-size-h1 mb-5 text-white">
                    پنل مدیریت باشگاه مشتریان پیشرو
                  </h3>
                )}
                {stageData === "مبین سرمایه" && (
                  <h3 className="font-size-h1 mb-5 text-white">
                    پنل مدیریت باشگاه مشتریان مبین سرمایه
                  </h3>
                )}
                {stageData === "گرادیان" && (
                  <h3 className="font-size-h1 mb-5 text-white">
                    پنل مدیریت باشگاه مشتریان مبین سرمایه
                  </h3>
                )}
                {!stageData && (
                  <h3 className="font-size-h1 mb-5 text-white">
                    پنل مدیریت باشگاه مشتریان
                  </h3>
                )}
                <p className="font-weight-lighter text-white opacity-80"></p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                {/* <div className="opacity-70 font-weight-bold	text-white">
                 
                </div> */}
                <div className="d-flex">
                  {/* <Link to="/terms" className="text-white">
                    شرایط و قوانین
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    تماس
                  </Link> */}
                  <p className="text-light">
                    © تمامی حقوق این سایت محفوظ و متعلق به شرکت داده پردازی
                    گرادیان می باشد
                  </p>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              {/* <span className="font-weight-bold text-dark-50">
                حساب کاربری ندارید؟
              </span>
              <Link
                to="/auth/registration"
                className="font-weight-bold ml-2"
                id="kt_login_signup"
              >
                ثبت نام کنید
              </Link> */}
            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
