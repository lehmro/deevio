import React, { useState, useEffect } from "react";
import { 
    makeStyles, 
    Button, 
    LinearProgress 
} from "@material-ui/core";
import axios from "axios";

import Question from "../Question/Question";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  }
}));

const shuffleArray = array => {
  //console.log("shuffle");
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const defined = array => {
  return array !== undefined;
};

export default function Test(props) {
  const classes = useStyles();
  const [questions, setQuestions] = useState();

  const handleResponse = response => {
    let questions = response.data.results;
    //console.log("response", questions);
    setQuestions(questions);
  };

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    if (!questions) {
      axios
        .get("https://opentdb.com/api.php?amount=10")
        .then(response => {
          if (!unmounted) {
            handleResponse(response);
          }
        })
        .catch(e => {
          if (!unmounted) {
            if (axios.isCancel(e)) {
              //console.log(`request cancelled:${e.message}`);
            } else {
              //console.log("another error happened:" + e.message);
            }
          }
        });
    }
    return function() {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  });

  let answers = [];
  const updateAnswers = (answer, key) => {
    answers = [...answers];
    answers[key] = answer;
    //console.log("answers: ", answers);
    if (answers.length === questions.length && answers.every(defined)) {
      handleNext();
    }
  };

  const handleNext = () => {
    props.handleNext();
    props.setAnswers(answers);
    props.setQuestions(questions);
  };

  return (
    <div>
      {questions ? (
        questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            setAnswer={updateAnswers}
            answers={shuffleArray([
              question.correct_answer,
              ...question.incorrect_answers
            ])}
            question={question}
          />
        ))
      ) : (
        <LinearProgress />
      )}
      <div className={classes.actionsContainer}>
        <Button onClick={props.handleBack} className={classes.button}>
          Back
        </Button>
      </div>
    </div>
  );
}
