import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const AccordionComonent = ({
  expanded,
  setExpanded,
  itm,
  handleChangeChecked
}) => {
  // useEffect(() => {
  //   if (itm.children.length) {
  //     setSelected(itm.children);
  //   } else{
  //     setSelected(itm)
  //   }
  // }, []);
  //

  const handleChangeAccordion = panel => (event, isExpanded) => {
    if (!itm.children.length) {
      return;
    }
    setExpanded(isExpanded ? panel : false);
  };
  //
  // const handleChangeParent = event => {
  //   let chech = event.target.checked;
  //   let obj = {};
  //   let data = [];
  //   checked.map((itm, ind) => {
  //     obj = {
  //       ...itm,
  //       active: chech
  //     };
  //     data.push(obj);
  //   });
  //   setChecked(data);
  // };

  // const handleChangeChild = (e, ind) => {
  //   // setChecked([event.target.checked, checked[1]]);
  //   let chech = e.target.checked;
  //   let obj = {};
  //   let data = [];
  //   checked.map((itm, index) => {
  //     if (index === ind) {
  //       obj = {
  //         ...itm,
  //         active: chech
  //       };
  //     } else {
  //       obj = {
  //         ...itm
  //       };
  //     }
  //     data.push(obj);
  //   });
  //   setChecked(data);
  // };

  const ChildrenCheckBox = () => {
    return itm?.children?.map((item, ind) => (
      <div className="w-50" key={ind}>
        <FormControlLabel
          label={item.name}
          control={
            <Checkbox
              checked={item.active}
              style={{ color: "#4a9ef1" }}
              onChange={e => handleChangeChecked(e, item, "child", ind)}
            />
          }
          className="d-flex flex-row-reverse justify-content-between w-100 px-10"
        />
      </div>
    ));
  };

  const handleClickParent = event => {
    event.stopPropagation();
  };

  return (
    <>
      <Accordion
        expanded={expanded === `${itm.id}`}
        onChange={handleChangeAccordion(`${itm.id}`)}
      >
        <AccordionSummary
          expandIcon={itm.children.length > 0 && <ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="w-50 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {" "}
              <span>{itm.name}</span>
            </div>
            <div>
              <FormControlLabel
                label="همه"
                control={
                  <Checkbox
                    // checked={checked?.every(itm => itm.active)}
                    checked={itm.active}
                    // indeterminate={checked.some(
                    //   (itm: any) => itm.active!
                    // )}
                    style={{ color: "#4a9ef1" }}
                    onClick={handleClickParent}
                    onChange={e => handleChangeChecked(e, itm, "parent")}
                  />
                }
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="d-flex flex-column">
          {itm.children.length > 0 && <ChildrenCheckBox />}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionComonent;
