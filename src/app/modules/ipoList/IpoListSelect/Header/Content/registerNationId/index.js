import React, { useEffect, useState } from "react";
import { checkNationalCode, checkNationalCodeLegal } from "../../../../../../common/method/nationalCode";
import Router from '../router'
import SearchNationalCode from '../SearchInput'
import {actionTypes as user} from "../../../../../../../redux/ipoList/ipo_user_select_status"
import { useDispatch, useSelector } from "react-redux";
import Info from '../info'

const Index = ({handleChange,setnationId,nationId,handleExit,valContent}) => {
    const [indChild, setindChild] = useState(0);
    const dispatch = useDispatch()



    const reduserUser = useSelector(state => state.ipo_status_reducer)
    const apiSelectClubmember = (id) => {

        let national_id = id
        let isOkCode = checkNationalCode(national_id)
        let isOkLegal = checkNationalCodeLegal(national_id)

        if (isOkCode || isOkLegal) {
            // dispatch(select_user_status_action({ national_id: national_id, ipo_id: ipo_id.id }))
            let data={
                 national_id: national_id, 
                 ipo_id: valContent.id
            }
            dispatch({type:user.ipoUserStatusAsync,payload:{data}})
            return
        } else {
            let textError = 'لطفا کد ملی را به درستی وارد نمایید'
            dispatch({ type: "ALERT", payload: { status: true, textAlert: textError, typeAlert: "warning" } })
            return
        }

    }



    
    useEffect(() => {

      return () => {
          // setModal('')
          setindChild(0)
          // dispatch({ type: SELECT_USER_STATUS_EMPTY })
          dispatch({type:user.ipoUserStatusEmpty})
      }
  }, [])  //eslint-disable-line react-hooks/exhaustive-deps









    useEffect(() => {
      if (reduserUser.data.length > 0) {
        setindChild(1)
      }
  }, [reduserUser.data])


  return (
    <>
      <div  >
        <Router indChild={indChild}>
          <SearchNationalCode
            apiSelectClubmember={apiSelectClubmember}
            handleChange={handleChange}
            nationId={nationId}
            setnationId={setnationId}
            handleExit={handleExit}
            // setNewButton={setNewButton}
          />
          {/* <h1>farhad</h1> */}
          <Info
            data={reduserUser.data}
            national_id={nationId}
            ipo_id={valContent}
            handleExit={handleExit}
            // setNewButton={setNewButton}
          />
        </Router>
      </div>
    </>
  );
};

export default Index;
