import React, { useState, useEffect } from "react";
import Tables from "./Tables/Tables.tsx";
import { useDispatch, useSelector } from "react-redux";
import Content from "./Header/Content";
import FilterSortStock from "./FliterSortStock";

export default function Index() {
  const [state, setState] = useState([]);
  const [flag, setflag] = useState(false);
  const [valueIpo, setValueIpo] = useState(null);
  const [stateFilter, setStateFilter] = useState({});
  const [flagRefresh, setflagRefresh] = useState(false);

  const [flagApical, setflagApical] = useState(false);

  const [flagRefrsh, setflagRefrsh] = useState(false);

  const Reducer = useSelector(
    (state) => state.ipoList_select_Registered_reducer
  );

  const handleSubmit = () => {
    if (valueIpo === null || !valueIpo) {
      setflag(false);
    } else {
      setflagApical((prev) => !prev);
      setflag(true);
    }
  };

  const hanldeRefresh = () => {
    setflagRefresh((prev) => !prev);
  };

  const handleChange = (e, val) => {
    if (val?.id) {
      setValueIpo(val);
    }
  };

  const clickReturnHeader = () => {
    setflag(false);
  };

  useEffect(() => {
    setflagApical((prev) => !prev);
  }, [valueIpo]);

  useEffect(() => {
    if (valueIpo) {
      setState(Reducer.data);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {flag ? (
        <div>
          <Content
            valContent={valueIpo}
            data={state}
            clickReturnHeader={clickReturnHeader}
            hanldeRefresh={hanldeRefresh}
            stateFilter={stateFilter}
          />
          <Tables
            flagApical={flagApical}
            setStateFilter={setStateFilter}
            valueIpo={valueIpo}
            setflagRefrsh={setflagRefrsh}
            flagRefresh={flagRefresh}
          />
        </div>
      ) : (
        <div>
          <FilterSortStock
            handleChange={handleChange}
            setflag={setflag}
            valueIpo={valueIpo}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
