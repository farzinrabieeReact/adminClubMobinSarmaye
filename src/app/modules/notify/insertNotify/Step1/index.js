import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Styles from './index.module.scss';
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import Sms from './Sms'
import Email from './Email';
import Date from './Date';

export default function Index({ status, setStatus, sms, setSms, email, setEmail, date, handleChangeDate , name ,setName}) {

    return (
        <div className={Styles['Step1']}>
            <Box width={400} mb={2} mt={1} >
                <TextField
                    id="outlined-basic"
                    label={'عنوان اعلان'}
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </Box>
            <FormControl component="fieldset">

                <RadioGroup row aria-label="position" name="position" value={status} onChange={(event) => setStatus(event.target.value)}>

                    <Box width={250}>
                        <FormControlLabel
                            value="web"
                            control={<Radio color="primary" />}
                            label="اعلان در وب"
                            labelPlacement="end"
                        />
                    </Box>

                    <Box width={250}>
                        <FormControlLabel
                            value="sms"
                            control={<Radio color="primary" />}
                            label="اعلان در پیامک"
                            labelPlacement="end"
                        />

                        {
                            status === 'sms' && (
                                <Sms
                                    sms={sms}
                                    setSms={setSms}
                                />
                            )
                        }

                    </Box>

                    <Box width={250}>
                        <FormControlLabel
                            value="email"
                            control={<Radio color="primary" />}
                            label="اعلان در ایمیل"
                            labelPlacement="end"
                        />
                        {
                            status === 'email' && (
                                <Email
                                    email={email}
                                    setEmail={setEmail}
                                />
                            )
                        }
                    </Box>
                </RadioGroup>

                <Box>
                    {
                        status === 'web' && (
                            <Box mt={16}>
                                <Date date={date} handleChangeDate={handleChangeDate} />
                            </Box>
                        )
                    }
                    {
                        status === 'sms' && (
                            <>
                                {
                                    sms === 'offline' && (
                                        <Date date={date} handleChangeDate={handleChangeDate} />
                                    )
                                }
                            </>
                        )
                    }
                    {
                        status === 'email' && (
                            <>
                                {
                                    email === 'offline' && (
                                        <Date date={date} handleChangeDate={handleChangeDate} />
                                    )
                                }
                            </>
                        )
                    }
                </Box>
            </FormControl>
        </div>
    )
}
