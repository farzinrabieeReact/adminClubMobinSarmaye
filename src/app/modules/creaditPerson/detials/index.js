import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Tables from "./Tables/index.tsx";

export default function Index({
  data,
  national_id,
  setNational_id,
  stateClubmember,
  handel_submit,
  flagCallApi,
  setflagCallApi,
  flagRefresh,
  handleRefreshFlag,
}) {
  const [flagFilter, setflagFilter] = useState(false);

  const stateReducer = useSelector((state) => state.Creadit_select_reducer);

 

  return (
    <div>
      <Header
        handleRefreshFlag={handleRefreshFlag}
        handel_submit={handel_submit}
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        national_id={national_id}
        setNational_id={setNational_id}
        stateClubmember={stateClubmember}
      />
      {/* <FilterItems
                flagFilter={flagFilter}
                handleFilter={handleFilter}
                national_id={national_id}
            /> */}
      {stateReducer.loading && <LinearProgress />}
      <Tables
        flagRefresh={flagRefresh}
        setflagCallApi={setflagCallApi}
        flagCallApi={flagCallApi}
        setNational_id={setNational_id}
        national_id={national_id}
        flagFilter={flagFilter}
        data={data}
      />
    </div>
  );
}
