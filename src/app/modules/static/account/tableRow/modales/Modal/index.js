import React from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import DataPicker from './DataPicker';

export default function Index({disable}) {
    return (
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>
                <div>
                    <TextField id="outlined-basic" label={'نام مسابقه'} variant="outlined" size="small" style={{width:'100%'}} />
                </div>
                <div className={Styles['grid']}>
                    <DataPicker />
                </div>
                <div className={Styles['grid']} >
                    <TextField id="outlined-basic" label={'امتیاز لازم برای شرکت'} variant="outlined" size="small" />
                    <TextField id="outlined-basic" label={'امتیاز برنده شدن'} variant="outlined" size="small" />
                </div>
            </div>
            <div className={Styles['btns']}>
                   <button className={'btnsGreen'}>ذخیره </button>
                   <button className={'btnsRed'} onClick={()=>{disable(false)}}>انصراف </button>
            </div>
        </div>
    )
    
}