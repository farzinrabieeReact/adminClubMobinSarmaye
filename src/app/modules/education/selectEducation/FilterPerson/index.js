import React from 'react'
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: 'auto',
        marginTop: '30px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
    },
    buttons: {
        textAlign: "right"
    }

}))


export default function Index({ flagFilter, stateFilterPerson, handelChangeFilterPeson,handleSubmitFilterPerson }) {
    const classes = useStyles();


    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>

                            <Box display="flex">
                                <Box width={200} style={{ margin: "0 40px" }} >
                                    <TextField
                                        id="outlined-basic"
                                        label={'کدملی'}
                                        variant="outlined"
                                        size="small"
                                        value={stateFilterPerson.member_national_id}
                                        onChange={(event) => handelChangeFilterPeson(event.target.value, 'member_national_id')}
                                    />
                                </Box>
                                <Box width={200} >
                                    <TextField
                                        id="outlined-basic"
                                        label={'نام مسابقه'}
                                        variant="outlined"
                                        size="small"
                                        value={stateFilterPerson.course_name}
                                        onChange={(event) => handelChangeFilterPeson(event.target.value, 'course_name')}
                                    />
                                </Box>
                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button 
                                    className="btnBlueFilter"
                                    onClick={handleSubmitFilterPerson}
                                    >بازخوانی </button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

