import React, { useState  , useEffect} from 'react'
import Styles from './index.module.scss';
import Box from "@material-ui/core/Box";

import TextField from '@material-ui/core/TextField';


export default function Index({setflagModalAnswer , setindexChild , apiselectProfile , reducerProfile }) {

    const [state, setstate] = useState('')

    const handleSubmit = () => {
        if(state.length === 0){
            alert("کد ملی را پر کنید")
            return
        }

        apiselectProfile(state)
    }


    useEffect(() => {
        if(reducerProfile.data[0]){
            setindexChild(1)
        }
    }, [reducerProfile.data]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={Styles['Search_National_Code']}>
            <div className={Styles['card']}>
                <h3 className={Styles['title']}>جستجوی کد ملی</h3>
                <div className={Styles['cardInput']}>
                    <Box width={350} className={Styles['TextField']} >
                        <TextField
                            id="standard-select-currency"
                            label={'کد ملی خود را وارد نمایید'}
                            value={state}
                            onChange={(event) => setstate(event.target.value)}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>
                </div>
                <div className={Styles['btns']}>
                    <button className="btn btn-danger" style={{marginLeft:5}} onClick={()=>setflagModalAnswer(false)}>انصراف</button>
                    <button  className="btn btn-primary" onClick={handleSubmit}>ثبت کد ملی</button>
                </div>
            </div>
        </div>
    )
}
