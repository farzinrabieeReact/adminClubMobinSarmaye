import React, { useEffect, useState } from "react";
// import Filter from "./Filter";
import Table from "./table/index";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { checkNationalCode } from "../../../common/method/nationalCode";
import ExcelInsert from "./header/excelInsert";
import { actionTypes as discount } from "../../../../redux/gift/discountCode/select_single_discount_code";
import { actionTypes as personSelect } from "../../../../redux/gift/discountCode/person_select";

let initState = {
  member_id: "",
  issuer_id: "",
  expiration_date: "",
  code: "",
  category: ""
};

let flag = false;

const UsersList = () => {
  const dispatch = useDispatch();
  const [flagApi, setflagApi] = useState(false);
  const [flagFilter, setFlagFilter] = useState(false);
  const [stateFilter, setStateFilter] = useState(initState);
  const [national_id, setNational_id] = useState("");
  const [pageTab1, setPageTab1] = useState(1);
  const [sort, setSort] = useState({});
  const [flagExcel, setFlagExcel] = useState(false);
  const [flagRefresh, setflagRefresh] = useState(false);
  const [newButton, setNewButton] = useState(false);

  const data = useSelector(state => state.discount_code_select_reducer);
  const stateClubmember = useSelector(state => state.person_select_reducer);

  useEffect(() => {
    if (data.excel.length > 0) {
      setFlagExcel(true);
    }
  }, [data]);

  const handleRefresh = () => {
    setflagRefresh(prev => !prev);
  };

  const handleNull = key => {
    if (key === null || key === "" || key === "null" || key === undefined) {
      return "_";
    } else {
      return key;
    }
  };

  const handelSubmitNationalId = () => {
    if (!national_id.length) {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `لطفا کد ملی خود را وارد نمایید`,
          typeAlert: "warning"
        }
      });
      setStateFilter(prev => ({ ...prev, member_id: "" }));
      return;
    }

    let isOk = checkNationalCode(national_id);

    if (!isOk) {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `کد ملی وارد شده صحیح نمی باشد`,
          typeAlert: "warning"
        }
      });
      setStateFilter(prev => ({ ...prev, member_id: "" }));
      return;
    }

    dispatch({ type: personSelect.profileSelectAsync, payload: national_id });
  };

  return (
    <>
      <Header
        handleRefresh={handleRefresh}
        setFlagFilter={setFlagFilter}
        stateFilter={stateFilter}
        national_id={national_id}
        setNational_id={setNational_id}
        handelSubmitNationalId={handelSubmitNationalId}
        newButton={newButton}
        setNewButton={setNewButton}
        setflagApi={setflagApi}
        flagApi={flagApi}
      />

      <Table
        setNational_id={setNational_id}
        flagRefresh={flagRefresh}
        stateClubmember={stateClubmember}
        flagFilter={flagFilter}
        data={data}
        handleNull={handleNull}
        pageTab1={pageTab1}
        setPageTab1={setPageTab1}
        sort={sort}
        setSort={setSort}
        newButton={newButton}
        setNewButton={setNewButton}
        setflagApi={setflagApi}
        flagApi={flagApi}
      />

      {/*{flagExcel && (*/}
      {/*  <>*/}
      {/*    <ExcelInsert*/}
      {/*      data={data.excel}*/}
      {/*      flagExcel={flagExcel}*/}
      {/*      setFlagExcel={setFlagExcel}*/}
      {/*    />*/}
      {/*  </>*/}
      {/*)}*/}
    </>
  );
};

export default UsersList;
