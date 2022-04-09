import React, { useEffect, useState } from 'react'
import { Box, TextField } from '@material-ui/core'

export function PostalCode({ data, id, handleClickPostalTrackingCode }) {
    const [state, setstate] = useState("")

    useEffect(() => {
        if (data === "null" || !data) return
        else if (data) setstate(data)
    }, [data])
    return (
        <div>
            <TextField
                label="کد رهگیری پستی"
                value={state}
                onChange={(e) => setstate(e.currentTarget.value)}
                style={{ width: 350 }}
            />

            <Box mt={4}>
                <button
                    className="btnsGreen"
                    style={{ marginRight: 0 }}
                    onClick={() => handleClickPostalTrackingCode({ _id: id, postal_tracking_code: state })}
                >
                    ارسال
                </button>
            </Box>
        </div>
    )
}
