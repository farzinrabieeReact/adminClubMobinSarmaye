import React, { useState, useEffect } from "react";
import TableRow from './tableRow';
import Drawer from "./../../../common/components/drawer/index";
import Table from "./../../../common/components/TableAggregated/index";
import { makeStyles } from "@material-ui/styles";
import RefreshIcon from '@material-ui/icons/Refresh';
import { LinearProgress } from "@material-ui/core";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import { handleNumber } from "../../../common/method/displayData";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../../../../redux/static/account/account_select/index'
import Header from './Header';

interface Pagination {
  number: number;
  count: number;
}

let useStles = makeStyles({
  head: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
  },
  iconRefresh: {
    cursor: 'pointer',
    margin: '0px 10px'
  },
  icons: {
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '5px 0',
  }
})


export default function Index() {

  let classes = useStles();

  const dispatch = useDispatch();

  const [sort, setSort] = useState<any>({});
  const [state, setState] = useState<any>([]);
  const [stateTable, setStateTable] = useState<any>({});
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [pagnation, setPagnation] = useState<Pagination>({ number: 1, count: 2 });

  const stateReducer = useSelector((state: any) => state.account_select_Reducer);

  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: true,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 2,
      label: "دسته بندی",
      title: "Group",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 3,
      label: "نام بانک",
      title: "Bank",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 4,
      label: "شعبه",
      title: "Branch",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 4,
      label: "شماره حساب",
      title: "Number",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 5,
      label: "شماره شبا",
      title: "Sheba",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data),
    },

  ];

  const headDrawer = [
    ...head.filter((item) => item.label !== "ردیف"),
  ]

  useEffect(() => {
    apiSubmit()
  }, [flagApi])


  useEffect(() => {
    if (typeof stateReducer.data !== 'string' && stateReducer.data.length > 0 ) {

      setState(JSON.parse(stateReducer.dataFilter[0].body.content));
      setPagnation((prev: any) => ({
        ...prev,
        count: Math.ceil(JSON.parse(stateReducer.dataFilter[0].body.content).length / stateReducer.size),
      }));
    }
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    apiSubmit()
    // setflagApi((prev: any) => !prev)
  };

  const apiSubmit = () => {

    let obj: any = {};
    let filter: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;


    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        filter[element] = stateTable[element];
      }
    });

    //filter local data  
    if (Object.keys(filter).length || (stateReducer.data !== 'string' && stateReducer.data.length)) {
      dispatch({ type: actionTypes.accountSelectFilter, payload: filter });
      return
    }

    let concatData = {
      ...stateTable
    }

    Object.keys(concatData).forEach((element: any) => {
      if (concatData[element]) {
        obj[element] = concatData[element];
      }
    });

    let _data = {
      data: handeData(obj, []),
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({ type: actionTypes.accountSelectAsync, payload: _data });

  };


  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    dispatch({ type: actionTypes.accountSelectFilter, payload: {} });

  }



  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null" ||key===undefined) {
      return "_";
    } else {
      return key;
    }
  };



  return (
    <>
      <div className={classes['head']}>
        <div>
          <Header stateReducer={stateReducer} setPagnation={setPagnation}/>
        </div>
        <div className={classes['icons']}>
          <Drawer
            children={null}
            tableHead={headDrawer}
            setStateFilter={setStateTable}
            apiSubmit={() => submitTable()}
            stateFilter={{
              from_date_time: null,
              to_date_time: null,
              date_time: null,
              ...stateTable
            }}
          />
          <RefreshIcon className={'btnIcon'} onClick={() => handelRefresh()} />
        </div>
      </div>
      {
        stateReducer.loading && (<LinearProgress />)
      }
      <div style={{ paddingTop: !stateReducer.loading ? '4px' : '0px' }}>
        <Table
          height={'header'}
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
          {state
            .filter((row: any, index: any) => {
              if (
                index + 1 >= ((pagnation.number * stateReducer.size) - stateReducer.size) + 1 &&
                index + 1 <= (pagnation.number * stateReducer.size)
              )
                return row
              return null
            })
            .map((item: any, index: any) => {
              return (
                <TableRow
                  key={index}
                  item={item}
                  head={head}
                  index={index}
                  pagnation={pagnation}
                  stateReducer={stateReducer}
                  setflagApi={setflagApi}
                />
              );
            })}
        </Table>
      </div>
    </>
  );
}


export const handeData = (state: any, array: any) => {

  let obj: any = {}
  let res: any = {}

  Object.keys(state).forEach((item) => {
    array.forEach((name: string) => {
      if (item === name) {
        if (name.includes('end_')) {
          if (state[name])
            obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 23:59:59.000000`
        } else {
          if (state[name])
            obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 00:00:00.000000`
        }
      } else {
        if (!obj[item])
          obj[item] = state[item]
      }
    })
  })

  Object.keys(obj).forEach((element) => {
    if (obj[element]) {
      res[element] = obj[element];
    }
  });

  return res
}
