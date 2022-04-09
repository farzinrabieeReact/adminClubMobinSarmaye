/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { checkIsActive } from "../../../../_helpers";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/staging/staging_select";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const getMenuItemActive = url => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  const nameReducer = useSelector(state => state.stage_select_reducer)

  useEffect(() => {
    dispatch({ type: actionTypes.stageSelectAsync });
  }, []);
  
  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/dashboard"
          )}`}
        >
          <a
            className="menu-link"
            href="https://club.mobinsb.ir/"
            target={"_blank"}
          >
            {nameReducer.data.length !== 0 ? (
              <span className="menu-text">
                {nameReducer.data[0]?.body.name_broker}
              </span>
            ) : null}
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </a>
        </li>
        {/*end::1 Level*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
