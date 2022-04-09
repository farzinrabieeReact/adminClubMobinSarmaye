import React from "react";
// import ButtonDetails from "./../buttonDetails";
import Buttons from "../../Buttons";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import LongMenu from "../../LongMenu";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  flagTypePage?: any;
}

export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  idCompetitions,
  flagFilter,
  setflagTypePage,
  flagTypePage,
  data,
  setIdCompetitions,
  apiselectProfile,
  reducerProfile,
  apiselectProfileEmpty,
  apiParticipateInsert,
  apiParticipationsEmpty,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipateUpdate,
  apiCompetitionDeactivate,
  apiCompetitionActivate,
  setflagApi
}: any) {
  return (
    <TableRow key={index}>
      <TableCell align="center">
        <LongMenu
          //   handelRefresh={handelRefresh}
          setflagApi={setflagApi}
          flagTypePage={flagTypePage}
          title={"نمایش"}
          setflagTypePage={setflagTypePage}
          setIdCompetitions={setIdCompetitions}
          data={item}
          apiselectProfile={apiselectProfile}
          reducerProfile={reducerProfile}
          apiselectProfileEmpty={apiselectProfileEmpty}
          apiParticipateInsert={apiParticipateInsert}
          idCompetitions={idCompetitions}
          apiParticipationsEmpty={apiParticipationsEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          reducerParticipations={reducerParticipations}
          apiParticipateUpdate={apiParticipateUpdate}
          apiCompetitionDeactivate={apiCompetitionDeactivate}
          apiCompetitionActivate={apiCompetitionActivate}
        />
      </TableCell>
      <TableCell align="center">
        {pagnation.number !== 1
          ? pagnation.number * stateReducer.size -
            stateReducer.size +
            (index + 1)
          : index + 1}
      </TableCell>

      {head
        .filter((column: any, index: any) => index > 1 && index !== head.length)
        .map((column: any, index: any) => {
          let value = item.body[column.title];
          return (
            <TableCell align="center">
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      <TableCell align="center" style={{display:'flex'}}>
        <Buttons
          info={{
            title: "ویرایش",
            className: "btnsYellow",
            modal: "EditModal",
            flagTypePage: flagTypePage,
            data: item,
          }}
          handleChangeRoute={""}
        />
        <LongMenu
        setflagApi={setflagApi}
          flagTypePage={flagTypePage}
          title={"آمار مسابقه"}
          setflagTypePage={setflagTypePage}
          setIdCompetitions={setIdCompetitions}
          data={item}
          apiselectProfile={apiselectProfile}
          reducerProfile={reducerProfile}
          apiselectProfileEmpty={apiselectProfileEmpty}
          apiParticipateInsert={apiParticipateInsert}
          idCompetitions={idCompetitions}
          apiParticipationsEmpty={apiParticipationsEmpty}
          apiParticipationsSelect={apiParticipationsSelect}
          reducerParticipations={reducerParticipations}
          apiParticipateUpdate={apiParticipateUpdate}
          apiCompetitionDeactivate={apiCompetitionDeactivate}
          apiCompetitionActivate={apiCompetitionActivate}
        />
      </TableCell>
    </TableRow>
  );
}
