import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Box } from '@material-ui/core';
import QuestionOptions from './QuestionOptions';
import Step1 from './Step1';
import { dateMiladi } from "../../../../../common/method/date";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 1000,
        backgroundColor: "white",
        height: 500,
        borderRadius: 10,
        padding: 15,
        position: "relative"
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        margin: "20px 40px",

    },
    buttonStepper: {
        position: "absolute",
        bottom: 30,
        right: 50
    },
    textField: {
        margin: 10,
        boxSizing: "border-box"
    }
}));

function getSteps() {
    return ['اطلاعات پایه', 'متن سوال', 'گزینه های سوال', "توضیحات پاسخ صحیح"];
}



export default function HorizontalNonLinearStepper({ disable, submitInsertCompetition }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = getSteps();

    const [valueInsert, setValueInsert] = useState({ competition_title: "", required_bonus: "", reward_bonus: "", start_date: "", participation_deadline: "", question: "", correct_answer_description: "", updatable: "TRUE", time_start: null })


    /////////////////////////step3/////////////////////////
    const [stateStep3, setStateStep3] = useState([
        { isTrust: false, text: "" },
        { isTrust: false, text: "" },
        { isTrust: false, text: "" },
        { isTrust: false, text: "" },
    ])

    const handleChangeStep3 = (value, index, type) => {
        let newData = stateStep3.map((item, ind) => ind === index ? Object.assign(item, { [type]: value }) : type === "isTrust" ? Object.assign(item, { [type]: false }) : item)
        setStateStep3(newData)
    }

    const addedQuestion = () => {
        if (stateStep3.length === 10) {
            alert("بیشتر از 10 گزینه امکان ندارد.")
            return
        }

        let newQuestion = { isTrust: false, text: "" }
        setStateStep3(prev => [...prev, newQuestion])
    }

    const removeQuestion = (index) => {
        if (stateStep3.length === 2) {
            alert("حدااقل دو گزینه باید وجود دشته باشد")
            return
        }

        let deleteIcon = stateStep3.filter((item, ind) => ind !== index)
        setStateStep3(deleteIcon)
    }

    //////////////////////////////////////////////////////

    const handleChangeValueInsert = (value, type) => {
        setValueInsert(prev => ({
            ...prev, [type]: value
        }))
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Step1
                    valueInsert={valueInsert}
                    handleChangeValueInsert={handleChangeValueInsert}
                    classes={[classes.textField]}
                />;
            case 1:
                return (
                    <Box>
                        <TextField
                            placeholder="متن سوال را وارد کنید..."
                            multiline
                            fullWidth
                            variant="outlined"
                            rows={5}
                            rowsMax={11}
                            value={valueInsert.question}
                            onChange={(e) => handleChangeValueInsert(e.target.value, "question")}
                        />
                    </Box>
                );
            case 2:
                return <QuestionOptions
                    stateStep3={stateStep3}
                    handleChangeStep3={handleChangeStep3}
                    addedQuestion={addedQuestion}
                    removeQuestion={removeQuestion}
                />;
            case 3:
                return <Box>
                    <TextField
                        placeholder="توضیحات گزینه صحیح..."
                        multiline
                        fullWidth
                        variant="outlined"
                        rows={5}
                        rowsMax={11}
                        value={valueInsert.correct_answer_description}
                        onChange={(e) => handleChangeValueInsert(e.target.value, "correct_answer_description")}
                    />
                </Box>;
            default:
                return 'Unknown step';
        }
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        if (completedSteps() === totalSteps() - 1) {
            if (!valueInsert.time_start || !valueInsert.start_date || !valueInsert.participation_deadline) {
                alert("زمان یا تاریخ را انتخاب نکرده اید.")
                return
            }

            let dataQustion = stateStep3.filter(item => item.text)
            let correctAnswer = dataQustion
                .map((item, ind) => item.isTrust ? ind + 1 : "")
                .filter(item => item)

            let answare = {}
            for (let i = 0; i < 10; i++) {
                answare[`answer_${i + 1}`] = dataQustion[i] ? dataQustion[i]["text"] : null
            }

            let result = {
                competition_title: valueInsert.competition_title,
                required_bonus: valueInsert.required_bonus,
                reward_bonus: valueInsert.reward_bonus,
                start_date: `${dateMiladi(valueInsert.start_date)} ${convertDigitToEnglish(valueInsert.time_start.format("hh:mm:ss.000000"))}`,
                participation_deadline: `${dateMiladi(valueInsert.participation_deadline)} 23:59:00.000000`,
                question: valueInsert.question,
                correct_answer: correctAnswer.length ? correctAnswer[0] : null,
                correct_answer_description: valueInsert.correct_answer_description,
                updatable: valueInsert.updatable,
                is_active: null,
                ...answare
            }

            submitInsertCompetition(result)
            disable(false)
            return
        }

        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {
                    allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                         </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div className={classes.buttonStepper}>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        بازگشت
                                   </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        بعدی
                              </Button>

                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" className={classes.completed}>
                                                گام {activeStep + 1} کامل شده
                                            </Typography>
                                        ) : (
                                                <Button variant="contained" color="primary" onClick={handleComplete}>
                                                    {completedSteps() === totalSteps() - 1 ? 'اتمام' : 'کامل شدن'}
                                                </Button>
                                            ))}
                                </div>
                            </div>
                        )}
            </div>
        </div>
    );
}
