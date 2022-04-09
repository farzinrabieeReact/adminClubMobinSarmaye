import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Answer from "./components/answered/Answer";
import {actionTypes as feedback} from '../../../../redux/feedback/feedback_Select'
import {actionTypes as chatBody} from '../../../../redux/feedback/feedback_select_chat_body'

const useStyles = makeStyles(theme => ({
  grid: {
    height: "75vh"
  },
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "96%",
    borderRadius: 8,
    margin: "15px 0 0 2%",
    display: "inline-block"
  },
  appBar: {
    backgroundColor: "white"
  },
  LinkTab: {
    color: "black !important"
  }
}));



const Feedback = () => {
 
  
  
  const [state, setstate] = useState();
  const [valueTab, setValueTab] = React.useState(0);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});

  const handleChange = (event: any, newValue: any) => {
    setValueTab(newValue);
  };

  const dispatch = useDispatch();
  let classes = useStyles();

  useEffect(() => {
    apiSubmit();
  }, []);


 

  const apiSubmit = () => {
    let obj: any = {};
    // let { size } = stateReducer;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    dispatch({
      type: feedback.feedbackAsync,
      payload: {}
    });
  };

 





  return (
    <>
        <Answer/>
    </>
  );
};

export default Feedback;
