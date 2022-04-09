import React , {useState} from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import TextEditorQuill from  '../../../../../../../Common/Components/TextEditorQuill';
import Dialog from './Dialog';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function Index({disable}) {
    
    const [state , setState] = useState([
        {
            value : '',
            answer :false,
            test : 'test'
        },
        {
            value : '',
            answer :false,
        },
        {
            value : '',
            answer :false,
        },
        {
            value : '',
            answer :false,
        },
    ])


    const handelDelete = (indexItems)=>{
        let res = state.filter((data , index)=> index !== indexItems )
     
       setState(res)
    }

    const handelChangeValue = (valueItems , index)=>{
        let res = state.map((data , ind)=>{
            const{value , ...rest} = data ;
            if(ind === index){
                return {value : valueItems , ...rest}
            } 
            return data
        })

        setState(res)
    }


    return (
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>
                <div className={Styles['textEditor']}>
                    <TextEditorQuill >
                        {
                            (data)=>{console.log(data)}
                        }
                    </TextEditorQuill >
                </div>
                <div className={Styles['grid']} >
                    <h1 className={Styles['icons']} onClick={()=>setState(prev => ([{value : '' , answer:false} , ...prev]))}>
                        <AddIcon size={'large'} style={{color:'#1BC5BD'}} />
                        <span>اضافه کردن گزینه جدید</span>
                    </h1>
                    <div className={Styles['list']}>
                        {
                            state.map((items , index)=>{
                                return(
                                    <div className={Styles['questions']} key={index}> 
                                        <ClearIcon style={{color:'#F64E60 '}} onClick={()=>handelDelete(index)}/>
                                        <Dialog  data = {items} index={index} state={state}  setState={setState}/>
                                        <TextField 
                                            value={items.value}
                                            id="outlined-basic"
                                            placeholder={`گزینه ${index+1}`}
                                            label={''}
                                            variant="outlined" size="large" style={{width:'90%'}}
                                            onChange = {(event)=>{handelChangeValue(event.target.value , index)}}
                                            />
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={Styles['grid']} >
                   <TextareaAutosize aria-label="empty textarea" placeholder="توضیحات پاسخ صحیح" className={Styles['textarea']}/>
                </div>
                <div className={Styles['btns']}>
                    <button className={'btnsGreen'}>ذخیره </button>
                    <button className={'btnsRed'} onClick={()=>{disable(false)}}>انصراف </button>
                </div>
            </div>
        </div>
    )
    
}
