import React, { useEffect, useState } from 'react'
import Input from './Inputs';
import Styles from './index.module.scss';


export default function Index({ flagFilter, provinceName , changeFilter,setstateFilter,setStateInput,stateInput,stateFilter,handleSubmitFilter}) {
    

    const handleChnageFilterPagination =(value,type)=>{
        setstateFilter({
            [type]: value,
          });
        }
    
    useEffect(() => {
        handleChnageFilterPagination(stateInput,"ProvinceName")
    }, [stateInput]);




    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={Styles['filter']}>
                            <Input
                                provinceName={provinceName}
                                setStateInput={setStateInput}
                                stateInput={stateInput}
                            />
                            <div className={Styles['btns']}>
                                <button 
                                className={Styles['btnsBlack']}
                                onClick={handleSubmitFilter}
                                >بازخوانی </button>
                            </div>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

