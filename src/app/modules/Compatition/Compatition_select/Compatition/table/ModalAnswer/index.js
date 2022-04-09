import React, { useState } from 'react'

import Modal from './Modal';
import SearchNationalCode from './SearchNationalCode';
import Questions from './Questions';

// flagModalAnswer={flagModalAnswer} setflagModalAnswer={setflagModalAnswer}
export default function Index({idCompetitions , flagModalAnswer, setflagModalAnswer , apiselectProfile , reducerProfile ,apiselectProfileEmpty , data ,apiParticipateInsert}) {

    const [indexChild, setindexChild] = useState(0);
    

    return (
        <Modal indexChild={indexChild} flagModalAnswer={flagModalAnswer} setflagModalAnswer={setflagModalAnswer} >
            <SearchNationalCode
                setflagModalAnswer={setflagModalAnswer}
                setindexChild={setindexChild}
                apiselectProfile={apiselectProfile}
                reducerProfile={reducerProfile}
            />
            <Questions
                setflagModalAnswer={setflagModalAnswer}
                setindexChild={setindexChild}
                apiselectProfileEmpty={apiselectProfileEmpty}
                data={data}
                apiParticipateInsert={apiParticipateInsert}
                idCompetitions={idCompetitions}
                reducerProfile={reducerProfile}
            />
        </Modal>
    )

}