import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
// import { ipo_v1_select_actions } from "../../../../boot/api/staticPage/Ipo/Ipo_v1_select/action";
import CardNoData from "../../../common/components/cardNoData";
import {actionTypes as ipo} from '../../../../redux/ipoList/ipo_select_static'


export default function Index() {
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ipo_select_reducer);
  const [state, setState] = useState([]);

  useEffect(() => {
    api_call_select();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data?.data)
      setState(data?.data);
  }, [data]);

  const api_call_select = () => {
    dispatch({type:ipo.ipoSelectAsync})
    // dispatch(ipo_v1_select_actions());
  };
  

  return (
    <div>
      <Header
        id={
          data?.data?.id
            ? data?.data?.id
            : null
        }
        Content={state}
        api_call_select={api_call_select}
      />
      <div className={"boxCustom"}>
        {state.length === 0? (
          <>
          <CardNoData />
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: state }}></div>
        )}
      </div>
    </div>
  );
}
