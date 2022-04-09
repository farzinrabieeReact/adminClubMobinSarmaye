import React from 'react'
import SearchSymbol from './../../SearchSymbol';


export default function Index({ valueSymbol, handelChangeState, type }) {

    const handelchange = (data) => {
        handelChangeState({ isin: data.isin, short_name: data.short_name }, type)
    }
    return (
        <SearchSymbol
            value={valueSymbol ? String(valueSymbol?.short_name).trim() : ''}
            setValue={(data) => handelchange(data)}
            label={''}
        />
    )
}
