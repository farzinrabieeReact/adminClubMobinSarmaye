import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { Box, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux';


import Info from './info';
import Documents from './documents';
import UploadDocuments from './uploadDocuments';
import { useSelector } from 'react-redux';
import { clubmember_broker_customer } from '../../../../../redux/clubmember/clubmember_insert_broker_customer';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../common/method/handleNotificationAlert/index';


let useStyles = makeStyles({
    root: {
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 5
    }
})

export default function Index({ setIndexChild, open, setOpen, textError, profile }) {

    let classes = useStyles();
    const dispatch = useDispatch()

    const [state, setstate] = useState({
        id: '',
        body: {
            mobile: "",
            uniqueIdentifier: "",
            privatePerson: {
                firstName: "",
                lastName: "",
                fatherName: "",
                gender: "",
                seriShChar: "",
                seriSh: "",
                serial: "",
                shNumber: "",
                placeOfIssue: "",
                placeOfBirth: "",
            },
            addresses: [
                {
                    postalCode: "",
                    country: {
                        name: ""
                    },
                    province: {
                        name: ""
                    },
                    city: {
                        name: ""
                    },
                    remnantAddress: ""
                },
            ]
        }
    })

    const reducerProfile = useSelector(state => state.reducer_get_kyc_profile)

    useEffect(() => {
        if (reducerProfile.data.length > 0) {
            setstate(reducerProfile.data[0])
        }
    }, [reducerProfile.data])


    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setIndexChild(0)
            }, 500);
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 


    // if (!reducerProfile.data[0]) {
    //     return null
    // }

    let initialValues = {
        firstName: state.body.privatePerson.firstName,
        lastName: state.body.privatePerson.lastName,
        uniqueIdentifier: state.body.uniqueIdentifier,
        mobile: state.body.mobile,
        gender: state.body.privatePerson.gender,
        fatherName: state.body.privatePerson.fatherName,
        serial: state.body.privatePerson.seriSh + " " + state.body.privatePerson.seriShChar + " " + state.body.privatePerson.serial,
        shNumber: state.body.privatePerson.shNumber,
        placeOfBirth: state.body.privatePerson.placeOfBirth,
        placeOfIssue: state.body.privatePerson.placeOfIssue,
        addresses: state.body.addresses[0].country.name + " " + state.body.addresses[0].province.name + " " + state.body.addresses[0].city.name + " " + state.body.addresses[0].remnantAddress + " " + state.body.addresses[0].plaque,
        postalCode: state.body.addresses[0].postalCode,
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checked6: false,
        file_National_r: '',
        file_National_p: '',
        file_Identity: '',
        file_Identity_d: '',
    }

    const validateShcama = Yup.object().shape({
        checked1:
            Yup.boolean()
                .required()
                .oneOf([true]),
        checked2:
            Yup.boolean()
                .required()
                .oneOf([true]),
        checked3:
            Yup.boolean()
                .required()
                .oneOf([true]),
        checked4:
            Yup.boolean()
                .required()
                .oneOf([true]),
        checked5:
            Yup.boolean()
                .required()
                .oneOf([true]),
        checked6:
            Yup.boolean()
                .required()
                .oneOf([true]),
        file_National_r:
            Yup.string()
                .required(),
        file_National_p:
            Yup.string()
                .required(),
        file_Identity:
            Yup.string()
                .required(),
        file_Identity_d:
            Yup.string()
                .required(),

    });

    let onSubmit = (values, { setSubmitting }) => {

        // let member_id = getSessionParam("member_id")

        let member_id = profile.member_id

        let data = {
            is_active: null,
            member_id: member_id,
            account_type: state.body.accounts[0].type,
            member_last_name: state.body.privatePerson.lastName,
            member_first_name: state.body.privatePerson.firstName,
            member_national_id: state.body.uniqueIdentifier,
            home_phone_number: state.body.addresses[0].tel,
            province_id: state.body.addresses[0].province.id,
            city_id: state.body.addresses[0].city.id,
            seri_sh: state.body.privatePerson.seriSh,
            identity_number: state.body.privatePerson.shNumber,
            father_name: state.body.privatePerson.fatherName,
            trading_knowledge_level: state.body.financialInfo.tradingKnowledgeLevel,
            bank_1_branch_code: state.body.accounts[0].branchCode,
            education_id: null,
            bank_id: state.body.accounts[0].bank.id,
            bank_name: state.body.accounts[0].bank.name,
            bank_1_branch_name: state.body.accounts[0].branchName,
            register_serial_alpha: state.body.privatePerson.seriShChar,
            transaction_level_id: state.body.financialInfo.transactionLevel,
            previous_broker: state.body.financialInfo.financialBrokers,
            home_street: state.body.addresses[0].alley,
            home_postal_code: state.body.addresses[0].postalCode,
            bank_account_1_sheba_number: state.body.accounts[0].sheba,
            attachments: JSON.stringify([
                { AttchmentTitle: 'FrontNationalCard', File: values.file_National_r.file, type: values.file_National_r.file_type },
                { AttchmentTitle: 'BackNationalCard', File: values.file_National_p.file, type: values.file_National_p.file_type },
                { AttchmentTitle: 'FirstPageIdentity', File: values.file_Identity.file, type: values.file_Identity.file_type },
                { AttchmentTitle: 'IdentityDescription', File: values.file_Identity_d.file, type: values.file_Identity_d.file_type },
            ]),
            bank_account_1_account_number: state.body.accounts[0].accountNumber,
            home_number: state.body.addresses[0].plaque,
            home_avenue: state.body.addresses[0].remnantAddress,
            stock_introduction_id: state.body.financialInfo.tradingKnowledgeLevel,
            bank_1_branch_location_id: state.body.accounts[0].branchCity.id,
            serial: state.body.privatePerson.serial,
            out_transaction_value: state.body.financialInfo.outExchangeTransaction,
            bank_1_branch_id: state.body.accounts[0].branchCode,
            gender: state.body.privatePerson.gender,
            province_name: state.body.addresses[0].province.name,
            seri_sh_card: state.body.privatePerson.seriShChar,
            alley: state.body.addresses[0].alley,
            assets_value: state.body.financialInfo.assetsValue,
            c_exchange_transaction: state.body.financialInfo.cExchangeTransaction,
            city_name: state.body.addresses[0].city.name,
            city_prefix: state.body.addresses[0].countryPrefix,
            company_address: state.body.jobInfo.companyAddress,
            company_city_prefix: state.body.jobInfo.companyCityPrefix,
            company_email: state.body.jobInfo.companyEmail,
            company_fax: state.body.jobInfo.companyFax,
            company_fax_prefix: state.body.jobInfo.companyFaxPrefix,
            company_name: state.body.jobInfo.companyName,
            company_phone: state.body.jobInfo.companyPhone,
            company_postal_code: state.body.jobInfo.companyPostalCode,
            company_purpose: state.body.financialInfo.companyPurpose,
            compnay_website: state.body.jobInfo.companyWebSite,
            country_id: state.body.addresses[0].country.id,
            country_name: state.body.addresses[0].country.name,
            country_prefix: state.body.addresses[0].countryPrefix,
            emergency_phone: state.body.addresses[0].emergencyTel,
            emergency_phone_city_prefix: state.body.addresses[0].emergencyTelCityPrefix,
            emergency_phone_country_prefix: state.body.addresses[0].emergencyTelCountryPrefix,
            employment_date: state.body.jobInfo.employmentDate,
            fax: state.body.addresses[0].fax,
            fax_prefix: state.body.addresses[0].faxPrefix,
            income_average: state.body.financialInfo.inComingAverage,
            job_description: state.body.jobInfo.jobDescription,
            job_id: state.body.jobInfo.job.id,
            job_title: state.body.jobInfo.job.title,
            place_of_birth: state.body.privatePerson.placeOfBirth,
            out_exchange_transaction: state.body.financialInfo.outExchangeTransaction,
            place_of_issue: state.body.privatePerson.placeOfIssue,
            plaque: state.body.addresses[0].plaque,
            position: state.body.jobInfo.position,
            rate: state.body.financialInfo.rate,
            rate_date: state.body.financialInfo.rateDate,
            reference_rate_company: state.body.financialInfo.referenceRateCompany,
            remnant_address: state.body.addresses[0].remnantAddress,
            s_exchange_transaction: state.body.financialInfo.sExchangeTransaction,
            tel: state.body.mobile,
            email: state.body.email,
            signature_file: state.body.privatePerson.signatureFile,
            trading_codes: state.body.tradingCodes[0].code,
            transaction_level: state.body.financialInfo.transactionLevel,


            status: state.body.status,
            website: state.body.addresses[0].website,
            accounts: state.body.accounts[0].accountNumber,
            section_name: state.body.addresses[0].section.name,
            section_id: state.body.addresses[0].section.id,
            identity_serial_number: state.body.privatePerson.shNumber,


            funding_source: "",
            ime_transaction_value: "",
            register_serial: "",
            home_state_id: "",
            bonds_transaction_value: "",
            state: "",
            dob: "",
            birth_location_id: "",
            has_trade_experience: "",
            registration_id: null,
            customer_id: null,

        }

        clubmember_broker_customer(data)
            .then((res) => {
           
                handleNotificationAlertTryUpdate(res)
                if (res.data.response.error_code) {
                    return
                }
                setOpen(false)
            })
            .catch(() => {
                handleNotificationAlertCatch(dispatch)
            })

    }

    return (
        <div className={classes['root']} >
            <Formik
                enableReinitialize
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
                            <div >
                                <form onSubmit={handleSubmit} >
                                    <Info
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        textError={textError}
                                    />
                                    <Documents
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        textError={textError}
                                    />
                                    <hr />
                                    <UploadDocuments
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        textError={textError}
                                    />
                                    <Box display={'flex'} style={{ justifyContent: 'flex-end', marginTop: 30 }} >
                                        <Box >
                                            <button className={'btnsGreen'} type="submit">تایید اطلاعات</button>
                                        </Box>
                                        <Box >
                                            <button className={'btnsRed'} type="text" onClick={() => setOpen(false)}>لغو</button>
                                        </Box>
                                    </Box>
                                </form>
                            </div>
                        )
                }
            </Formik>
        </div>
    )
}
