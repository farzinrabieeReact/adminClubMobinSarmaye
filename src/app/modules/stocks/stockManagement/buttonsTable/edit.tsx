import { Box, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';



export default function Edit({ data, handleSubmitEdit, setOpenEdit, handleSubmitInsert }: any) {
    ///////////// if(data) ====> edit     else ===>insert///////////////////
    const [state, setstate] = useState<any>(initState)

    useEffect(() => {
        if (data) {
            let res: any = {}
            Object.keys(data.body)
                .forEach(item => {
                    res[item] = { label: initState[item].label, value: data.body[item] }
                })

            setstate(res)
        }
    }, [])

    const handleChange = (e: any, isin: any) => {
        let { value } = e.target;

        setstate((prev: any) => ({
            ...prev,
            [isin]: {
                label: prev[isin].label,
                value
            }
        }))
    }

    const clickSubmitEdit = () => {
        let res: any = {}
        Object.keys(state)
            .forEach(item => {
                res[item] = state[item]["value"]
            })

        if (data) {
            if (data.body.back_office_id === "null" || !data.body.back_office_id) {
                let { isin, ...otherState } = res
                handleSubmitEdit({ _id: data.id, ...otherState })
                return
            }
            let { isin, back_office_id, ...otherState } = res
            handleSubmitEdit({ _id: data.id, ...otherState })
        } else {
            handleSubmitInsert(res)
        }
        setOpenEdit(false)
    }


    return (
        <>
            <Box display="flex" flexWrap="wrap" width={1000}>
                {
                    Object.keys(state)
                        .map((item, ind) => {
                            if (item === "stock_type") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"MORTGAGE"}>
                                            تسهیلات مسکن
                                        </MenuItem>
                                        <MenuItem value={"ETF"}>
                                            صندوق قابل معامله
                                        </MenuItem>
                                        <MenuItem value={"BOND"}>
                                            اوراق قرضه
                                        </MenuItem>
                                        <MenuItem value={"OPTION"}>
                                            اختیار
                                        </MenuItem>
                                        <MenuItem value={"IFB"}>
                                            فرابورس
                                        </MenuItem>
                                        <MenuItem value={"TSE"}>
                                            بورس
                                        </MenuItem>
                                        <MenuItem value={"FUTURE"}>
                                            آتی
                                        </MenuItem>
                                        <MenuItem value={"ENERGY"}>
                                            انرژی
                                        </MenuItem>
                                        <MenuItem value={"IME"}>
                                            کالا
                                        </MenuItem>
                                    </TextField>
                                )
                            }
                            else if (item === "flow") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"1"}>
                                            بورس
                                        </MenuItem>
                                        <MenuItem value={"2"}>
                                            فرابورس
                                        </MenuItem>
                                        <MenuItem value={"4"}>
                                            پایه
                                        </MenuItem>

                                    </TextField>
                                )
                            }
                            else if (item === "is_active") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"TRUE"}>
                                            فعال
                                        </MenuItem>
                                        <MenuItem value={"FALSE"}>
                                            غیرفعال
                                        </MenuItem>
                                    </TextField>
                                )
                            }
                            else return (
                                <TextField
                                    label={state[item]["label"]}
                                    value={state[item]["value"]}
                                    style={{ width: 275, margin: 15 }}
                                    key={ind}
                                    onChange={(e) => handleChange(e, item)}
                                    disabled={!data ? false : item === "isin" || item === "back_office_id" ? true : false}
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        })

                }
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end" >
                <button
                    className="btnsGreen"
                    onClick={clickSubmitEdit}
                >
                    ثبت
                </button>

                <button
                    className="btnsRed"
                    onClick={() => setOpenEdit(false)}
                >
                    کنسل
                </button>
            </Box>
        </>
    )
}

const initState: any =
{
    isin: { label: "شناسه سهم", value: "" },
    back_office_id: { label: "شناسه اتوماسیون", value: "" },
    short_name: { label: "نام مخفف", value: "" },
    full_name: { label: "نام کامل", value: "" },
    sector_code: { label: "کد صنعت", value: "" },
    sector_name: { label: "نام صنعت", value: "" },
    sub_sector_code: { label: "کد زیرگروه", value: "" },
    flow: { label: "بازار", value: "" },
    is_active: { label: "وضعیت", value: "" },
    stock_type: { label: "نوع سهام", value: "" }
}