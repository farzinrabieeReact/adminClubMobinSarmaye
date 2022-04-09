import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function ErrorRadios({email ,setEmail }) {

  const classes = useStyles();
  const [error, setError] = React.useState(false);


  const handleRadioChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  };

  return (
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <RadioGroup aria-label="quiz" name="quiz" value={email} onChange={handleRadioChange}>
          <FormControlLabel value="instant" control={<Radio />} label="ارسال فوری" />
          <FormControlLabel value="offline" control={<Radio />} label="ارسال آفلاین" />
        </RadioGroup>
      </FormControl>
  );
}
