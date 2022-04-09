import React, { useEffect, useState } from 'react'
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { checkNationalCode, checkNationalCodeLegal } from './../../../../common/method/nationalCode';
import { useDispatch, useSelector } from 'react-redux';

import { actionTypes } from './../../../../../redux/notificationAlert';
import { actionTypes as actionMemberRemain } from './../../../../../redux/stock/select_member_remain/index';
import { sepratePriceFromComma } from './../../../../common/method/seprateNumberFromComma';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "35ch",
        [`& fieldset`]: {
            borderRadius: 20,
        },
    },
    remain: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '72%',
        marginLeft: 20,
        flexWrap: 'wrap'
    }
}));


export default function Index({ national_id, setNational_id, apiClubmember, member_id }) {

    const classes = useStyles();
    const dispatch = useDispatch()

    const memberRemainReducer = useSelector(state => state.select_member_remain_reducer)
    const stockDetailsReducer = useSelector((state) => state.select_stock_details_reducer);
    const portfolioDailyReducer = useSelector((state) => state.select_portfolio_daily_reducer);
 
    const [total, settotal] = useState({ CurrentCount: '', CSDCount: '' })
    const [remain, setRemain] = useState({
        account_balance: "",
        blocked_balance: "",
        real_balance: "",
    })

    const handel_submit = () => {
        if (national_id.length === 0) {
            dispatch({
                type: actionTypes.warning,
                textAlert: "لطفا کد ملی مورد نظر را پر نمایید"
            });
            return
        }

        let isOkCode = checkNationalCode(national_id)
        let isOkLegal = checkNationalCodeLegal(national_id)

        if (isOkCode || isOkLegal) {
            let data = {
                national_id: national_id
            }
            apiClubmember(data)
            return
        } else {
            let textError = 'لطفا کد ملی را به درستی وارد نمایید'
            dispatch({
                type: actionTypes.warning,
                textAlert: textError
            })
            return
        }

    }

    useEffect(() => {
        if (member_id[0]) {
            let data = {
                data: {
                    member_id: member_id[0].id
                }
            }
            dispatch({ type: actionMemberRemain.memberRemainAsync, payload: data });
        }
    }, [member_id]);

    useEffect(() => {
        if (memberRemainReducer.data[0]) {
            let data = memberRemainReducer.data[0].body
            setRemain(data)
        }
    }, [memberRemainReducer])


    useEffect(() => {

        let sumCurrentCount = 0
        let sumCSDCount = 0

        Object.keys(stockDetailsReducer.data).forEach(isin => {

            let data = portfolioDailyReducer.data[0].body.customer_stock_portfolio[isin]
            let price = stockDetailsReducer.data[isin]?.results[0]?.body?.last_price

            if (data && price) {
                sumCurrentCount += data.CurrentCount * price
                sumCSDCount += data.CSDCount * price
            }
        })

        settotal({ CurrentCount: sumCurrentCount, CSDCount: sumCSDCount })

    }, [stockDetailsReducer])



    return (
        <div className={'d-flex'} style={{marginBottom:10}}>
            <Box borderRadius={20} className={'d-flex'}>
                <FormControl
                    size="small"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                >
                    <InputLabel htmlFor="standard-start-adornment">
                        کد ملی را وارد نمایید
          </InputLabel>
                    <OutlinedInput
                        id="standard-start-adornment"
                        type={"text"}
                        value={national_id}
                        onChange={(event) => setNational_id(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    onClick={handel_submit}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={270}
                    />
                </FormControl>
            </Box>
            <Box
                className={classes['remain']}>
                {
                    member_id[0] && (
                        <p>
                            {
                                member_id[0].body.first_name + " " + member_id[0].body.last_name
                            }
                        </p>

                    )
                }
                <p>قدرت خرید:{sepratePriceFromComma(remain.account_balance)}</p>
                <p>مانده بلوکه شده:{sepratePriceFromComma(remain.blocked_balance)}</p>
                <p>مجموع:{sepratePriceFromComma(remain.real_balance)}</p>
                <p>ارزش پرتفوی(لحظه ای): {sepratePriceFromComma(total.CurrentCount)}</p>
                <p>ارزش پرتفوی( سپرده گذاری): {sepratePriceFromComma(total.CSDCount)}</p>
            </Box>
        </div>
    )
}
