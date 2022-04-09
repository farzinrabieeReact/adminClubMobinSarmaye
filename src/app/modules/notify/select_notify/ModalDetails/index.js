import { makeStyles } from "@material-ui/core";
import React from "react";
import CardNoData from "../../../../common/components/cardNoData";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto",
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15,
  },
}));

export default function Index({ data }) {
  const classes = useStyles();

  if (!data?.body?.content) {
    return (
      <div className={classes.modalDetail}>
        <CardNoData />
      </div>
    );
  }

  return (
    <div className={classes.modalDetail}>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: data.body.content }}
      ></div>
    </div>
  );
}
