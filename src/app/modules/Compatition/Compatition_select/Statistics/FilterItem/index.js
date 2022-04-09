import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import MenuItem from '@material-ui/core/MenuItem';


export default function Index({ flagFilter , apiParticipationsSelect  , idCompetitions, setStateFilterStatistic , stateFilterStatistic}) {

   

    const handelCHnage = (value, type) => {
        setStateFilterStatistic(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelSubmit = ()=>{
        let obj = {
            competition_id : idCompetitions
        }

        Object.keys(stateFilterStatistic).forEach(element => {
            if (stateFilterStatistic[element]) {
                obj[element] = stateFilterStatistic[element]
            }
        });

        apiParticipationsSelect(obj)

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
                            <Box  className={Styles['grid']} >
                                <Box width={200} style={{ margin: "0 30px" }} >
                                    <TextField
                                        id="standard-select-currency"
                                        label={"کد ملی"}
                                        // value={data.title}
                                        onChange={(event) => handelCHnage(event.target.value, 'member_national_id')}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                    </TextField>
                                </Box>

                                <Box width={200} >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"گزینه های انتخابی"}
                                        // value={data.title}
                                        onChange={(event) => handelCHnage(event.target.value, 'choice_number')}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value=""> همه </MenuItem>
                                        <MenuItem value="1" >1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="5">6</MenuItem>
                                        <MenuItem value="5">7</MenuItem>
                                        <MenuItem value="5">8</MenuItem>
                                        <MenuItem value="5">9</MenuItem>
                                        <MenuItem value="5">10</MenuItem>

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

