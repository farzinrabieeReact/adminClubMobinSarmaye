import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Router from './Router';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import { actionTypes } from './../../../../redux/clubmember/clubmember_select_get_kyc_profile'



export default function Index({ profile }) {

    const dispatch = useDispatch()

    const [open, setOpen] = useState(true)
    const [indexChild, setIndexChild] = useState(0)
    const [state, setstate] = useState({ national_id: '' })
    const textError = 'فیلد اجباری می باشد '


    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setIndexChild(0)
                setstate({ national_id: '' })
            }, 500);

            dispatch({ type: actionTypes.clubmemberKycProfileRemove })
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 

    useEffect(() => {
        if (profile) {
            setstate({
                member_id: profile.id,
                national_id: profile.body.national_id
            })
        }
    }, [profile])


    return (
        <div className={`card card-custom`} >
            <Router open={open} setOpen={setOpen} indexChild={indexChild}>
                <StepOne
                    state={state}
                    setOpen={setOpen}
                    setIndexChild={setIndexChild}
                />
                <StepTwo
                    open={open}
                    state={state}
                    setOpen={setOpen}
                    textError={textError}
                    setIndexChild={setIndexChild}
                />
                <StepThree
                    open={open}
                    profile={state}
                    setOpen={setOpen}
                    textError={textError}
                    setIndexChild={setIndexChild}
                />
            </Router>
        </div>
    )
}
