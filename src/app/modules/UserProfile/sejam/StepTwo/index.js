import React, { useEffect } from 'react'
import * as Yup from "yup";
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, makeStyles } from '@material-ui/core'
import {actionTypes} from './../../../../../redux/clubmember/clubmember_select_get_kyc_profile';


let useStyles = makeStyles({
    root: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8
    }
})


export default function Index({ setIndexChild, state, open, textError, setOpen }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const reducerProfile = useSelector(state => state.reducer_get_kyc_profile)

    useEffect(() => {
        if (reducerProfile.isOk) {
            setIndexChild(2)
        }
    }, [reducerProfile.isOk])//eslint-disable-line react-hooks/exhaustive-deps 


    let initialValues = {
        otp: ''
    }

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setIndexChild(0)
            }, 600);
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 

    const validateShcama = Yup.object().shape({
        otp:
            Yup.string()
                .required(),
    });


    let onSubmit = (values, { setSubmitting }) => {

        let _data = {
            national_id: state.national_id,
            otp: values.otp
        }


        dispatch({type : actionTypes.clubmemberKycProfileSelectAsync , payload : _data})
    }



    return (
        <div className={classes['root']}>
            <div>
                <h3>بروزرسانی اطلاعات </h3>
            </div>
            <hr />
            <div>
                <p>
                    لطفا تا دریافت پیامک تایید از سمت سامانه سجام منتظر بمانید و از این صفحه خارج نشوید.
                </p>
            </div>
            <div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validateShcama}
                    onSubmit={onSubmit} >
                    {
                        ({
                            values,
                            touched,
                            errors,
                            handleSubmit,
                            setFieldValue,
                        }
                        ) => (
                                <div className={''}>
                                    <div>
                                        <p>
                                            کد تایید دریافت شده از سامانه سجام:
                                        </p>
                                    </div>
                                    <div>

                                        <form onSubmit={handleSubmit}>
                                            <Box width="270px">
                                                <TextField
                                                    id="outlined-name"
                                                    label="کد تایید"
                                                    value={values.otp}
                                                    onChange={event => setFieldValue('otp', event.target.value)}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                                {
                                                    touched.otp && errors.otp && (
                                                        <div className={'text-danger'}>
                                                            {textError}
                                                        </div>
                                                    )
                                                }
                                            </Box>
                                            <Box>
                                                <Box style={{display:'flex' , justifyContent:'flex-end' , marginTop:20}}>
                                                    <button className={'btnsBlue'} type="submit">ثبت درخواست</button>
                                                    <button className={'btnsRed'} onClick={() => setOpen(false)}>لغو</button>
                                                </Box>
                                            </Box>
                                        </form>

                                    </div>
                                </div>
                            )
                    }
                </Formik>
            </div>
        </div>
    )
}
