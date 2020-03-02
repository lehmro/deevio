import React, { useState } from "react";
import { makeStyles, Stepper, Step, StepLabel, StepContent, Button } from '@material-ui/core';

//components
import Test from './components/Test/Test';
import Result from './components/Result/Result';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  }
}));

const steps = ['Start the ultimate test to improve your knowledge about everything!', 'Answer the questions and then click next see your results', 'Your results'];

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              { activeStep === 0 &&
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      id="start-test"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              }
              { activeStep === 1 &&
                <Test handleNext={handleNext} handleBack={handleBack} setAnswers={setAnswers} setQuestions={setQuestions} />
              }
              { activeStep === 2 &&
                <Result handleReset={handleReset} answers={answers} questions={questions} />
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}