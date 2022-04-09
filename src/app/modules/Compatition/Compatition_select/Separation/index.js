import React, { useState } from "react";
import Styles from "./index.module.scss";

import LinearProgress from "./LinearProgress";
import Tables from "./Tables/index";

export default function Index({
  idCompetitions,
  reducerPerformanceById,
  apisperformanceSelectById,
  apiParticipationsByIdEmpty,
  apiParticipationsSelect,
  apiParticipationsEmpty,
  reducerParticipations,
  infoCompatition,
  setinfoCompatition,
  flagRefrsh,
  setStateFilterStatistic
}) {
  
  
  return (
    <div className={Styles["Separation"]}>
      <div className={Styles["gird1"]}>
        <LinearProgress
          setinfoCompatition={setinfoCompatition}
          idCompetitions={idCompetitions}
          reducerPerformanceById={reducerPerformanceById}
          apisperformanceSelectById={apisperformanceSelectById}
          apiParticipationsByIdEmpty={apiParticipationsByIdEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          apiParticipationsEmpty={apiParticipationsEmpty}
        />
      </div>
      <div className={Styles["gird"]}>
        <Tables
        setStateFilterStatistic={setStateFilterStatistic}
        flagRefrsh={flagRefrsh}
          infoCompatition={infoCompatition}
          idCompetitions={idCompetitions}
          reducerParticipations={reducerParticipations}
          apiParticipationsEmpty={apiParticipationsEmpty}
        />
      </div>
    </div>
  );
}
