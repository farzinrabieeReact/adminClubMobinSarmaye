import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
// import { toast } from "react-toastify";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

// const initialValues = {
//   email: "admin@demo.com",
//   password: "demo",
// };
// const initialValues = {
//   email: "0015846237",
//   password: "Erfan123456",
// };
const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  // console.log("props",props)
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      // .email("Wrong email format")
      .min(10, "کد ملی حداقل باید 10 رقم و به صورت عدد باشد")
      .max(10, "کد ملی حداکثر باید 10 رقم و به صورت عدد باشد")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: LoginSchema,
  //   onSubmit: (values, { setStatus, setSubmitting }) => {
  //     enableLoading();
  //     setTimeout(() => {
  //       login(values.email, values.password)
  //         .then(({ data: { authToken } }) => {
  //           console.log("data",authToken)
  //           disableLoading();
  //           props.login(authToken);
  //         })
  //         .catch(() => {
  //           setStatus(
  //             intl.formatMessage({
  //               id: "AUTH.VALIDATION.INVALID_LOGIN",
  //             })
  //           );
  //         })
  //         .finally(() => {
  //           disableLoading();
  //           setSubmitting(false);
  //         });
  //     }, 1000);
  //   },
  // });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then((res) => {
            if (!Object.keys(res.data.response.data).length) {
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
              return;
            }
            let obj = {
              authToken : JSON.stringify(res.data.response.data.token),
              authMemberId : JSON.stringify(res.data.response.data.member_id),
              user : JSON.stringify(res.data.response.data)
            }
            localStorage.setItem("persist:admin" , JSON.stringify(obj))

            setTimeout(() => {
              props.login(res.data.response.data);
            }, 1000);
            // window.location.reload();
          })
          .catch(() => {
            alert("در ارتباط با سرور مشکلی پیش آمده");
            // setStatus(
            //   intl.formatMessage({
            //     id: "AUTH.VALIDATION.INVALID_LOGIN",
            //   })
            // );
          })
          .finally(() => {
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h1 className="font-size-h1 font-weight-bolder">ورود به پنل مدیریت</h1>
        {/* <p className="font-weight-bold alert-info p-5" style={{borderRadius:'7px',fontSize:'14px'}}>
          نام کاربری و رمز عبور خود را وارد نمایید
        </p> */}
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">
              نام کاربری یا رمز عبور اشتباه می باشد
            </div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
              کد ملی و رمز عبور خود را وارد کنید
            </div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="کد ملی"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="رمز عبور"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-beetween align-items-center">
          {/* <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            
          </Link> */}
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>ورود</span>

            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
