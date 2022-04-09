import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as systemsTypes } from "../../../../redux/static/systems/systems_select";
import Header from "../Systems/components/header";
import Tables from "./components/table/Tables";

export default function Index() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.system_select_static_reducer);


  const api_call_select = () => {
    dispatch({ type: systemsTypes.systemsSelectAsync });
  };

  useEffect(() => {
    api_call_select();
  }, []);

  return (
    <div>
      <Header
        dataPrev={data?.data.response?.data.results}
        api_call_select={api_call_select}
      />
      {data?.data.response ? (
        <Tables
          data={data?.data?.response?.data.results}
          api_call_select={api_call_select}
        />
      ) : (
        ""
      )}
    </div>
  );
}
