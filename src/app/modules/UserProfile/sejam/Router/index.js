import React from 'react'
import ModalCustom from '../Modal';


export default function Index({ children, open, setOpen, indexChild }) {
    return (
        <div>
            {children[indexChild]}
            {/* <ModalCustom open={open} setOpen={setOpen} >
                {children[indexChild]}
            </ModalCustom> */}
        </div>
    )
}
