/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect } from "react";
import objectPath from "object-path";
import { useLocation } from "react-router-dom";
import { QuickActions } from "./components/QuickActions";
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { dateMiladiToShamsi } from "../../../../app/common/method/date";

export function SubHeader() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  const getTimeNow = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd ;
    return today
  };



  function toPersianNum(num)
  {
    let str = num
    str = str.replaceAll("1","۱");
    str = str.replaceAll("2","۲");
    str = str.replaceAll("3","۳");
    str = str.replaceAll("4","۴");
    str = str.replaceAll("5","۵");
    str = str.replaceAll("6","۶");
    str = str.replaceAll("7","۷");
    str = str.replaceAll("8","۸");
    str = str.replaceAll("9","۹");
    str = str.replaceAll("0","۰");
      return str;
  }



  return (
    <div
      id="kt_subheader"
      className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}

          <div className="d-flex align-items-baseline mr-5">
            <h5 className="text-dark font-weight-bold my-2 mr-5">
              <>{subheader.title}</>
              {/*<small></small>*/}
            </h5>
          </div>

          <BreadCrumbs items={subheader.breadcrumbs} />
        </div>

        {/* Toolbar */}
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="btn btn-light btn-sm font-weight-bold"
            id="kt_dashboard_daterangepicker"
            data-toggle="tooltip"
            title="Select dashboard daterange"
            data-placement="left"
          >
            <span
              className="text-muted font-weight-bold mr-2"
              id="kt_dashboard_daterangepicker_title"
            >
              امروز
            </span>
            <span
              className="text-primary font-weight-bold"
              id="kt_dashboard_daterangepicker_date"
            >
              
              {toPersianNum(dateMiladiToShamsi(getTimeNow()))}
              
            </span>
          </a>
          {/* <QuickActions /> */}
        </div>
      </div>
    </div>
  );
}
