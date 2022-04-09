import React from 'react'
import Styles from './index.module.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
  // import FilterListIcon from '@material-ui/icons/FilterList';

export default function Index() {
    const dataButtons = [
      // {name : 'جدید' , type:'' , className:'btnsBlue'},
      // {name : 'ویرایش' , type:'' , className:'btnsYellow'},
      // {name : 'حذف' , type:'' , className:'btnsRed'},
    ]

    return (
        <div className={Styles['header']}> 
            <div className={Styles['button']} > 
              {
                  dataButtons.map((data , index)=>{
                      return(
                        <button key={index} className={data.className}>{data.name}</button>
                      )
                  })
              }
            </div>
            <div className={Styles['icon']}>
              {/* <FilterListIcon onClick={()=>{handelShowFilterItems(!flagFilter)}} /> */}
              <RefreshIcon />
            </div>
            
        </div>
    )
}
