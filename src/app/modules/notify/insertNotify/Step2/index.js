import React from 'react'
import {CkEditor} from '../../../../common/components/ckeditor/index';
import { Box } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export default function Index({ status, content, setContent }) {

    const handelChange = (value, type) => {
        setContent(prev => ({
            ...prev,
            [type]: value
        }))
    }

    return (
        <div>
            {
                status !== 'sms' && (
                    <Box width={'100%'} height={370}>
                        <CkEditor  value={content.html} setValue={data => handelChange(data, 'html')} />
                    </Box>
                )
            }
            {
                status === 'sms' && (
                    <Box width={'100%'} height={370}>
                        <TextareaAutosize
                            style={{ width: '100%', minHeight: 300, resize: 'none' }}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="متن خود را وارد نمایید"
                            value={content.text}
                            onChange={(event) => handelChange(event.target.value, 'text')}
                        />
                    </Box>
                )
            }
        </div>
    )
}
