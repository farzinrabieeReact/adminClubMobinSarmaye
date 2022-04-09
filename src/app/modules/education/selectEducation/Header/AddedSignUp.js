import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

import {actionTypes as educationProfileSelect} from '../../../../../redux/education/education_registration_profile'
// import { registration_v1_actions_profile } from "../../../../../boot/api/Definitions/EducationCourses/registration_v1_insert/actionProfile"
// import { registration_v1_actions_insert } from "./../../../../../boot/api/Definitions/EducationCourses/registration_v1_insert/actionInsert"
import { data_m } from "./../../../../common/method/date"
// import { REGISTRATION_COURSE_V1_EMPTY } from '../../../../../boot/api/typeActions';
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../../common/method/handleNotificationAlert';
import { education_register_insert } from '../../../../../redux/education/education_register_insert';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        margin: theme.spacing(3),
        minHeight: 200
        // marginBottom: theme.spacing(5),
        // marginRight: theme.spacing(3),
        // marginLeft: theme.spacing(3),
    },
    buttons: {
        textAlign: "right"
    },
    stepper3Ui: {

    },
    textField: {
        width: 255,
        margin: 10
    }
}));


function getSteps() {
    return ['انتخاب دوره', 'انتخاب شخص', 'تایید نهایی'];
}


export default function HorizontalLabelPositionBelowStepper({ setflagPerson, Courses_Reducer }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [data, setData] = React.useState({
        courseSelect: { name: "", value: "" },
        national_id: "",
    });

    const dispatch = useDispatch()
    const reducerProfile = useSelector(state => state.registeration_v1_select_insert)

    useEffect(() => {
        return function(){
            // dispatch({type : REGISTRATION_COURSE_V1_EMPTY})
        }
    }, [data]) //eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (value, type) => {
        setData(prev => ({ ...prev, [type]: value }))
    }

    const apiCallInsert = () => {
        let result = {
            course_id: data.courseSelect.value,
            course_name: data.courseSelect.name,
            member_id: reducerProfile.dataProfile[0].id,
            member_first_name: reducerProfile.dataProfile[0].body.first_name,
            member_last_name: reducerProfile.dataProfile[0].body.last_name,
            member_national_id: reducerProfile.dataProfile[0].body.national_id,
            registration_date: data_m(),
            status: null,
            register_bonus_id: null,
            unregister_bonus_id: null
        }

        dispatch(education_register_insert(result))
        .then((result) => {
            let isOK = handleNotificationAlertTryUpdate(result)
            if(!isOK){
                return
            }
        }).catch((err) => {
            handleNotificationAlertCatch()
        });
    }


    const handleStepNext = () => {
        if (activeStep === steps.length - 1) {
            if (!reducerProfile.isOkProfile || !data.courseSelect.name) {
                alert("دوره یا کدملی را وارد نکرده اید.")
                return
            }
            apiCallInsert()
            setflagPerson(false)
            return
        }    
        if (activeStep === 1 && !data.national_id) {
            alert("وارد کردن کد ملی الزامی است")
            return
        } else if (activeStep === 1 && data.national_id) {
            // dispatch(registration_v1_actions_profile(data.national_id))
         
            dispatch({type:educationProfileSelect.educationProfileSelectAsync,payload:{data:data.national_id}})
        }

        handleNext()
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <TextField
                        id="input-insert-courses1"
                        select
                        label="انتخاب دوره"
                        value={data.courseSelect.name}
                        // onChange={(event) => handleChange(event.target.value, "courseSelect")}
                        helperText="دوره مورد نظر را انتخاب کنید"
                        variant="outlined"
                        className={classes.textField}
                    >

                        {
                            // Courses_Reducer.data.length && (
                                Courses_Reducer.data.response.data.results.map((item) => (
                                    <MenuItem value={item.body.Name} onClick={() => handleChange({ name: item.body.Name, value: item.id }, "courseSelect")} key={item.id}>
                                        {item.body.Name}
                                    </MenuItem >
                                ))
                            // )
                        }
                    </TextField>
                )
            case 1:
                return (
                    <TextField
                        id="input-insert-courses1"
                        label="کد ملی"
                        value={data.national_id}
                        onChange={(event) => handleChange(event.target.value, "national_id")}
                        helperText="کد ملی را وارد کنید"
                        variant="outlined"
                        className={classes.textField}
                    >
                    </TextField>
                );
            case 2:
                return (
                    <>
                        <TextField
                            id="input-insert-courses1"
                            label="نام"
                            value={!reducerProfile.isOkProfile ? "" : reducerProfile.dataProfile[0].body.first_name}
                            variant="outlined"
                            className={classes.textField}
                        >
                        </TextField>

                        <TextField
                            id="input-insert-courses2"
                            label="نام خانوادگی"
                            value={!reducerProfile.isOkProfile ? "" : reducerProfile.dataProfile[0].body.last_name}
                            variant="outlined"
                            className={classes.textField}
                        >
                        </TextField>

                        <TextField
                            id="input-insert-courses3"
                            label="کد ملی"
                            value={!reducerProfile.isOkProfile ? "" : reducerProfile.dataProfile[0].body.national_id}
                            variant="outlined"
                            className={classes.textField}
                        >
                        </TextField>

                        <TextField
                            id="input-insert-courses4"
                            label="دوره ی انتخابی"
                            value={data.courseSelect.name}
                            variant="outlined"
                            className={classes.textField}
                        >
                        </TextField>
                    </>
                )
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div className={classes.buttons}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            مرحله قبلی
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleStepNext}>
                            {activeStep === steps.length - 1 ? 'اتمام' : 'مرحله بعدی'}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}
