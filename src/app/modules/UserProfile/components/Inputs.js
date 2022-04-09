import { MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect } from 'react';
// import { profile_v1_action_update } from '../../../../../boot/api/profile/person/person_v1_update/action';
import { dateMiladiToShamsi } from "./../../../common/method/date";

export default function Inputs({ classes, prevValue, checkCodeBors , value , setValue , initData }) {


    const handleChange = (value, type) => {
        setValue(prev => ({
            ...prev,
            [type]: value
        }))
    }

    useEffect(() => {
        setValue(prevValue ? prevValue.body : initData)
    }, [prevValue]) //eslint-disable-line  react-hooks/exhaustive-deps

    return (
        <>
            <div className={classes[0]}>
                <TextField
                    id={`profile-edit-first_name`}
                    label="نام"
                    variant="outlined"
                    value={value.first_name}
                    onChange={(e) => handleChange(e.target.value, "first_name")}
                />
            </div>

            <div className={classes[0]}>
                <TextField
                    id={`profile-edit-last_name`}
                    label="نام خانوادگی"
                    variant="outlined"
                    value={value.last_name}
                    onChange={(e) => handleChange(e.target.value, "last_name")}
                />
            </div>

            <div className={classes[0]}>
                <TextField
                    id={`profile-edit-phone`}
                    label="شماره همراه"
                    variant="outlined"
                    value={value.phone}
                    onChange={(e) => handleChange(e.target.value, "phone")}
                />
            </div>

            <div className={classes[0]}>
                <Select
                    id="profile-edit-gender"
                    label="جنسیت"
                    value={value.gender}
                    onChange={(e) => handleChange(e.target.value, "gender")}
                    variant="outlined"
                    className="auto"
                >
                    <MenuItem value={"1"}>مرد</MenuItem>
                    <MenuItem value={"2"}>زن</MenuItem>
                </Select>
            </div>

            <div className={classes[0]}>
                <Select
                    id="profile-edit-is_individual"
                    label="جنسیت"
                    value={value.is_individual}
                    onChange={(e) => handleChange(e.target.value, "is_individual")}
                    variant="outlined"
                    className="auto"
                >
                    <MenuItem value={"TRUE"}>حقیقی</MenuItem>
                    <MenuItem value={"FALSE"}>حقوقی</MenuItem>
                </Select>
            </div>

            <div className={classes[0]}>
                <Select
                    id="profile-edit-is_active"
                    label="وضعیت حساب کاربری"
                    value={value.is_active}
                    onChange={(e) => handleChange(e.target.value, "is_active")}
                    variant="outlined"
                    disabled={true}
                    className="auto"
                >
                    <MenuItem value={"TRUE"}>فعال</MenuItem>
                    <MenuItem value={"FALSE"}>غیر فعال</MenuItem>
                </Select>
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-national_id`}
                    label="کد ملی"
                    variant="outlined"
                    value={value.national_id}
                    onChange={(e) => handleChange(e.target.value, "national_id")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    id={`profile-edit-email`}
                    label="ایمیل"
                    variant="outlined"
                    value={value.email}
                    onChange={(e) => handleChange(e.target.value, "email")}
                />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-account_code`}
                    label="کد تفصیلی"
                    variant="outlined"
                    value={checkCodeBors(value.account_code)}
                    onChange={(e) => handleChange(e.target.value, "account_code")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-automation_id`}
                    label="شناسه اتوماسیون"
                    variant="outlined"
                    value={checkCodeBors(value.automation_id)}
                    onChange={(e) => handleChange(e.target.value, "automation_id")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-birth_date`}
                    label="تاریخ تولد"
                    variant="outlined"
                    value={value.birth_date ? dateMiladiToShamsi(value.birth_date.split(" ")[0]):' '}
                    onChange={(e) => handleChange(e.target.value, "birth_date")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    id={`profile-edit-user`}
                    label="نام کاربری"
                    variant="outlined"
                    value={value.user}
                    onChange={(e) => handleChange(e.target.value, "user")} />
            </div>

            <div className={classes[0]}>
                {
                    
                }
                <TextField
                    disabled={true}
                    id={`profile-edit-registration_date`}
                    label="تاریخ ثبت نام"
                    variant="outlined"
                    value={value.registration_date? dateMiladiToShamsi(value.registration_date.split(" ")[0]) : ' '}
                    onChange={(e) => handleChange(e.target.value, "registration_date")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-bourse_code`}
                    label="  کد بورسی اوراق بهادار"
                    variant="outlined"
                    value={checkCodeBors(value.bourse_code)}
                    onChange={(e) => handleChange(e.target.value, "bourse_code")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-kala_bourse_code`}
                    label="  کد بورسی کالا"
                    variant="outlined"
                    value={checkCodeBors(value.kala_bourse_code)}
                    onChange={(e) => handleChange(e.target.value, "kala_bourse_code")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-ati_bourse_code`}
                    label="  کد بورسی آتی"
                    variant="outlined"
                    value={checkCodeBors(value.ati_bourse_code)}
                    onChange={(e) => handleChange(e.target.value, "ati_bourse_code")} />
            </div>

            <div className={classes[0]}>
                <TextField
                    disabled={true}
                    id={`profile-edit-energy_bourse_code`}
                    label="  کد بورسی انرژی"
                    variant="outlined"
                    value={checkCodeBors(value.energy_bourse_code)}
                    onChange={(e) => handleChange(e.target.value, "energy_bourse_code")} />
            </div>

            {/* <div style={{ textAlign: "left", marginLeft: 21, width: "100%" }}>
                <button className="btnsGreen" onClick={handleSubmit}>ویرایش</button>
            </div> */}
        </>
    )
}
