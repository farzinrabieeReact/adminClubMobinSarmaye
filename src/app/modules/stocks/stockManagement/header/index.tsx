import { Box } from '@material-ui/core'
import React, { useState } from 'react';
import Drawer from '../../../../common/components/drawer';
import RefreshIcon from '@material-ui/icons/Refresh';
import ModalCustom from "./../../../../common/components/modal";
import Excel from './../excel';
import Insert from "./../buttonsTable/edit"





export default function Header({ stateTable, setStateTable, Head, submitTable, handelRefresh ,handleSubmitInsert }: any) {
    const [showmodal, setshowmodal] = useState<boolean>(false);



    return (
        <>
            <Box display="flex">
                <button
                    className={`btnsGreen`}
                    onClick={()=>setshowmodal(true)}
                >
                    سهم جدید
                </button>


                <ModalCustom open={showmodal} setOpen={setshowmodal}>
                    <Insert
                        handleSubmitInsert={handleSubmitInsert}
                        setOpenEdit={setshowmodal}
                    />
                </ModalCustom>

            </Box>
            <Box display="flex">

                <Excel
                    stateFilter={stateTable}
                    Head={Head}
                />

                <Drawer
                    children={null}
                    tableHead={Head}
                    stateFilter={stateTable}
                    setStateFilter={setStateTable}
                    apiSubmit={() => submitTable()}
                />

                <RefreshIcon style={{ height: "auto", fontSize: 25, marginRight: 20, cursor: "pointer" }} onClick={() => handelRefresh()} />
            </Box>
        </>
    )
}
