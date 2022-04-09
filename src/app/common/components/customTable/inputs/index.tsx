import React, { FC } from 'react'
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from './../../datePicker';
import MenuItem from '@material-ui/core/MenuItem';


interface Props {
    data?: {
        id?: number,
        label?: string | null,
        title?: null | string,
        active?: boolean,
        type?: string,
    },
    state?: any | null,
    handelChangeState?: any,
    handelSubmit?: any
    flag: boolean
}



const Index: FC<Props> = ({ data, state, handelChangeState, handelSubmit, flag }: any): any => {

    if (flag)
        return null

    let obj: any = {
        checkbox: (
            <Checkbox
                checked={state[data.title] === true ? true : false}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onClick={() => handelChangeState(state[data.title !== null ? data.title : ''] === true ? false : true, data.title)}
            />
        ),
        number: (
            <TextField
                value={state[data.title] === null || state[data.title] === "null" || state[data.title] === undefined ? '' : state[data.title]}
                onChange={(event: any) => handelChangeState(event.target.value, data.title)}
                onKeyDown={(event: any) => event.keyCode === 13 ? handelSubmit() : ''}
                variant="outlined"
                size={'small'}
                type="number"
            />
        ),
        text: (
            <TextField
                value={state[data.title] === null || state[data.title] === "null" || state[data.title] === undefined ? '' : state[data.title]}
                onChange={(event: any) => handelChangeState(event.target.value, data.title)}
                onKeyDown={(event: any) => event.keyCode === 13 ? handelSubmit() : ''}
                variant="outlined"
                size={'small'}
            />
        ),
        date: (
            <DatePicker
                value={
                    data.title !== null
                        ? state[data.title] === ''
                            ? null
                            : state[data.title]
                        : null}
                setValue={(d: any) => handelChangeState(d, data.title)}
                label={''}
            />
        ),
        option: (
            <>
                {
                    data?.option && (
                        <TextField
                            id="standard-select-currency"
                            select
                            value={state[data.title]}
                            onChange={(event: any) => handelChangeState(event.target.value, data.title)}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        >
                            {
                                data.option.map((item: any, index: string) => {
                                    return (
                                        <MenuItem key={index} value={item.value} >{item.title}</MenuItem>
                                    )
                                })
                            }
                            <MenuItem value=""> همه </MenuItem>
                        </TextField>

                    )
                }
            </>
        )

    }

    return (
        <div>
            {
                obj[data.type] ? obj[data.type] : ''
            }
        </div>
    )
}
export default Index