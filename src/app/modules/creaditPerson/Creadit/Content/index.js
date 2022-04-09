import React  , {useState  , useEffect} from 'react';
import Styles from './index.module.scss';
import CardJobs from './Card';


export default function Index({caredit_reducer , handelSubmitUpdate , handelDeleteSubmit}) {

    const [data , setData] = useState([])
    

    useEffect(()=>{
        let res = JSON.parse(caredit_reducer.content)
        setData(res)
    } , [caredit_reducer])


    return (
        <div className={Styles['content']}>
              {
                  data.map((_data,index)=>{
                      return(
                          <CardJobs data={_data} key={index} index={index} handelSubmitUpdate={handelSubmitUpdate} handelDeleteSubmit={handelDeleteSubmit} />
                      )
                  })
              }    

        </div>
    )
}
