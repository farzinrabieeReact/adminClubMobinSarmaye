import React from 'react'

import DatePicker from "../../../../common/components/datePicker";

import { Box, makeStyles, Button, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        height: '80vh'
    },
    card: {
        backgroundColor: 'white',
        position: 'relative',
        padding: 15,
    },
    LinearProgress: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
    },
    btn: {
        width: 200,
        marginTop: '15px'
    },
    desc: {
        fontSize: 11,
        color: 'red'
    }
})

export default function Index({ stateReducer, apiSelectGiftAggregated, state, setState }) {

    let classes = useStyles()

    const handelChange = (value, type) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handleSubmit = () => {
        apiSelectGiftAggregated()
    }

    return (
        <div className={classes['root']}>
            <div className={classes['card']}>
                {
                    stateReducer.loading && (
                        <div className={classes['LinearProgress']}>
                            <LinearProgress />
                        </div>
                    )
                }
                <Box width={200} m={3}>

                    <DatePicker
                        label={'از تاریخ'}
                        value={state['start_time']}
                        setValue={(d) => handelChange(d, 'start_time')}
                    />
                </Box>
                <Box width={200} m={3}>
                    <DatePicker
                        label={'تا تاریخ'}
                        value={state['end_time']}
                        setValue={(d) => handelChange(d, 'end_time')}
                    />
                </Box>
                <Box width={200} m={3}>
                    <Button className={classes['btn']} variant="outlined" color="primary" onClick={handleSubmit}>
                        تایید
                  </Button>
                </Box>
                {
                    stateReducer.loading && (
                        <Box width={200} m={3}>
                            <p className={classes['desc']}>
                                تهیه این گزارش ممکن است چند دقیقه زمان بر باشد لطفا صبر نمایید
                        </p>
                        </Box>
                    )
                }

            </div>
        </div>
    )
}
