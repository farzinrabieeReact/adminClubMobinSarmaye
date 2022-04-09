import React, { useEffect } from "react";
import { Drawer, makeStyles } from "@material-ui/core";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import InputsFilter from "./inputs";
import { useSelector } from "react-redux";

let useStyles = makeStyles({
  header: {
    textAlign: "center",
    margin: "20px 0px"
  },
  content: {
    width: "90%",
    margin: "auto",
    maxHeight: "93vh"
  },
  input: {
    margin: "10px 0px"
  },
  btn: {
    width: "100%",
    margin: "10px 0px"
  },
  icon: {
    cursor: "pointer"
  }
});

export default function TemporaryDrawer({
  tableHead,
  stateFilter,
  children,
  setStateFilter,
  apiSubmit
}) {
  let classes = useStyles();
  const stageData = useSelector(
    state => state.stage_select_reducer.data[0]?.body?.name_broker
  );

  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handelChange = (value, type) => {
    setStateFilter(prev => ({
      ...prev,
      [type]: value
    }));
    if (type === "isin") {
      children(value);
    }
  };

  const onKeyDown = event => {
    if (event.keyCode === 70 && event.ctrlKey === true) {
      event.stopPropagation();
      event.preventDefault();
      setState({ ...state, left: !state.left });
    }
  };

  const handelSubmit = () => {
    apiSubmit();
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [state.left]);

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <span
            className={`${classes["icon"]} svg-icon svg-icon-xl svg-icon-primary btnIcon`}
            onClick={toggleDrawer(anchor, true)}
          >
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")}
            />
          </span>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={{ minWidth: 280, height: "100vh" }}>
              <div className={classes["header"]}>
                {stageData === "گرادیان" ? (
                  <h3>کارگزاری مبین سرمایه </h3>
                ) : stageData === "مبین سرمایه" ? (
                  <h3>کارگزاری مبین سرمایه </h3>
                ) : stageData === "پیشرو" ? (
                  <h3>کارگزاری پیشرو </h3>
                ) : (
                  !stageData && <h3>باشگاه مشتریان</h3>
                )}
              </div>
              <div className={classes["content"]}>
                {tableHead?.map((item, index) => {
                  return (
                    <div key={index} className={classes["input"]}>
                      <InputsFilter
                        data={item}
                        state={stateFilter}
                        handelChangeState={(data, type) =>
                          handelChange(data, type)
                        }
                        handelSubmit={() => handelSubmit()}
                      />
                    </div>
                  );
                })}
                {children ? children : ""}

                <div>
                  <button
                    type="button"
                    onClick={() => handelSubmit()}
                    className={`${classes["btn"]} btn btn-outline-success`}
                  >
                    جستجو
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ ...state, left: false })}
                    className={`${classes["btn"]} btn btn-outline-danger`}
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
