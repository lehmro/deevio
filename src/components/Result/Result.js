import React, { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  CircularProgress,
  Button,
  Grid,
  Divider,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function Result(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState({ value: "0-100", text: "" });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    getResult();
  };

  const getResult = () => {
    let points = 0;
    let percent = 0;
    let text = "";

    for (var key in props.questions) {
      if (props.questions[key].correct_answer === props.answers[key]) {
        points++;
      }
    }
    percent = (points / props.questions.length) * 100;
    text =
      percent >= 50
        ? "You passed!"
        : "Unfortunately you didn't pass this test.";

    setResult({
      value: percent,
      text: text
    });

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {props.questions &&
          props.questions.map((question, index) => {
            return (
              <Grid key={index} item xs={12} md={6}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: index + 1 + ") " + question.question
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: "Your answer: " + props.answers[index]
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: "Correct answer: " + question.correct_answer
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.wrapper}>
        {!success ? (
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleButtonClick}
          >
            Get Results
          </Button>
        ) : (
          <div>
            <Typography variant="body1" gutterBottom>
              You scored: {result.value + "%"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {result.text}
            </Typography>
            <Typography>All steps completed - you're finished</Typography>
            <Divider className={classes.divider} variant="middle" />
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              onClick={props.handleReset}
            >
              Reset
            </Button>
          </div>
        )}
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
