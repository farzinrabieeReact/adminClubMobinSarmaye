import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core';
// import { FormattedMessage } from 'react-intl';
import ModalCustom from '../../../../../common/components/modal';


let useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    card: {

        justifyContent: 'center'
    },
    grid: {
        width: '33%',
        minWidth: 320,
        textAlign: 'center'
    },
    pdf: {
        width: 800,
        height: 500,
        maxWidth: '100%',

    },
    images: {
        // width: '50%',
        // margin:'auto'
        height: 650,
    }
})

export default function Index({ setFieldValue, values, touched, errors, textError }) {

    let classes = useStyles()
    const [open, setOpen] = useState(false)
    const [indexItem, setindexItem] = useState(null)

    const [state] = useState([
        { name: 'checked1', pathImage: 'page-010.jpg' },
        { name: 'checked2', pathImage: 'page-007.jpg' },
        { name: 'checked3', pathImage: 'page-002.jpg' },
        { name: 'checked4', pathImage: 'page-001.jpg' },
        { name: 'checked5', pathImage: 'OnLine-20210623100639.pdf' },
        { name: 'checked6', pathImage: 'OnLine.pdf' },
    ])


    useEffect(() => {
        if (indexItem !== null) {
            setOpen(true)
        }
    }, [indexItem])


    return (
        <div>
            <div>
                <h3>تایید قرارداد ها</h3>
            </div>
            <hr />
            <FormGroup row>
                <div className={classes["root"]}>

                    {
                        state.map((item, index) => {
                            return (
                                <div className={classes['grid']} key={index}>
                                    <div className={`d-flex align-items-center ${classes['card']}`}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={values[item.name]}
                                                    onChange={(event) => setFieldValue(item.name, event.target.checked)}
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    name={item.name}
                                                />
                                            }
                                            label={`قرارداد شماره ${index + 1} `}
                                        />
                                        <p
                                            className={'pt-2 text-primary cursor-pointer'}
                                            onClick={() => setindexItem(index)}

                                        >مشاهده قرارداد</p>
                                    </div>
                                    {
                                        touched[item.name] && errors[item.name] && (
                                            <div className={'text-danger'}>
                                                {textError}
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </FormGroup>
            <ModalCustom open={open} setOpen={setOpen} >
                {
                    indexItem !== null && (
                        <>
                            {
                                state[indexItem].pathImage.split('.')[1] === 'jpg' && (
                                    <img src={`/media/common/profile/${state[indexItem].pathImage}`} alt={''} className={classes['images']} />
                                )
                            }
                            {
                                state[indexItem].pathImage.split('.')[1] === 'pdf' && (
                                    <iframe src={`/media/common/profile/${state[indexItem].pathImage}`} className={classes['pdf']}> </iframe>//eslint-disable-line  jsx-a11y/iframe-has-title
                                )
                            }
                        </>
                    )
                }

            </ModalCustom>
        </div>
    )
}
