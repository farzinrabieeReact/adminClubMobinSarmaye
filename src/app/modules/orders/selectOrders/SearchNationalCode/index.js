import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "35ch",
      [`& fieldset`]: {
        borderRadius: 20,
      },
    },
  }));

export default function Index({ apiSelectProfile , fullName , memberId , setfullName }) {

    const classes = useStyles();
    const [state, setstate] = useState('')

    const handleSubmit = () => {
        if (state.length >= 10 && state.length <= 11) {
            apiSelectProfile(state)
            return
        }

        alert("لطفا کد ملی را به درستی وارد نمایید")

    }

    useEffect(()=>{
        if(!memberId){
            setstate('')
            setfullName('')
        }
    },[memberId])
    
    return (
        <div  >
            <Box borderRadius={20} className={'d-flex align-items-center'}>
                <FormControl
                    size="small"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                >
                    <InputLabel htmlFor="standard-start-adornment">
                        کد ملی را وارد نمایید
            </InputLabel>
                    <OutlinedInput
                        id="standard-start-adornment"
                        type={"text"}
                        value={state}
                        onChange={(event) => setstate(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    onClick={handleSubmit}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={270}
                    />
                </FormControl>

                <Box ml={5} style={{ marginTop: 15 }}>
                    <p>{fullName}</p>
                </Box>
            </Box>
        </div>
    )
}
