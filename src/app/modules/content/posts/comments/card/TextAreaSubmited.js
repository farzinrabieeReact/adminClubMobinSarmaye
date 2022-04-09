import React from "react";

export default function TextAreaSubmited({ children, response }) {
  return (
    <textarea
      id="textareaComments"
      unresize="true"
      value={response}
      onChange={e => children(e.target.value)}
    />
  );
}
