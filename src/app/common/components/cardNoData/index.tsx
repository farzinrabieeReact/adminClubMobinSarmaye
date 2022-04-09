import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: "100%",
        display:'flex',
        alignItems:'center',
        textAlign : "right" ,
    },

});

interface Props{
    text?:string | null
}

export default function OutlinedCard({text}:Props) {

    const classes = useStyles();

    return (
        <Card className={`${classes.root} `} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="h5">
                   {text ? text : "داده ای برای نمایش وجود ندارد."}
                </Typography>
            </CardContent>
        </Card>
    );
}
