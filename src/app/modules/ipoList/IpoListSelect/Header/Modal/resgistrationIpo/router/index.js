import React from 'react'

export default function Index({children , indexChild}) {
    return (
        <div>
            {children[indexChild]}
        </div>
    )
}
