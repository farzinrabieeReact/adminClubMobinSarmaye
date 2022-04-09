import React from 'react'
import Styles from './index.module.scss';
import Inputs from '../ModalAdd/Inputs';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function Index({setNewButton}) {
    return (
        <div className={Styles['ModalAdd']}>
            <div className={Styles['content']}>
                <div className={Styles['inputs']}>
                    <Inputs />
                </div>
                <div className={Styles['maps']}>
                    <div className={Styles['map']}>
                        <h1>Google Maps</h1>
                    </div>
                </div>
            </div>
            <div className={Styles['summernote']}>
                <TextareaAutosize
                    className = {Styles['textarea']}
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="آدرس"
                    />
            </div>
            <div className={Styles['btns']}>
                      <button className={Styles['btnsGreen']}>ذخیره </button>
                      <button className={Styles['btnsRed']} onClick={()=>setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}
