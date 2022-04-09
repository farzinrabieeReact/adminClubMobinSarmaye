import React  , {useState , useEffect} from 'react'
import Styles from './index.module.scss';
import Radio from '@material-ui/core/Radio';


export default function Index({setflagModaAnswerEdit , apiParticipateUpdate , setindexChild ,apiselectProfileEmpty , data ,reducerParticipations }) {

    const [state, setstate] = useState({questions:'' , body:[]})
    const [selectedValue, setSelectedValue] = React.useState({ value: '', correct_answer:null});
        
    
    //////////////////////////////// set state questiuon ///////////////////////////////////////
    useEffect(() => {

        let answare = []
            for (let i = 0; i < 10; i++) {
                if(data.body[`answer_${i + 1}`] !== "null"){
                    answare.push({
                        title: data.body[`answer_${i + 1}`],
                        index : i + 1,
                    })
                }
            }
            setstate({
                questions: data.body.question,
                body : answare
            })
    
        return () => {
            apiselectProfileEmpty()
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps
   //////////////////////////////////////////////////////////////////////////


    //////////////////////  default select itmes///////////////////////////
    useEffect(() => {
        if(reducerParticipations.data){
            setSelectedValue(
                { 
                    value: data.body[`answer_${reducerParticipations.data[0].body.choice_number}`] ,
                   correct_answer:null
                }
            )
        }
    }, [reducerParticipations.data]) //eslint-disable-line react-hooks/exhaustive-deps
   //////////////////////////////////////////////////////////////////////////



   /////////////////////// handel change state /////////////////////////
    const handleChange = (value ,correct_answer) => {
        setSelectedValue({ value,correct_answer });
      };
  
    /////////////////////////////////////////////////////////////////


    //////////////////////  buttons backs ///////////////////////////

   const  handelBackPage = ()=>{
         apiselectProfileEmpty()
         setindexChild(0)
    }
    /////////////////////////////////////////////////////////////////


    /////////////////////  api Participate Update ////////////////////
    const handelSubmit = ()=>{

        if(selectedValue.correct_answer){

            let obj ={
                _id:  reducerParticipations.data[0].id,
                choice_number: selectedValue.correct_answer
            }

            apiParticipateUpdate(obj)
            setflagModaAnswerEdit(false)

        }else{
            alert('لطفا فیلد مورد نظر را انتخاب نمایید')
        }

    }
    /////////////////////////////////////////////////////////////////

    return (
        <div className={Styles['questions']}>
            <div className={Styles['grid']}>
                <h4>
                    {
                        state.questions
                    }
               
                </h4>
                <div className={Styles['list']}>

                    {
                        state.body.map((data , index)=>{
                            return(
                                <div key={index} className={Styles['li']}>
                                     <Radio
                                        checked={selectedValue.value === data.title}
                                        onChange={(event)=>handleChange(event.target.value , data.index )}
                                        value={data.title}
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <p>
                                        {data.title}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className={Styles['btns']}>
                    <button className={'btnsGray'} onClick={()=>handelBackPage()}>بازگشت</button>
                    <button  className={'btnsBlue'} onClick={()=>handelSubmit()}>ویرایش جواب</button>
                </div>
        </div>
    )
}
