import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Box } from '@material-ui/core';
import QuestionOptions from './QuestionOptions';

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
    return ["گزینه های سوال", "توضیحات پاسخ صحیح"]
}



export default function HorizontalNonLinearStepper({ disable, data, submit_update_competition_answer }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const steps = getSteps();

    const [valueInsert, setValueInsert] = useState({ correct_answer_description: "" })
    const [stateStep3, setStateStep3] = useState([])

    useEffect(() => {
        setValueInsert({
            correct_answer_description: data.body.correct_answer_description,
        })

        let answare = []
        for (let i = 0; i < 10; i++) {
            if (data.body[`answer_${i + 1}`] !== "null") {
                answare.push({ isTrust: data.body.correct_answer === i + 1 ? true : false, text: (data.body[`answer_${i + 1}`]) })
            }
        }
        setStateStep3(answare)
    }, [data])



    const handleChangeStep3 = (value, index, type) => {

        let newData = stateStep3.map((item, ind) => ind === index ? Object.assign(item, { [type]: value }) : type === "isTrust" ? Object.assign(item, { [type]: false }) : item)
        setStateStep3(newData)
    }

    const addedQuestion = () => {
        alert("امکان اضافه کردن گزینه وجود ندارد")
    }

    const removeQuestion = () => {
        alert("امکان حذف گزینه وجود ندارد")
    }
    //////////////////////////////////////////////////////

    const handleChangeValueInsert = (value, type) => {
        setValueInsert(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleComplete = () => {
        if (completedSteps() === totalSteps() - 1) {
            let dataQustion = stateStep3.filter(item => item.text)
            let correctAnswer = dataQustion
                .map((item, ind) => item.isTrust ? ind + 1 : "")
                .filter(item => item)

            let result = {
                _id: data.id,
                correct_answer: correctAnswer.length > 0 ? correctAnswer[0] : null,
                correct_answer_description: valueInsert.correct_answer_description,
            }

            // console.log("result-------->", result);
            // console.log("correctAnswer-------->", correctAnswer);
            submit_update_competition_answer(result)
            disable(false)
            return
        }

        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <QuestionOptions
                    stateStep3={stateStep3}
                    handleChangeStep3={handleChangeStep3}
                    addedQuestion={addedQuestion}
                    removeQuestion={removeQuestion}
                />;
            case 1:
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
