import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@material-ui/core";
import { actionTypes } from './../../../../redux/education/education_course_select';
import { actionTypes as actionProfile } from './../../../../redux/education/education_registration_profile';
import { actionTypes as actionInsert } from './../../../../redux/education/education_course_insert';
import { actionTypes as actionTypesNotif } from './../../../../redux/notificationAlert/index';
import { data_m } from "../../../common/method/date";
import { education_register_insert } from "../../../../redux/education/education_register_insert";
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from "../../../common/method/handleNotificationAlert";


const useStyles = makeStyles(theme => ({
  root: {
    width: 1200,
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    margin: '0 auto'
  },
  backButton: {
    // marginRight: theme.spacing(1)
  },
  instructions: {
    // margin: theme.spacing(3),
    minHeight: 200
    // marginBottom: theme.spacing(5),
    // marginRight: theme.spacing(3),
    // marginLeft: theme.spacing(3),
  },
  buttons: {
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-end"
  },
  stepper3Ui: {},
  textField: {
    width: 255,
    margin: 10
  }
}));


function getSteps() {
  return ["انتخاب دوره", "انتخاب شخص", "تایید نهایی"];
}


const RegisterPerson = () => {

  const classes = useStyles();
  const dispatch = useDispatch();


  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({
    courseSelect: { name: "", value: "" },
    national_id: ""
  });


  const reducerProfile = useSelector(
    state => state.education_profile_select_Reducer
  );

  const Courses_Reducer = useSelector(
    (state) => state.education_course_select_Reducer
  );


  useEffect(() => {
    return function () {
      dispatch({ type: actionProfile.educationProfileEmpty })
    };
  }, [data]); //eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    let data = {
      size: Courses_Reducer.size
    }
    dispatch({ type: actionTypes.educationCourseSelectAsync, payload: data })
  }, [])


  const handleChange = (value, type) => {
    setData(prev => ({ ...prev, [type]: value }));
  };
  
  const apiCallInsert = () => {
    let result = {
      data: {
        course_id: data.courseSelect.value,
        course_name: data.courseSelect.name.body.Name,
        member_id: reducerProfile.dataProfile[0].id,
        member_first_name: reducerProfile.dataProfile[0].body.first_name,
        member_last_name: reducerProfile.dataProfile[0].body.last_name,
        member_national_id: reducerProfile.dataProfile[0].body.national_id,
        registration_date: data_m(),
        status: null,
        register_bonus_id: null,
        unregister_bonus_id: null
      }
    };
    
    // dispatch({type :actionInsert.educationCourseInsertAsync , payload:result});
    education_register_insert(result.data)
    .then((result) => {
      let isok = handleNotificationAlertTryUpdate(result)
      if(isok){
        return
      }
    }).catch((err) => {
      handleNotificationAlertCatch()
    });
  };

  const handleStepNext = () => {
    if (activeStep === steps.length - 1) {
      if (!reducerProfile.isOkProfile || !data.courseSelect.name) {
           dispatch({ type: actionTypesNotif.warning, textAlert: "کاربر گرامی دوره یا کد ملی به درستی وارد نشده است" })

        return;
      }
      apiCallInsert();

      return;
    }


    if (activeStep === 1 && !data.national_id) {
      alert("وارد کردن کد ملی الزامی است");
      return;
    } else if (activeStep === 1 && data.national_id) {

      // let data = {
      //     national_id: data?.national_id
      // }

      dispatch({ type: actionProfile.educationProfileSelectAsync, payload: {data:data.national_id} })
    }

    handleNext();
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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

            {// Courses_Reducer.data.length && (
              Courses_Reducer?.data.map(item => (
                <MenuItem
                  value={item}
                  // color="primary"
                  style={{ color: "black" }}
                  onClick={() =>
                    handleChange({ name: item, value: item.id }, "courseSelect")
                  }
                  key={item.id}
                >
                  {item.body.Name}
                </MenuItem>

              ))}
          </TextField>
        );
      case 1:
        return (
          <TextField
            id="input-insert-courses1"
            label="کد ملی"
            value={data.national_id}
            onChange={event => handleChange(event.target.value, "national_id")}
            helperText="کد ملی را وارد کنید"
            variant="outlined"
            className={classes.textField}
          ></TextField>
        );
      case 2:
        return (
          <>
            <TextField
              id="input-insert-courses1"
              label="نام"
              value={
                !reducerProfile?.isOkProfile
                  ? ""
                  : reducerProfile?.dataProfile[0].body.first_name
              }
              variant="outlined"
              className={classes.textField}
            ></TextField>

            <TextField
              id="input-insert-courses2"
              label="نام خانوادگی"
              value={
                !reducerProfile?.isOkProfile
                  ? ""
                  : reducerProfile?.dataProfile[0].body.last_name
              }
              variant="outlined"
              className={classes.textField}
            ></TextField>

            <TextField
              id="input-insert-courses3"
              label="کد ملی"
              value={
                !reducerProfile?.isOkProfile
                  ? ""
                  : reducerProfile?.dataProfile[0].body.national_id
              }
              variant="outlined"
              className={classes.textField}
            ></TextField>
            <TextField
              id="input-insert-courses4"
              label="دوره ی انتخابی"
              value={data.courseSelect.name.body.Name}
              variant="outlined"
              className={classes.textField}
            ></TextField>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }
  return (
    <>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div className="ml-30 ">
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div className={classes.buttons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                مرحله قبلی
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStepNext}
              >
                {activeStep === steps.length - 1 ? "اتمام" : "مرحله بعدی"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPerson;
