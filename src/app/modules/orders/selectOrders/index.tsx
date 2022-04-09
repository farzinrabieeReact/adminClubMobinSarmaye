import React, { useState, useEffect } from 'react'
import SearchNationalCode from './SearchNationalCode';
import { useSelector, useDispatch } from "react-redux";
import { actionTypes as selectPofilePicture } from "../../../../redux/person/person_v1_select_Integrate_profiles";
import { actionTypes as selectSummaries } from "../../../../redux/summaries";
import Content from './Content';

export default function Index() {

    const dispatch = useDispatch();

    const [memberId, setMemberId] = useState('')
    const [fullName, setfullName] = useState('')
    const [valueTab, setValueTab] = useState(0)


    const stateReducerProfile = useSelector((state: any) => state.person_v1_profile_picture);
    const stateReducerSummaries = useSelector((state: any) => state.select_summaries_Reducer);

    const apiSelectProfile = (national_id: any) => {
        dispatch({
            type: selectPofilePicture.selectPofilePictureAsync,
            payload: national_id,
        });
    };


    useEffect(() => {
        if (stateReducerProfile.data[0]) {
            let firstName = stateReducerProfile.data[0].body.first_name
            let lastName = stateReducerProfile.data[0].body.last_name

            setMemberId(stateReducerProfile.data[0].id);
            setfullName(firstName + ' ' + lastName)
        }
    }, [stateReducerProfile.data]);




    useEffect(() => {
        if (!stateReducerSummaries.data.length) {
            dispatch({
                type: selectSummaries.selectSummariesAsync,
                payload: {},
            });
        }

    }, []);

    const checkIsin = (isin: any) => {
        if (stateReducerSummaries.isinJson[isin])
            return stateReducerSummaries.isinJson[isin]
        return isin
    }


    return (
        <div>
            <div>
                <SearchNationalCode
                    apiSelectProfile={apiSelectProfile}
                    fullName={fullName}
                    memberId={memberId}
                    setfullName={setfullName}
                />
            </div>
            <Content
                valueTab={valueTab}
                setValueTab={setValueTab}
                checkIsin={checkIsin}
                memberId={memberId}
                setMemberId={setMemberId}
           />
        </div >
    )
}
