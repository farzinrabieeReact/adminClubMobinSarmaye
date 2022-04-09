import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
import CardJobs from "./Card";

export default function Index({
  jobOpportunity_reducer,
  handelSubmitUpdate,
  handelDeleteSubmit,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let res = JSON.parse(jobOpportunity_reducer.content);
    setData(res);
  }, [jobOpportunity_reducer]);

  return (
    <div className={Styles["content"]}>
      {data.map((_data, index) => {
        return (
          <CardJobs
            data={_data}
            key={index}
            index={index}
            handelSubmitUpdate={handelSubmitUpdate}
            handelDeleteSubmit={handelDeleteSubmit}
          />
        );
      })}
    </div>
  );
}
