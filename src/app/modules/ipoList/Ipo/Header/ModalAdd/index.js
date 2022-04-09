import React, {useState } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import TextEditorQuill from "./../../../../../common/components/";
// import { ipo_v1_update_actions } from "./../../../../../../boot/api/staticPage/Ipo/Ipo_v1_update/action";
import { useDispatch } from 'react-redux';
// import { TextareaAutosize } from '@material-ui/core/TextareaAutosize';
import { ipo_update } from '../../../../../../redux/ipoList/ipo_select_update';
import { CkEditor } from '../../../../../common/components/ckeditor';
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../../../common/method/handleNotificationAlert';

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: 900,
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
    },
    root: {
        padding: "20px 0",
        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),

        },
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default function Index({ setNewButton, Content, id }) {
    const classes = useStyles();
    const [dataTextEditor, setDataTextEditor] = useState("");
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // console.log("dataTextEditor", dataTextEditor);
    // }, [dataTextEditor])

    const handleSubmitUpdate = () => {
        setNewButton(false)
        // dispatch(ipo_v1_update_actions(dataTextEditor, id))
        ipo_update(dataTextEditor, id)
        .then((result) => {
            let isok= handleNotificationAlertTryUpdate(result)
            if(!isok){
                return
            }
        }).catch((err) => {
            handleNotificationAlertCatch()
        });
    }


    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>
                <div>

                    <Box
                        width="100%"
                        height="450px"
                    >
                        <CkEditor value={Content} setValue={(data)=>setDataTextEditor(data)}/>
                    </Box>

                </div>

            </div>

            <div className={classes['btns']}>
                <button
                    className={'btnsGreen'}
                    onClick={handleSubmitUpdate}
                >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
