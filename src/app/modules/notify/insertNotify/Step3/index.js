import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Styles from './index.module.scss';
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { actionTypes } from '../../../../../redux/clubmember/clubmember_select_common';
import { checkNationalCode } from '../../../../common/method/nationalCode';
// import { CLUB_MEMBER_SELECT_EMPTY } from '../../../../../../../boot/api/typeActions';

export default function Index({ statusSend, SetstatusSend, national_id, setNational_id, club_reducer }) {

    const dispatch = useDispatch();

    const handelGetMemberId = () => {

        if (national_id) {

            let nCode = checkNationalCode(national_id)

            if (nCode) {
                dispatch({ type: actionTypes.clubmemberSelectAsync, payload: { national_id: national_id } })
            }

            if (!nCode) {
                alert('کد ملی وارد شده صحیح نمی باشد')
                dispatch({ type: actionTypes.CLUB_MEMBER_SELECT_EMPTY })
            }

        }
    }


    return (
        <div className={Styles['Step1']}>
            <h4>نوع اعلان مورد نظر را انتخاب کنید</h4>
            <FormControl component="fieldset">

                <RadioGroup row aria-label="position" name="position" defaultValue={statusSend} onChange={(event) => SetstatusSend(event.target.value)}>

                    <Box width={250}>
                        <FormControlLabel
                            value="SendToAll"
                            control={<Radio color="primary" />}
                            label="ارسال به همه"
                            labelPlacement="end"
                        />
                    </Box>

                    <Box width={250}>
                        <FormControlLabel
                            value="SendToPerson"
                            control={<Radio color="primary" />}
                            label="ارسال به شخص"
                            labelPlacement="end"
                        />

                        {
                            statusSend === 'SendToPerson' && (
                                <>
                                    <Box width={200} mt={3} >
                                        <TextField
                                            id="outlined-basic"
                                            label={'کد ملی'}
                                            variant="outlined"
                                            size="small"
                                            value={national_id}
                                            onBlur={() => handelGetMemberId()}
                                            onChange={(event) => setNational_id(event.target.value)}
                                        />
                                    </Box>

                                    {
                                        club_reducer.data[0]?.body.first_name && (
                                            <Box width={200} mt={3} >
                                                {club_reducer.data[0].body.first_name}
                                                {" "}
                                                {club_reducer.data[0].body.last_name}
                                            </Box>
                                        )
                                    }

                                </>

                            )
                        }

                    </Box>

                </RadioGroup>


            </FormControl>
        </div>
    )
}
