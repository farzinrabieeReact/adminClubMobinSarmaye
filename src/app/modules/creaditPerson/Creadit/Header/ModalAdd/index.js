import React , {useState} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { CkEditor } from '../../../../../common/components/ckeditor';
// import TextEditorQuill from "../../../../../Common/Components/TextEditorQuill";

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: '60%',
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

export default function Index({ setNewButton , handelSubmitAdd  }) {
    const classes = useStyles();

    const [textEditor , setTextEditor] = useState({Title:'' , Content:''})

    const handelChange = (value ,type)=>{
        setTextEditor(prev=>({
            ...prev,
            [type] : value
        }))
    }

    const handelClick = ()=>{
        handelSubmitAdd(textEditor)
        setNewButton(false)
    }

    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>

                        <Box
                            width="40%"
                        >
                            <TextField
                                label="عنوان        "
                                id="titleNewButton"
                                value = {textEditor.Title}
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="dense"
                                onChange={(event)=>handelChange(event.target.value ,'Title')}
                            />
                        </Box>
                        <Box height={'400px'}>
                            <CkEditor setValue={(data)=>handelChange(data,'Content')} value={textEditor.Content}/>
                                {/* {
                                     (data)=>handelChange(data ,'Content')
                                } */}
                          
                        </Box>

            </div>

            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={()=>handelClick()}>ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
