import React, { useEffect } from 'react';
import Header from "./Header";
import Tables from "./Tables/Tables";
import { useDispatch, useSelector } from 'react-redux';
// import { telegramLink_v1_select_actions } from "../../../../boot/api/staticPage/TelegramLink/telegramLink_v1_select/action"
import {actionTypes as telegram} from '../../../../redux/connect/telegram_Select'
import { telegram_update } from '../../../../redux/connect/telegram_update';

export default function Index() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.select_telegram_reducer)


    

    const apiCallSelect = () => {
        // dispatch(telegramLink_v1_select_actions())
        dispatch({type:telegram.telegramSelectAsync,payload:{}})
    }

    useEffect(() => {
        apiCallSelect()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    // data?.data.response?.data.results 
    return (
        <div>
            <Header 
            dataPrev={data?.data.response?.data.results} 
            handleRefresh={apiCallSelect}
            />
            {
                data?.data.response ?
                    <Tables data={data?.data?.response?.data.results} handleRefresh={apiCallSelect}/>
                    : ""
            }
        </div>
    )
}
