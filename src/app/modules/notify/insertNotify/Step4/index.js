import { Box } from '@material-ui/core'
import React from 'react';
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish"


const cutomStyle = { margin: "0 5px", fontWeight: "bold" }

export default function Index({ status, sms, email, statusSend, club_reducer, date, content }) {


    const findType = () => {
        switch (status) {
            case "web":
                return " وب"
            case "sms":
                if (sms === "instant") return "پیامک آنلاین"
                return "پیامک آفلاین"
            case "email":
                if (email === "instant") return "ایمیل آنلاین"
                return "ایمیل آفلاین"
            default:
                return "نامشخص";
        }
    }


    const handleDateUi = () => {
        if ((status === "sms" && sms === "instant") || (status === "email" && email === "instant")) {
            return null
        }

        return (
            <>
                <Box>
                    <span style={cutomStyle}>از تاریخ:</span>
                    <span>{date.startTime ? convertDigitToEnglish(date.startTime.format("HH:mm")) : "00:00"}</span>{" "}
                    <span>{date.startDate ? date.startDate.format("jYYYY/jMM/jDD") : ""}</span>
                </Box>
                <Box>
                    <span style={cutomStyle}>تا تاریخ:</span>
                    <span>{date.endTime ? convertDigitToEnglish(date.endTime.format("HH:mm")) : "23:59"}</span>{" "}
                    <span>{date.endDate ? date.endDate.format("jYYYY/jMM/jDD") : ""}</span>
                </Box>
            </>
        )

    }

    return (
        <div>
            <Box display="flex" justifyContent="space-around">
                <Box>
                    <span style={cutomStyle}>نوع اعلان:</span>
                    <span>اعلان در</span>
                    <span>{findType()}</span>
                </Box>
                <Box>
                    <span style={cutomStyle}>گیرنده:</span>
                    <span>
                        {
                            statusSend === "SendToAll" ? "همه" :
                                club_reducer.data[0]?.body.first_name && (
                                    <>
                                        {club_reducer.data[0].body.first_name}
                                        {" "}
                                        {club_reducer.data[0].body.last_name}
                                    </>
                                )
                        }
                    </span>
                </Box>

                {handleDateUi()}
            </Box>

            <Box style={{ marginTop: 35, border: "1px solid lightGray", height: 241, padding: 10, overflow: "auto" }}>
                {
                    status === "sms" ?
                        content.text :
                        <div dangerouslySetInnerHTML={{ __html: content.html }}></div>

                }
            </Box>
        </div>
    )
}
