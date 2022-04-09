import React from 'react'
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import MenuItem from '@material-ui/core/MenuItem';
import Styles from './index.module.scss';

export default function Index({ flagFilter , apiCompetitionsSelect , apiCompetitionsSelectInRange,stateFilterCompatitions,setStateFilterCompatitions }) {

    // const [stateFilterCompatitions, setStateFilterCompatitions] = useState({ start_date: '', is_active: '' })

    const handelCHnage = (value, type) => {
        setStateFilterCompatitions(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelSubmit = ()=>{
        let obj = {}

        Object.keys(stateFilterCompatitions).forEach(element => {
            if (stateFilterCompatitions[element]) {
                obj[element] = stateFilterCompatitions[element]
            }
        });

        apiCompetitionsSelect(obj)
        apiCompetitionsSelectInRange(obj)


    }

    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={Styles['filter']}>
                            <Box style={{ paddingRight: 20 }}>
                              <h3 >فیلتر اطلاعات</h3>
                            </Box>
                            <Box display="flex">
                                {/* <Box width={150} style={{ margin: "0 40px" }} >
                                    <DatePicker label="تاریخ شروع">
                                        {data => handelCHnage(data ? `${dateMiladi(data)} 00:00:00.000000` : '', 'start_date')}
                                    </DatePicker>
                                </Box> */}
                                <Box width={200} style={{ margin: "0 40px" }}   >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"وضعیت"}
                                        // value={data.title}
                                        onChange={(event) => handelCHnage(event.target.value, 'is_active')}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                        <MenuItem value="TRUE" >فعال</MenuItem>
                                        <MenuItem value="FALSE">غیر فعال</MenuItem>
                                    </TextField>
                                </Box>
                            </Box>
                            <div className={Styles['btns']}>
                                <button className={Styles['btnsBlack']} onClick={()=>handelSubmit()}>بازخوانی </button>
                            </div>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

