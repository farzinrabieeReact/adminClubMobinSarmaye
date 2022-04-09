import React from "react";
import { handleNumber } from "../../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
let useStyles = makeStyles({
  root: {
    width: "100%",
    fontSize: 13,
    position: "relative",
    backgroundColor: "white",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px"
  },
  info_1: {
    display: " flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: "20px",
    "& p": {
      minWidth: 180
    }
  },
  info_2: {
    display: " flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10
  }
});

const Info = () => {
  let classes = useStyles();
  const data = useSelector(state => state.bonus_calculate_confiict_reducer)
    ?.data;

  return (
    <>
      <div className={classes["root"]}>
        <div className={classes["info_1"]}>
          <p>
            <span>نام نام خانوادگی</span>:
            <span>
              {data?.length > 0 ? data[0].body.member_first_name : ""}{" "}
              {data?.length > 0 ? data[0].body.member_last_name : ""}
            </span>
          </p>
          <p>
            <span>کدملی</span>:
            <span>
              {data?.length > 0 ? data[0].body.member_national_id : ""}
            </span>
          </p>
          <p>
            <span>شناسه باشگاه</span>:
            <span>
              {data?.length > 0
                ? data[0].body.automation_member_automation_club_id
                : ""}
            </span>
          </p>
          <p>
            <span>شناسه اتوماسیون</span>:
            <span>
              {data?.length > 0
                ? data[0].body.automation_member_automation_id
                : ""}
            </span>
          </p>
          {/* <p>
                                <span>تاریخ ثبت نام</span>:
                             <span>
                                    {
                                       data[0] ? data[0].body.member_registration_date: ""
                                            ? dateMiladiToShamsi(data[0].body.member_registration_date.split(' ')[0])
                                            : ''
                                    }
                                </span>
                            </p> */}

          <p>
            <span>تاریخ مغایرت از</span>:
            <span>
              {data?.length > 0 ? (
                <>
                  {data[0].body.conflict_from_date
                    ? dateMiladiToShamsi(
                        data[0].body.conflict_from_date.split(" ")[0]
                      )
                    : ""}
                </>
              ) : (
                ""
              )}
            </span>
          </p>
          <p>
            <span>تاریخ مغایرت تا</span>:
            <span>
              {data?.length > 0 ? (
                <>
                  {data[0].body.conflict_to_date
                    ? dateMiladiToShamsi(
                        data[0].body.conflict_to_date.split(" ")[0]
                      )
                    : ""}
                </>
              ) : (
                ""
              )}
            </span>
          </p>
        </div>
        <div className={classes["info_2"]}>
          <p>
            <p>امتیاز گردش روزانه:</p>
            <p>
              <p>
                {" "}
                مجموع باشگاه:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.DAILY_TURNOVER_SCORE.total_club_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                {" "}
                مجموع اتوماسیون:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.DAILY_TURNOVER_SCORE.total_automation_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
            </p>
          </p>
          <p>
            <p>امتیاز گردش آتی:</p>
            <p>
              <p>
                {" "}
                مجموع باشگاه:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.MONTHLY_FUTURE_TURNOVER_SCORE
                        .total_club_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                {" "}
                مجموع اتوماسیون:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.MONTHLY_FUTURE_TURNOVER_SCORE
                        .total_automation_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
            </p>
          </p>
          <p>
            <p>امتیاز گردش معرف:</p>
            <p>
              <p>
                {" "}
                مجموع باشگاه:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.INTRODUCER_TURNOVER_SCORE.total_club_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
              <p>
                {" "}
                مجموع اتوماسیون:
                {data?.length > 0 ? (
                  <>
                    {handleNumber(
                      data[0].body.INTRODUCER_TURNOVER_SCORE
                        .total_automation_bonus
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default Info;
