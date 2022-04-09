import React , {useState} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import AlertDialogSlide from '../../../../../common/components/AlertDialogSlide';
import { CkEditor } from '../../../../../common/components/ckeditor';

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: '60%',
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
        textAlign:"right",
        margin:'auto',
        marginTop:'7.5%',

    },
    root: {
        padding: "20px 0",
        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),

        },
        overflowY:'auto',
        overflowX:'hidden',
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default function Index({ setNewButton , data , index , handelDeleteSubmit , handelSubmitUpdate}) {
     
    const classes = useStyles();
    const [textEditor , setTextEditor] = useState({Title:data.Title , html:data.html})
    const [flag , setFlag] = useState(false);

    const handelChange = (value ,type)=>{
        setTextEditor(prev=>({
            ...prev,
            [type] : value
        }))
    }

    const handelClick = ()=>{
        handelSubmitUpdate(textEditor , index)
        setNewButton(false)

    }

    const handelDelete = ()=>{
        handelDeleteSubmit(index)
        setNewButton(false)
    }

    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>

                        <Box
                            width="40%"
                        >
                            <TextField
                                label="عنوان"
                                id="titleNewButton"
                                value={textEditor.Title}
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                                onChange={(event)=>handelChange(event.target.value ,'Title')}
                            />
                        </Box>
                        <Box height={'400px'} >
                            <CkEditor value={textEditor.html} setValue={(data)=>handelChange(data,'html')} />
                        </Box>

            </div>

            <div className={classes['btns']}>
                {/* <button className={'btnsYellow'}>اعمال تغییرات</button> */}
                <button className={'btnsGreen'} onClick={()=>handelClick()} >ذخیره </button>
                <button className={'btnsYellow'} onClick={()=>setFlag(true)} >حذف </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
            {
                    flag&&(
                        <AlertDialogSlide
                            flagShow={setNewButton}
                            handleCloseAlert={()=>setFlag(false)}
                            handleOkAlert={handelDelete}
                            data={dataAlertDialogSlide}
                        />
                    )
                }
        </div>
    )
}

const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}
