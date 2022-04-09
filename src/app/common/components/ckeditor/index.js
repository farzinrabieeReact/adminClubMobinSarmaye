import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as Editor from "ckeditor5-build-classic-base64-upload-adapter";

export const CkEditor = ({ value, setValue }) => {
  return (
    <div
      className="App"
      id="editor"
      style={{ height: "90%", overflow: "auto", zIndex: 10000 }}
    >
      <CKEditor
        style={{ height: "200" }}
        editor={Editor}
        id={"editor"}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
        config={{
          language: "fa",
        }}
      />
    </div>
  );
};
