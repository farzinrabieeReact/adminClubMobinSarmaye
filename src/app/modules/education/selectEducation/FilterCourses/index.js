import React from 'react'
import DatePicker from "../../../../common/components/datePicker";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


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


export default function Index({ flagFilter, apiCoursesSelect,setFilterCoureses,FilterCoureses,setPaginationRegistration }) {
    const classes = useStyles();
    // const [FilterCoureses, setFilterCoureses] = useState({ start_date: '', is_active: '' })

    const handelCHnage = (value, type) => {
        setFilterCoureses(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handelSubmit = () => {
        setPaginationRegistration(1)
        // let obj = {}

        // Object.keys(FilterCoureses).forEach(element => {
        //     if (FilterCoureses[element]) {
        //         obj[element] = FilterCoureses[element]
        //     }
        // });

        apiCoursesSelect()

    }

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
                                <Box width={150} style={{ margin: "0 40px" }} >
                                    <DatePicker label="تاریخ شروع دوره">
                                        {data => handelCHnage(data, 'start_date')}
                                    </DatePicker>
                                </Box>
                                <Box width={200} >
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label={"وضعیت"}
                                        value={FilterCoureses.is_active}
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
                                <Box width={200} ml={5}>
                                    <TextField
                                        id="standard-select-currency"
                                        label={"دسته بندی"}
                                        value={FilterCoureses.category}
                                        onChange={(event) => handelCHnage(event.target.value, 'category')}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                    </TextField>
                                </Box>
                                <Box width={200} ml={5}>
                                    <TextField
                                        id="standard-select-currency"
                                        label={"کد دوره"}
                                        value={FilterCoureses._id}
                                        onChange={(event) => handelCHnage(event.target.value, '_id')}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                    </TextField>
                                </Box>
                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button className="btnBlueFilter" onClick={() => handelSubmit()}>بازخوانی </button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

