import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SearchNationalCode from './SearchNationalCode';
import Router from './router';
import Info from './info';
// import { checkNationalCode, checkNationalCodeLegal } from './../../../../../../Common/method/NationalCode'

import { select_user_status_action } from './../../../../../../../boot/api/Definitions/ipoLIst/select_user_status/action';
import { SELECT_USER_STATUS_EMPTY } from './../../../../../../../boot/api/typeActions';
import { checkNationalCodeLegal,checkNationalCode} from '../../../../../../common/method/nationalCode';


export default function Index({ setModal, setNewButton, ipo_id }) {


    let dispatch = useDispatch()

    const [indexChild, setIndexChild] = useState(0)
    const [national_id, setNational_id] = useState('')

    const reduserUser = useSelector(state => state.select_user_status_reducer)

    const apiSelectClubmember = (id) => {

        let national_id = id

        let isOkCode = checkNationalCode(national_id)
        let isOkLegal = checkNationalCodeLegal(national_id)

        if (isOkCode || isOkLegal) {
            dispatch(select_user_status_action({ national_id: national_id, ipo_id: ipo_id.id }))
            return
        } else {
            let textError = 'لطفا کد ملی را به درستی وارد نمایید'
            dispatch({ type: "ALERT", payload: { status: true, textAlert: textError, typeAlert: "warning" } })
            return
        }

    }

    useEffect(() => {

        return () => {
            setModal('')
            setIndexChild(0)
            dispatch({ type: SELECT_USER_STATUS_EMPTY })
        }
    }, [])  //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (reduserUser.data.length > 0) {
            setIndexChild(1)
        }
    }, [reduserUser.data])

    return (
        <div>
            <Router indexChild={indexChild}>
                <SearchNationalCode
                    apiSelectClubmember={apiSelectClubmember}
                    national_id={national_id}
                    setNational_id={setNational_id}
                    setNewButton={setNewButton}
                />
                <Info data={reduserUser.data} national_id={national_id} ipo_id={ipo_id} setNewButton={setNewButton} />
            </Router>

        </div>
    )
}
