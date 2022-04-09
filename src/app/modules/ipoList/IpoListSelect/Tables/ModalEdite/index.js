import React , {useState , useRef, useEffect} from 'react'
import Styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function Index({disable , data , handelSubmitUpdate , index}) {

    let myRef = useRef();

    const [Obj , SetObj] = useState({
        title: data.title,
        PdfUrl:data.PdfUrl,
        Pic:'',
        Priority:data.Priority,
    })

    const [nameFile , setNameFile] = useState('')

    const openFile = (file )=>{
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function(){
        const dataURL = reader.result;
       

        let image = input.files[0].type;
        let formatImages = image.split('/')

        if(formatImages[1] ===  'png' ||formatImages[1] === 'jpg' || formatImages[1] === 'jpeg'){
            // output.src = dataURL;
            SetObj(prev =>({
                ...prev,
                Pic:dataURL
            }))

            setNameFile(input.files[0].name)

        }else{
            alert('لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg)')
        }

      };

      reader.readAsDataURL(input.files[0]);
    };

    useEffect(()=>{
        // SetObj(data)
    } , [data])


    const handelChangeValue = (value , type)=>{
        SetObj(prev=>({
            ...prev,
            [type] : value
        }))
    }

    const handelClick = ()=>{
        handelSubmitUpdate(Obj , index)
        disable(false)
    }

    return (
        <div className={Styles['modal']}>
            <div className={Styles['continears']}>

                <Box width="100%">
                    <TextField 
                        value={Obj.title}
                        id="outlined-basic"
                        label={'عنوان'}
                        variant="outlined" size="large" style={{width:'100%'}}
                        onChange = {(event)=>{handelChangeValue(event.target.value , 'title')}}
                        />
                </Box>
                <br />
                <Box width="100%">
                    <TextField 
                        value={Obj.PdfUrl}
                        id="outlined-basic"
                        label={'لینک'}
                        variant="outlined" size="large" style={{width:'66.5%' , marginLeft:20}}
                        onChange = {(event)=>{handelChangeValue(event.target.value , 'PdfUrl')}}
                        />
                         <TextField
                            id="standard-number"
                            label="اولویت نمایش"
                            type="number"
                            variant="outlined"
                            value={Obj.Priority}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                </Box>
                <br />
                <Box width="100%"  className={Styles['grid']} >
                    <Box width="50%">
                        <Box width="72%" className={Styles['card-inputs-file']} >
                            <InputBase
                                defaultValue="مسیر عکس"
                                inputProps={{ 'aria-label': 'naked' }}
                                value={nameFile ? nameFile : 'مسیر عکس'}
                            />
                            <Button variant="contained" onClick={()=>myRef.current.click()} >انتخاب</Button >
                            <input type='file' style={{display:'none'}} ref={myRef}  onChange={(event)=>openFile(event)} />
                         </Box>
                    </Box>
                    <Box style={{textAlign:'left'}}>
                        {
                            Obj.Pic&&(
                                <img src ={Obj.Pic} alt='gradient' className={Styles.img}  />
                            )
                        }
                    </Box>
                </Box>
         
                <br />
                <div className={Styles['btns']}>
                    <button className={'btnsGreen'} onClick={()=>handelClick()}>ذخیره </button>
                    <button className={'btnsRed'} onClick={()=>{disable(false)}}>انصراف </button>
                </div>
            </div>
        </div>
    )
    
}
