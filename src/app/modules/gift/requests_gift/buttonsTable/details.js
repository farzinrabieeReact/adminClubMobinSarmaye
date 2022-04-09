import { Box, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import CardNoData  from "./../../../../common/components/cardNoData";

export default function Details({ data }) {
    const [state, setstate] = useState([])

    useEffect(() => {
        let dataPars = JSON.parse(data)
        if (Array.isArray(dataPars)) setstate(dataPars)
    }, [data])


    return (
        <Box display="flex" flexWrap="wrap" width={1000}>
            {
                state.length ? (
                    state.map((item, ind) => (
                        <TextField
                            label={item.name}
                            value={item.value}
                            style={{ width: 275, margin: 15 }}
                            key={ind}
                        />
                    ))
                ) :
                <CardNoData />
            }
        </Box>
    )
}
