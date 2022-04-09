import React, { useState, useEffect } from "react";
import { CkEditor } from "../../../../../../common/components/ckeditor";

const TextEditor = ({ children, answerDataEdit }) => {
  const [state, setState] = useState(answerDataEdit ? answerDataEdit : "");

  useEffect(() => {
    children(state);
  }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setState(answerDataEdit);
  }, [answerDataEdit]);

  return (
    <div
      className="App"
      style={{ height: "90%", overflow: "auto", zIndex: 10000 }}
    >
      <CkEditor
      // value={DataEdit.answer}
      // setValue={data => handleEdit(data)}
      ></CkEditor>
    </div>
  );
};

export default TextEditor;
