import React  , {useState , useEffect} from 'react'
import Styles from './index.module.scss';
import Radio from '@material-ui/core/Radio';

export default function Index({idCompetitions,setflagModalAnswer , reducerProfile , setindexChild ,apiselectProfileEmpty , data , apiParticipateInsert}) {

    const [selectedValue, setSelectedValue] = React.useState({ value: '' , correct_answer:null});
    const [state, setstate] = useState({questions:'' , body:[]})
        
    

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
    }, [])//eslint-disable-line react-hooks/exhaustive-deps



    const handleChange = (value ,correct_answer) => {
        setSelectedValue({ value,correct_answer });
      };
  

   const  handelBackPage = ()=>{
         apiselectProfileEmpty()
         setindexChild(0)
    }


    const handelSubmit = ()=>{

        if(selectedValue.correct_answer){

            let obj ={
                competition_id: idCompetitions,
                competition_title: null,
                member_id: reducerProfile.data[0].id,
                member_first_name: null,
                member_last_name: null,
                member_national_id: null,
                participation_date: null,
                participation_deadline: null,
                choice_number: selectedValue.correct_answer,
                is_correct: null,
                status: null,
                participation_bonus_id: null,
                reward_bonus_id: null,
            }

            apiParticipateInsert(obj)
            setflagModalAnswer(false)

        }else{
            alert('لطفا فیلد مورد نظر را انتخاب نمایید')
        }

    }

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
