import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../../../redux/signalHafez/signals/select_detail_document/index'
import CircularProgress from '@material-ui/core/CircularProgress';
import CardNoData from "./../../../../../common/components/cardNoData"

export default function FileDetails({ data }) {

    const dispatch = useDispatch()

    const stateReducer = useSelector(state => state.select_signalsDetailDocument_reducer)

    useEffect(() => {
        let res = {
            data: {
                _id: data.id
            }
        }

        dispatch({ type: actionTypes.selectSignalsDetailDocumentAsync, payload: res })
        
        return () => {
            dispatch({ type: actionTypes.selectSignalsDetailDocumentEmpty })
        }
    }, [])

    
    return (
        <div>

            {
                stateReducer.loading ?
                    <CircularProgress />
                    : stateReducer.data[0] ?
                        <>
                            <iframe src={`data:application/pdf;base64,${stateReducer.data[0]?.body?.document}`} style={{ width: "70vh", height: "70vh" }} ></iframe> {//eslint-disable-line jsx-a11y/iframe-has-title
                            }
                        </> : <CardNoData text="فایلی وجود ندارد" />
            }

        </div>
    )
}
