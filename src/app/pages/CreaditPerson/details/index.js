import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
// import SearchNationalCode from './SearchNationalCode';
// import Content from './Content';
import { useSelector, useDispatch } from "react-redux";
// import { creadit_v1_action_select } from "../../../../boot/api/profile/creadit/credit_v1_select/action"
// import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";
import Content from "../../../modules/creaditPerson/detials";
import { actionTypes as selectCreadit } from "../../../../redux/profile/creadit";
import { actionTypes as person } from "../../../../redux/person/person_v1_select_Integrate_profiles";

export default function Index() {
  const stateReducer = useSelector((state) => state.Creadit_select_reducer);
  const stateClubmember = useSelector(
    (state) => state.person_v1_profile_picture
  );


  // console.log("stateClubmember",stateClubmember)
  // console.log("stateReducer",stateReducer)
  const dispatch = useDispatch();
  let nCode = { ...stateClubmember };
  const [national_id, setNational_id] = useState(nCode.national_id);
  const [flagCallApi, setflagCallApi] = useState(false);
  const [flagRefresh, setflagRefresh] = useState(false);
  
  const handel_submit = () => {
  
    if (national_id.length > 1) {
      // apiselectCreadit({ national_id: national_id })
      setflagCallApi(true)
    } else {
      dispatch({ type: "ALERT", payload: { status: true, textAlert: "لطفا فیلد کد ملی را وارد نمایید", typeAlert: "info" } })
    }
  }

 const handleRefreshFlag = ()=>{
  setflagRefresh(prev=>!prev)
 }

  return (
    <div className={Styles["creadit"]}>
      <Content
      handleRefreshFlag={handleRefreshFlag}
      setflagCallApi={setflagCallApi}
      flagCallApi={flagCallApi}
      handel_submit={handel_submit}
        data={stateReducer.data}
        national_id={national_id}
        flagRefresh={flagRefresh}
        setNational_id={setNational_id}
        stateClubmember={stateClubmember}
      />
    </div>
  );
}
