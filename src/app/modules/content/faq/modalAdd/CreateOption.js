import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { distinctMethod } from "../../../../common/method/distinctMethod";
import { TextField } from "@material-ui/core";

const filter = createFilterOptions();
const CreateOption = ({
  forwardValue,
  categoryDataEdit,
  selected,
  stateReducerCategory,
  setDataEdit,
  DataEdit
}) => {
  // let dataCategory = stateReducerCategory.data.map((itm, ind) => (
  //     itm.body.category
  //
  // ))
  const [value, setValue] = React.useState();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    forwardValue(value);
  }, [value]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // let createData = categotyFAQ.map((item) => ({
    //     title: item
    // }))
    //

    // setCategory(distinctMethod(stateReducerCategory.data,["body","category"]))
    setCategory(
      distinctMethod(stateReducerCategory.data, ["body", "category"])
    );
    // setCategory(createData)
  }, [stateReducerCategory.data]);
  useEffect(() => {
    // setValue(selected.body.category)
  }, []);

  return (
    <>
      <Autocomplete
        // defaultValue={value}
        value={DataEdit.category}
        // defaultValue={categoryDataEdit}
        onChange={(event, newValue) => {
          setDataEdit(prev => ({
            ...prev,
            ["category"]: newValue
          }));
        }}
        // filterOptions={(options, params) => {
        //     const filtered = filter(options, params);
        //
        //     // Suggest the creation of a new value
        //     if (params.inputValue !== '') {
        //         filtered.push({
        //             inputValue: params.inputValue,
        //             title: `اضافه کردن دسته بندی جدید: "${params.inputValue}"`,
        //         });
        //     }
        //
        //     return filtered;
        // }}
        selectOnFocus
        
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={category}
        // getOptionSelected={(option, value) => {
        //     return option.title === value.title
        // }}
        // getOptionLabel={(option) =>  option.body.category}
        // Value selected with enter, right from the input
        // if (typeof option === 'string') {
        //     return option;
        // }
        // // Add "xxx" option created dynamically
        // if (option.inputValue) {
        //     return option.inputValue;
        // }
        // // Regular option
        // return option.title;
        // // return option;

        // renderOption={(option) => option.title}
        //   renderOption={(option) => option}
        style={{ width: 300 }}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="دسته بندی ها" variant="outlined" />
        )}
      />
    </>
  );
};

export default CreateOption;
