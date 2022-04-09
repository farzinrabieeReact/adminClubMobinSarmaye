import React from 'react'
import DatePicker from "../../../../common/components/datePicker"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Styles from './index.module.scss';
import { CkEditor } from '../../../../common/components/ckeditor';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import { Autocomplete } from '@material-ui/lab';
import { typeGift } from '../../../../../redux/gift/type_gift';


export default function Index({ state, setstate, reducerCategories, reducerSubcategories } : any) : any {

    const handelCHnage = (data  : any , type : string) : void => {
        let value = data;
        setstate((prev:any) => ({
            ...prev,
            [type]: value
        }))
    }


    return (
        <div className={Styles['inputs']}>

            <Box width="47%" mr={1}>
                <TextField
                    value={state.title}
                    label="عنوان"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    type="text"
                    onChange={(event) => handelCHnage(event.target.value, 'title')}
                />
            </Box>

            <Box width="47%">
                <TextField
                    type="text"
                    value={state.name}
                    label="نام"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    onChange={(event) => handelCHnage(event.target.value, 'name')}
                />
            </Box>

            <Box width="47%" mr={1}>
                <Autocomplete
                    freeSolo
                    id="order_type_setting-group-name"
                    options={reducerCategories}
                    getOptionLabel={(option) => option.body ? option.body?.gift_category : option}
                    size="small"
                    fullWidth
                    onChange={(event : object , val:any) => {
                        handelCHnage(val?.body ? val.body.gift_category : val, 'gift_category')
                    }}
                    value={state.gift_category}
                    // getOptionSelected={(option, data) => option.label === data.label}
                    renderInput={(params) => <TextField
                        margin="dense"
                        {...params} label="گروه" variant="outlined"
                    />}
                    getOptionSelected={(option) => option.body.gift_category === state.gift_category}
                />

            </Box>

            <Box width="47%" mr={1}>
                <Autocomplete
                    freeSolo
                    id="order_type_setting-subgroup-name"
                    options={reducerSubcategories}
                    getOptionLabel={(option) => option.body ? option.body?.gift_sub_category : option}
                    size="small"
                    fullWidth
                    onChange={(event : object, val:any) => {
                        handelCHnage(val?.body ? val.body.gift_sub_category : val, 'gift_sub_category')
                    }}
                    value={state.gift_sub_category}
                    // getOptionSelected={(option, data) => option.label === data.label}
                    renderInput={(params) => <TextField margin="dense"
                        {...params} label="زیر گروه" variant="outlined" />}
                    getOptionSelected={(option) => option.body.gift_sub_category === state.gift_sub_category}
                />
            </Box>

            <Box width="31%" mr={1}>
                <TextField
                    value={state.required_bonus}
                    label="امتیاز مورد نظر "
                    id="titleNewButton"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    type="number"
                    onChange={(event) => handelCHnage(Number(event.target.value), 'required_bonus')}
                />
            </Box>

            <Box width="31%" mr={1}>
                <TextField
                    value={state.remained_capacity}
                    label="ظرفیت باقی مانده"
                    id="titleNewButton"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    type="number"
                    onChange={(event) => handelCHnage(Number(event.target.value), 'remained_capacity')}
                />
            </Box>

            <Box width={'31%'} mr={1}>
                <TextField
                    id="standard-select-currency"
                    select
                    label={"نوع"}
                    value={state.type}
                    onChange={(event) => handelCHnage(event.target.value, 'type')}
                    helperText=""
                    size="small"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                >
                    {
                        typeGift.map((item, ind) => (
                            <MenuItem key={ind} value={item.value} >{item.name}</MenuItem>
                        ))
                    }
                </TextField>
            </Box>

            <Box width="31%" mr={1}>
                <TextField
                    value={state.gift_code}
                    label="کد کالا"
                    id="titleNewButton"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                    type="number"
                    onChange={(event) => handelCHnage(Number(event.target.value), 'gift_code')}
                />
            </Box>


            <Box width="23%">
                <DatePicker
                    label="تاریخ انقضاء"
                    value={state.expiration_time}
                    setValue={(data : () => void) => handelCHnage(data, 'expiration_time')}
                />
            </Box>

            <Box width="96%" height={120} mt={2} >
                <TextareaAutosize
                    value={state.description}
                    aria-label="maximum height"
                    placeholder="توضیحات خلاصه"
                    style={{ width: "100%", height: "100%", border: "1px solid #ccc", padding: 10, backgroundColor: "transparent", borderRadius: 10 }}
                    onChange={(event) => handelCHnage(event.target.value, 'description')}
                />
            </Box>

            <Box
                width={'96%'}
                height={'200px'}
                mt={2}
            >
                <CkEditor
                    value={state.detailed_description}
                    setValue={(data : () => void) => handelCHnage(data === undefined ? '' : data, 'detailed_description')}
                />
            </Box>

            <Box width="100%" mt={1}>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.is_physical}
                                onChange={() => handelCHnage(!state.is_physical, 'is_physical')}
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                name="is_physical"
                            />
                        }
                        label="تایید جایزه به صورت اتوماتیک انجام شود"
                    />
                </FormGroup>
            </Box>

        </div>
    )
}
