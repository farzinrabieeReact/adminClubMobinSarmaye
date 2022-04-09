import React from 'react'
import Styles from './index.module.scss';


export default function Index({data}) {
    return (
        <div className={Styles['cardImage']}>
            <img src = {data} alt='' />
        </div>
    )
}
