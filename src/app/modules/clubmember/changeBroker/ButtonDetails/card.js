import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import CardNoData from './../../../../common/components/cardNoData';
import { useDispatch } from 'react-redux';
// import { CHANGE_BROKER_SELECT_EMPTY } from '../../../../../boot/api/typeActions';
import CloseIcon from '@material-ui/icons/Close';

let useStyles = makeStyles({
    root: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius:8   
    },
    iconClose:{
        cursor:'pointer'
    }
})

export default function Card({ data, setflag ,setNewButton }) {

    let classes = useStyles();
    let dispacth = useDispatch();

    useEffect(() => {

        return () => {
            setflag(false)
            // dispacth({ type: CHANGE_BROKER_SELECT_EMPTY })
        }
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    if (data.length === 0)
        return null

    return (
        <div className={classes['root']}>
            <div>
                <CloseIcon onClick={()=> setNewButton(false)} className={classes['iconClose']}/>
                
            </div>
            {
                data[0].body.file === 'null' && (
                    <>
                        <CardNoData />
                    </>
                )
            }
            {
                data[0].body.file_type !== "pdf" && data[0].body.file !== 'null' && (
                    <>
                        <img src={`data:image/png;base64,${data[0].body.file}`} alt="" style={{ maxHeight: 600 }} />
                    </>
                )
            }

            {
                data[0].body.file_type === "pdf" && data[0].body.file !== 'null' && (
                    <>
                        <iframe src={`data:application/pdf;base64,${data[0].body.file}`} style={{ width: 700, height: 600 }} ></iframe> {//eslint-disable-line jsx-a11y/iframe-has-title
                        }
                    </>
                )
            }
        </div>
    )
}
