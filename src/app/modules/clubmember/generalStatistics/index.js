import React, { useState, useEffect } from 'react'
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import{seprateNumberFromComma} from './../../../common/method/seprateNumberFromComma';


// import { select_total_bonus_action } from './../../../../boot/api/generalStatistics/select_total_bonus/action'
// import { select_clubmember_count_action } from './../../../../boot/api/generalStatistics/select_clubmember_count/action'
// import { select_clubmember_registration_count_action } from './../../../../boot/api/generalStatistics/select_clubmember_registration_count/action'
// import { select_clubmember_by_bourse_code_count_action } from './../../../../boot/api/generalStatistics/select_clubmember_by_bourse_code_count/action'
// import { select_clubmember_daily_login_log_action } from './../../../../boot/api/generalStatistics/select_clubmember_daily_login_log/action'


import {actionTypes as totalBonus} from '../../../../redux/generalStatistics/total_bonus_select'
import {actionTypes as clubmemberRegistration} from '../../../../redux/generalStatistics/clubmember_registration_count'
import {actionTypes as bourseCode} from '../../../../redux/generalStatistics/clubmember_bourse_code_select'
import {actionTypes as dailyLoginLog} from '../../../../redux/generalStatistics/clubmember_daily_login_log_select'
import {actionTypes as clubmemberCountSelect} from '../../../../redux/generalStatistics/clubmember_count_select' 


let useStyles = makeStyles({
    bg: {
        backgroundColor: 'white',
        boxShadow: '1px 1px 5px rgba(0,0,0,0.2)',
    },
    root: {
        padding: '10px 20px 50px 25px',
        height:"83vh",
        overflow:'hidden'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        
    },
    grid: {
        width: '49%',
        minHeight: "44vh",
        borderRadius: 5,
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent:'center',
        flexWrap: 'wrap',
        minWidth:'300px'
    },
    contentBox: {
        width: '100%',
        minHeight: '30vh',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    card: {
        width: 230,
        height: 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10
    },
    gridLeft: {
        width: '49%',
        minHeight: "44vh",
        minWidth:'300px'
    },
    gridLeft_t: {
        minHeight: "21vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexWrap: 'wrap',

    },
    gridLeft_b: {
        minHeight: "21vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

    },

})


export default function Index() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [flagFilter, setFlagFilter] = useState(false)

    const reducerTotalBonus = useSelector(state => state.clubmember_total_bonus_reducer)
    const reducerCount = useSelector(state => state.clubmember_count_select_reducer)
    const reducerRegistrationCount = useSelector(state => state.clubmember_registration_count_reducer)
    const reducerByBourseCodeCount = useSelector(state => state.clubmember_bourse_code_count_reducer)
    const reducerLogin = useSelector(state => state.clubmember_daily_login_log_reducer)
    const apiTotalBonus = (data) => {
        // dispatch(select_total_bonus_action(data))
        dispatch({type:totalBonus.selectTotalBonusAsync,payload:data})
    }

    const apiCount = (data) => {
        // dispatch(select_clubmember_count_action(data))
        dispatch({type:clubmemberCountSelect.selectClubmemberCountAsync,payload:data})
    }
    
    const apiRegistrationCount = (data) => {
        // dispatch(select_clubmember_registration_count_action(data))
        dispatch({type:clubmemberRegistration.selectClubmemberRegistrationCountAsync,payload:data})
    }

    const apiByBourseCodeCount = (data) => {
        // dispatch(select_clubmember_by_bourse_code_count_action(data))
        dispatch({type:bourseCode.selectClubmemberBourseCodeAsync,payload:data})
    }

    const apiLogin= (data) => {
        // dispatch(select_clubmember_daily_login_log_action(data))
        dispatch({type:dailyLoginLog.selectClubmemberDailyLoginAsync,payload:data})
    }

    useEffect(() => {
        apiTotalBonus();
        apiCount();
        apiRegistrationCount();
        apiByBourseCodeCount();
        apiLogin();
    }, [])
    return (
        <div>
            {/* <Header handelShowFilterItems={() => setFlagFilter(!flagFilter)} /> */}
            <div className={classes['root']}>
                <div className={classes['content']}>
                    <div className={`${classes['bg']} ${classes['grid']}`}>
                        <div className={`${classes['card']} ${classes['bg']} `}>
                            <p>تعداد کل کاربران:</p>
                            <p>
                                {
                                    reducerCount.data.results[0]
                                        ? seprateNumberFromComma(reducerCount.data.results[0].body.total) 
                                        : '-'
                                }
                            </p>
                        </div>
                        <div className={`${classes['card']} ${classes['bg']} `}>
                            <p>  تعداد کل کاربران خانم :</p>
                            <p>
                                {
                                    reducerCount.data.results[0]
                                        ? seprateNumberFromComma(reducerCount.data.results[0].body.total_female) 
                                        : '-'
                                }
                            </p>
                        </div>
                        <div className={`${classes['card']} ${classes['bg']} `}>
                            <p>تعداد کل کاربران آقا :</p>
                            <p>
                                {
                                    reducerCount.data.results[0]
                                        ? seprateNumberFromComma(reducerCount.data.results[0].body.total_male) 
                                        : '-'
                                }
                            </p>
                        </div>
                        <div className={`${classes['card']} ${classes['bg']} `}>
                            <p>تعداد کل کاربران بدون کد بورسی :</p>
                            <p>
                                  {
                                    reducerByBourseCodeCount.data.results[0]
                                        ? seprateNumberFromComma(reducerByBourseCodeCount.data.results[0].body.total_without_bourse_code) 
                                        : '-'
                                }
                            </p>
                        </div>
                        <div className={`${classes['card']} ${classes['bg']} `}>
                            <p>تعداد کل کاربران با کد بورسی :</p>
                            <p>
                                  {
                                    reducerByBourseCodeCount.data.results[0]
                                        ? seprateNumberFromComma(reducerByBourseCodeCount.data.results[0].body.total_with_bourse_code) 
                                        : '-'
                                }
                            </p>
                        </div>
                    </div>
                    <div className={` ${classes['gridLeft']}`}>
                        <div className={`${classes['bg']} ${classes['gridLeft_t']}`}  >
                            <div className={`${classes['card']} ${classes['bg']} `}>
                                <p>تعداد ورود امروز :</p>
                                <p>
                                {
                                    reducerLogin.data.results[0]
                                        ? seprateNumberFromComma(reducerLogin.data.results[0].body.daily_login_log) 
                                        : '-'
                                }  
                                </p>
                            </div>
                        </div>
                        <div className={`${classes['bg']} ${classes['gridLeft_b']}`} >
                            <div className={`${classes['card']} ${classes['bg']} `}>
                                <p>تعداد ثبت نام امروز :</p>
                                <p>
                                    {
                                        reducerRegistrationCount.data.results[0]
                                            ? seprateNumberFromComma(reducerRegistrationCount.data.results[0].body.daily_registration) 
                                            : '-'
                                    }
                                </p>
                            </div>
                            <div className={`${classes['card']} ${classes['bg']} `}>
                                <p>تعداد ثبت نام این ماه  :</p>
                                <p>
                                    {
                                        reducerRegistrationCount.data.results[0]
                                            ? seprateNumberFromComma(reducerRegistrationCount.data.results[0].body.monthly_registration) 
                                            : '-'
                                    }
                                </p>
                            </div>
                            <div className={`${classes['card']} ${classes['bg']} `}>
                                <p>تعداد ثبت نام امسال  :</p>
                                <p>
                                    {
                                        reducerRegistrationCount.data.results[0]
                                            ? seprateNumberFromComma(reducerRegistrationCount.data.results[0].body.yearly_registration) 
                                            : '-'
                                    }
                                </p>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <br />
                <div className={`${classes['bg']} ${classes['contentBox']}`}>
                    <div className={`${classes['card']} ${classes['bg']} `}>
                        <p>کل امتیازات  :</p>
                        <p>
                            {
                                reducerTotalBonus.data.results[0]
                                    ? seprateNumberFromComma(reducerTotalBonus.data.results[0].body.total_bonus) 
                                    : '-'
                            }
                        </p>
                    </div>
                    <div className={`${classes['card']} ${classes['bg']} `}>
                        <p>کل امتیازات رزرو شده  :</p>
                        <p>
                            {
                                reducerTotalBonus.data.results[0]
                                    ? seprateNumberFromComma(reducerTotalBonus.data.results[0].body.reserved_bonus) 
                                    : '-'
                            }
                        </p>
                    </div>
                    <div className={`${classes['card']} ${classes['bg']} `}>
                        <p>کل امتیازات قابل استفاده   :</p>
                        <p>
                            {
                                reducerTotalBonus.data.results[0]
                                    ? seprateNumberFromComma(reducerTotalBonus.data.results[0].body.available_bonus) 
                                    : '-'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
