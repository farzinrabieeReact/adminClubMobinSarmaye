import React, { useState } from "react";
import Header from "./Header";
import Tables from "./Tables/Tables";
import { useSelector } from "react-redux";

export default function Index() {
  const dataReducer = useSelector(
    (state: any) => state.pishkhan_v1_select_Reducer
  );
  const [stateFilterExcel, setStateFilterExcel] = useState({});
  const [flagRefrsh, setflagRefrsh] = useState(false);


  const hanldeRefrshFlag=()=>{
    setflagRefrsh(prev=>!prev)
  }

  return (
    <div>
      <Header stateFilterExcel={stateFilterExcel} hanldeRefrshFlag={hanldeRefrshFlag} />
      <Tables
        setStateFilterExcel={setStateFilterExcel}
        dataReducer={dataReducer}
        flagRefrsh={flagRefrsh}
  
      />
    </div>
  );
}
