/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Table from "./../../../common/components/componentCustomTable/index";
import { actionTypes } from './../../../../redux/clubmember/clubmember_select_introducing_member_id';
import { useSelector, useDispatch } from 'react-redux';
import TableRow from './tableRowIntroducing/index';
import { LinearProgress } from "@material-ui/core";

let useStyles = makeStyles({
  tables: {
    height: "46vh !important",
    overflowX: "auto",
  }
})

export function TableIntroducingMember({ className, data, user }) {

  let classes = useStyles()
  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState([]);
  const [flagApi, setflagApi] = useState(false);
  const [stateTable, setStateTable] = useState({});
  const [pagnation, setPagnation] = useState({ number: 1, count: 2 });

  const stateReducer = useSelector(state => state.select_clubmember_introducing_member_id_reducer)

  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },
    {
      id: 2,
      label: "نام",
      title: "first_name",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 3,
      label: "نام خانوادگی",
      title: "last_name",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 4,
      label: "نام کاربری",
      title: "user",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 5,
      label: "کد ملی",
      title: "national_id",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 6,
      label: "شماره تلفن",
      title: "phone",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
  ]

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev) => !prev)
  };

  const apiSubmit = () => {
    let obj = {};
    let { size } = stateReducer;
    let { id, ...sortRes } = sort;

    Object.keys(stateTable).forEach((element) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({ type: actionTypes.selecClubmemberIntroducingMemberIdAsync, payload: _data })

  };

  const handelNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  }


  useEffect(() => {
    setStateTable((prev) => ({ ...prev, introducing_member_id: user.id }))
    setflagApi((prev) => !prev)
  }, [user])


  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateTable.introducing_member_id) {
      apiSubmit();
    }
  }, [flagApi])//eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className={`card card-custom ${className} ${classes["tables"]}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">لیست دعوت شده ها</span>
          {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> */}
        </h3>
        <div className="card-toolbar">
          {/* <a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">New Report</a>
          <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a> */}
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive" style={{ minHeight: 155, position: "relative" }}>
            {
              stateReducer.loading && (<LinearProgress />)
            }
            <Table
              height={''}
              head={head}
              filterTable={stateTable}
              setFilterTable={setStateTable}
              sort={sort}
              setSort={setSort}
              pagnation={pagnation}
              setPagnation={setPagnation}
              submitTable={submitTable}
              setflagApi={setflagApi}
              loading={stateReducer.loading}
            >
          
              {state.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    item={item}
                    head={head}
                    index={index}
                    pagnation={pagnation}
                    stateReducer={stateReducer}
                  />
                );
              })}
            </Table>

          </div>
        </div>
      </div>
    </div>
  );
}
