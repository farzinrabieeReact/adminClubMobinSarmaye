import React from "react";
import Excel from './excel/index';
import TableRow from './tableRow/index';
import Drawer from "./../../../../common/components/drawer/index";
import Table from "./../../../../common/components/TableAggregated/index";
import { makeStyles } from "@material-ui/styles";
import RefreshIcon from '@material-ui/icons/Refresh';
import { LinearProgress } from "@material-ui/core";


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


export default function Index({
  stateReducer,
  head,
  stateTable,
  setStateTable,
  handelRefresh,
  sort,
  setSort,
  pagnation,
  setPagnation,
  submitTable,
  setflagApi,
  state,
  headDrawer,
  handleNull,
  date,
  hendelRefreshReducer,
}: any) {

  let classes = useStles();




  return (
    <>
      <div className={classes['head']}>
        <div>
          <button className={'btnsBlue'} onClick={() => hendelRefreshReducer()}>گزارش  جدید</button>
        </div>
        <div className={classes['icons']}>
          <Excel
            handleNull={handleNull}
            stateFilter={stateTable}
            date={date}
            state={state}
          />
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
                />
              );
            })}
        </Table>
      </div>
    </>
  );
}
