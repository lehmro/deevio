import React from "react";
import { 
    makeStyles, 
    Paper, 
    Typography 
} from '@material-ui/core';

import Answers from '../Answers/Answers';

const useStyles = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
      overflow: "auto"
    }
}));

export default function Question(props) {
    const classes = useStyles();

    const setAnswer = (answer) => {
        //console.log("props.key", props.index)
        props.setAnswer(answer, props.index);
    }

    return (
        <Paper className={ classes.paper } elevation={3}>
            { props.question && props.answers &&
                <>
                    <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{__html: props.question.question}} />
                    <Answers setAnswer={setAnswer} correctAnswer={props.question.correct_answer} allAnswers={props.answers} />
                </>
            }
        </Paper>
    )
}
