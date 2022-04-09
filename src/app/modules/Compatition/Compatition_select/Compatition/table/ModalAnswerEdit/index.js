import React, { useState } from 'react'

import Modal from './Modal';
import SearchNationalCode from './SearchNationalCode';
import Questions from './Questions';



export default function Index({
    idCompetitions,
    apiParticipationsSelect,
    flagModaAnswerEdit,
    setflagModaAnswerEdit,
    reducerParticipations,
    data,
    apiselectProfileEmpty ,
    apiParticipateUpdate,
}) {

    const [indexChild, setindexChild] = useState(0);

    return (
        <Modal indexChild={indexChild} flagModaAnswerEdit={flagModaAnswerEdit} setflagModaAnswerEdit={setflagModaAnswerEdit} >
            <SearchNationalCode
                idCompetitions={idCompetitions}
                setflagModaAnswerEdit={setflagModaAnswerEdit}
                setindexChild={setindexChild}
                reducerParticipations={reducerParticipations}
                apiParticipationsSelect={apiParticipationsSelect}
            />
            <Questions
                setflagModaAnswerEdit={setflagModaAnswerEdit}
                setindexChild={setindexChild}
                apiselectProfileEmpty={apiselectProfileEmpty}
                data={data}
                idCompetitions={idCompetitions}
                reducerParticipations={reducerParticipations}
                apiParticipateUpdate={apiParticipateUpdate}
            />



        </Modal>

    )

}