import React from 'react'
import SearchSymbol from './../../../SearchSymbol';


export default function Index({ valueSymbol, handelChangeState , type }) {

const handelchange = (data )=>{

handelChangeState(data ,type )
}
    return (
        <SearchSymbol
            value={valueSymbol.short_name}
            setValue={(data) => handelchange(data)}
            label={''}
        />
    )
}
