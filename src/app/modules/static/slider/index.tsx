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
import { actionTypes } from '../../../../redux/static/slider/slider_select/index'
import Header from './Header';
import { handelIsNewPage, handelshowSlider } from "./method";


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
  const [state, setState] = useState<any>({ content: [] });
  const [stateTable, setStateTable] = useState<any>({});
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [_id, setId] = useState('')
  const [pagnation, setPagnation] = useState<Pagination>({ number: 1, count: 2 });

  const stateReducer = useSelector((state: any) => state.slider_select_Reducer);


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
      label: "عنوان",
      title: "Title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 3,
      label: "لینک",
      title: "Link",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 4,
      label: "لینک صفحه",
      title: "IsNewPage",
      active: false,
      type: "option",
      option: [
        { title: 'داخلی', value: false },
        { title: 'خارجی', value: true }
      ],
      format: (data: any) => handelIsNewPage(data),
    },
    {
      id: 5,
      label: "اولویت",
      title: "Priority",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data),
    },
    {
      id: 7,
      label: "وضعیت",
      title: "showSlider",
      active: false,
      type: "option",
      option: [
        { title: 'غیر فعال', value: false },
        { title: 'فعال', value: true }
      ],
      format: (data: any) => handelshowSlider(data),
    },
    {
      id: 6,
      label: "ضمائم",
      title: "IMAGE_URI",
      active: true,
      type: "text",
      format: (data: any) => handleNumber(data),
    },

  ];

  const headDrawer = [
    ...head.filter((item) => item.label !== "ردیف" && item.label !== "ضمائم"),
  ]

  useEffect(() => {
    apiSubmit()
  }, [flagApi])


  useEffect(() => {
    if (typeof stateReducer.data !== 'string' && stateReducer.data.length > 0) {
      setState((prev: any) => (
        {
          ...prev,
          content: JSON.parse(stateReducer.dataFilter[0].body.content)?.content
        }
      ));
      console.log("stateReducer", stateReducer)
      setId(stateReducer.dataFilter[0].id)
      setPagnation((prev: any) => ({
        ...prev,
        count: Math.ceil(JSON.parse(stateReducer.dataFilter[0].body.content)?.content.length / stateReducer.size),
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

      if (element === 'IsNewPage' && typeof stateTable[element] !== 'string') {
        filter[element] = stateTable[element];
        return
      }
      if (element === 'showSlider' && typeof stateTable[element] !== 'string') {
        filter[element] = stateTable[element];
        return
      }

      if (stateTable[element]) {
        filter[element] = stateTable[element];
      }
    });


    // filter local data  
    if (Object.keys(filter).length) {
      dispatch({ type: actionTypes.sliderSelectFilter, payload: filter });
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

    dispatch({ type: actionTypes.sliderSelectAsync, payload: _data });

  };


  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    dispatch({ type: actionTypes.sliderSelectFilter, payload: {} });
  }

  const conditionData = (data: any, condition: any) => {

    let flag = false
    let text = ''

    if (!data || !condition) {
      return
    }
    Object.keys(condition).forEach((item, index) => {
      let string = String(data[item])
      if (!string) {
        text += `
            ${condition[item]} ${index === Object.keys(data).length
            ? ''
            : '،'
          } `
        flag = true
      }
    })

    if (flag) {
      alert(`لطفا فیلد (${text.slice(0, text.length - 2)}) را پر نمایید`)
      return true
    }
    return false

  }


  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };



  return (
    <>
      <div className={classes['head']}>
        <div>
          <Header
            conditionData={conditionData}
            _id={_id}
            setflagApi={setflagApi}
            state={state}
          />
        </div>
        <div className={classes['icons']}>
          <Drawer
            children={null}
            tableHead={headDrawer}
            setStateFilter={setStateTable}
            apiSubmit={() => submitTable()}
            stateFilter={{
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
          {
            state?.content.filter((row: any, index: any) => {
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
                    state={state}
                    key={index}
                    item={item}
                    head={head}
                    index={index}
                    pagnation={pagnation}
                    stateReducer={stateReducer}
                    setflagApi={setflagApi}
                    _id={_id}
                    conditionData={conditionData}
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
