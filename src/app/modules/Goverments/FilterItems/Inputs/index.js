import React  from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));


export default function Index({ provinceName, setStateInput,stateInput }) {
  const classes = useStyles();
 

  return (
    <div className={Styles['filter']}>
      <div className={classes['root']}>

        <div className={Styles['inputs']}>
          <TextField
            id="standard-select-currency"
            select
            value={stateInput}
            label={"استان"}
            onChange={(event) => {
              const { value } = event.target;
              setStateInput(value)
            }}
            helperText=""
            size="small"
          >
            <MenuItem value="">
              همه
            </MenuItem>
            {
              provinceName.map((item, ind) => (
                <MenuItem key={ind} value={item}>
                  {item}
                </MenuItem>
              ))
            }
          </TextField>

        </div>

      </div>

    </div>
  )
}
