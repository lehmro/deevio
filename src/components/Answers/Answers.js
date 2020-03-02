import React, { useState } from 'react';
import { makeStyles, Radio, RadioGroup, FormControlLabel, FormControl, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  correct: {
      margin: theme.spacing(0.25, 0),
      backgroundColor: theme.palette.success.light
  },
  wrong: {
      margin: theme.spacing(0.25, 0),
      backgroundColor: theme.palette.error.light
  }
}));

export default function Answers(props) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [disabled, setDisabled] = useState(false);

  const handleChange = event => {
    setValue(event.target.value);
    props.setAnswer(event.target.value)
    setDisabled(true);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup aria-label="answer" name="answer" value={value} onChange={handleChange}>
        <List>
          { props.allAnswers && props.allAnswers.map((answer, index) => (
                    <ListItem key={index} className={ 
                      (value !== undefined && answer === props.correctAnswer ? classes.correct : '') || 
                      (value !== undefined && answer !== props.correctAnswer && answer === value ? classes.wrong : '')
                      } >
                      <FormControlLabel disabled={disabled} value={answer} control={<Radio />} label={answer} />
                    </ListItem>
                ))
          }
        </List>
      </RadioGroup>
    </FormControl>
  );
}