import React from "react";
import Styles from "./index.module.scss";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
export default function InformationPost({ data, countComments }) {
  return (
    <div className={Styles["card"]}>
      <div className={Styles["info"]}>
        <div className={Styles["title"]}>
          <span className={Styles["Purple-square"]}></span>
          <h2>{data?.body?.title}</h2>
        </div>
        <ul className={Styles["list"]}>
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>کاربر ثبت کننده:</h4>
            <p>
              {data?.body?.author_first_name}
              {"\u00A0"}
              {data?.body?.author_last_name}
            </p>
          </li>
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>تاریخ ثبت:</h4>
            <p>{dateMiladiToShamsi(data?.body?.create_date.split(".")[0])}</p>
          </li>
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>تعداد پسندیده شدها:</h4>
            <p>{data?.body?.likes}</p>
          </li>
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>تعداد نظرات:</h4>
            <p>{countComments}</p>
          </li>
          {/* <li>
                          <span className={Styles['blue-square']}></span>
                            <h4>کاربر تایید کننده:</h4>
                            <p>عرفان قیومی</p>
                        </li> */}
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>گروه:</h4>
            <p>{data?.body?.forum_name}</p>
          </li>
          <li>
            <span className={Styles["blue-square"]}></span>
            <h4>زیر گروه:</h4>
            <p>{data?.body?.subgroup_name}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
