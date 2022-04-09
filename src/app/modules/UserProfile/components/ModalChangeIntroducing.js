import React, { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import TextField from '@material-ui/core/TextField';
import { insert_change_introducer_dispatch } from './../../../../redux/clubmember/clubmember_insert_change_introducer'
import AxiosCustom from './../../../common/components/apiConfig';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../common/method/handleNotificationAlert';

const useStyles = makeStyles(() => ({
    modalPassword: {
        width: 500
    },
    titlePassword: {
        fontSize: "1.3em",
        fontWeight: "bold"
    },
    form: {
        textAlign: "Center",
        margin: "50px 0 30px",
        "& > *": {
            width: 400
        }
    },
    buttons: {
        textAlign: "center"
    }
}))

export function ModalChangeIntroducing({ setClose, memberId, selectApiProfilePicture , setStateTable }) {

    const styles = useStyles();
    const [state, setstate] = useState('')


    const handelSubmit = () => {

        if (state) {
            insert_change_introducer_dispatch(state)
                .then(async (clubmember) => {

                    if (!clubmember) {
                        return
                    }

                    let config = { url: "update_request" };

                    let setdata = {
                        _id: memberId,
                        introducing_member_id: null,
                        introducing_member_national_id: state,
                        introducing_member_automation_id: null,
                    }

                    let _data = {
                        table: "clubmember",
                        method_type: "change_introducer",
                        data: setdata
                    }

                    try {
                        let response = await AxiosCustom(config, _data)
                        let isOk = handleNotificationAlertTryUpdate(response)
                        if (isOk) {
                            let MemberId = clubmember.data.response.data.results[0].id
                            setStateTable((prev) => ({ ...prev, _id: MemberId }))
                            selectApiProfilePicture()
                            setClose(false)
                        }

                    }
                    catch (err) {
                        handleNotificationAlertCatch()

                    }

                })
                .catch(() => {
                    handleNotificationAlertCatch()
                })

        } else {
            alert('لطفا فیلد مورد نظر را پر نمایید')
        }

    }



    return (
        <div className={styles.modalPassword}>
            <p className={styles.titlePassword}>ثبت معرف</p>

            <div className={styles.form}>
                <TextField
                    size="small"
                    id="outlined-basic"
                    label={"کدملی معرف را وارد نمائید"}
                    variant="outlined"
                    value={state}
                    onChange={(event) => setstate(event.target.value)}
                />
            </div>

            <div className={styles.buttons}>
                <button className="btnsGreen" onClick={() => handelSubmit()}  >ثبت تغییرات</button>
                <button className="btnsRed" onClick={() => setClose(false)}>لغو</button>
            </div>

        </div>
    )
}
