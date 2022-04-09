import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';



export default function QuestionOptions({ stateStep3, handleChangeStep3, addedQuestion, removeQuestion }) {

    return (
        <>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {
                    stateStep3.map((item, ind) => (
                        <Box key={ind} width="48%" display="flex">
                            <Button onClick={() => removeQuestion(ind)}>
                                <DeleteIcon color="secondary" />
                            </Button>
                            <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                checked={item.isTrust}
                                onChange={(event) => handleChangeStep3(event.target.checked, ind, "isTrust")}
                            />
                            <TextField
                                id={`${item.placeHolder}-${ind + 1}`}
                                label={`گزینه ${ind + 1}`}
                                value={item.text}
                                onChange={(event) => handleChangeStep3(event.target.value, ind, "text")}
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                            >
                            </TextField>
                        </Box>

                    ))
                }
            </Box>

            <Button onClick={addedQuestion}>
                اضافه کردن گزینه های بیشتر
            </Button>
        </>
    )
}
