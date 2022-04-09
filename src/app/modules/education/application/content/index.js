import React from "react";
import Card from "./card/Card";

export default function Content({ data, category, handleUpdate }) {
  const handelChange = _data => {
    handleUpdate(_data);
  };

  return (
    <div>
      {category.map((item, index) => {
        return (
          <Card
            category={item}
            data={data}
            key={index}
            index={index}
            handelChange={handelChange}
          />
        );
      })}
    </div>
  );
}
