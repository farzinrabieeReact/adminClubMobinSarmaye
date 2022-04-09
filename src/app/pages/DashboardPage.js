import React, { useState } from "react";
// import {
//   Dashboard
// } from "../../_metronic/_partials";
import Table from '../common/components/customTable/index.tsx';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export function DashboardPage() {
  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: '' },
    { id: 2, label: "شناسه کاربر", title: "member_id", active: false, type: 'text' },
    { id: 3, label: "مقدار", title: "value", active: false, type: 'checkbox' },
    { id: 4, label: "تاریخ ایجاد", title: "create_date", active: false, type: 'number' },
    { id: 5, label: "تاریخ اعمال", title: "closing_date", active: false, type: 'date' },
    { id: 6, label: "وضعیت", title: "status", active: false, type: 'option', option: ['لغو شده', 'تایید شده'] },
    { id: 7, label: "نوع", title: "bonus_type", active: false, type: 'text' },
    { id: 8, label: "مبدا", title: "source", active: false, type: 'text' },
    { id: 9, label: "توضیحات مبدا", title: "source_description", active: false, type: 'text' },
  ];

  const [stateTable, setStateTable] = useState({})
  const [sort, setSort] = useState({});
  const [pagnation, setPagnation] = useState({ number: 1, count: 2 });

  const submitTable = () => {

  }

  return (
    <>
      dashboard
      <Table
        head={head}
        filterTable={stateTable}
        setFilterTable={setStateTable}
        sort={sort}
        setSort={setSort}
        pagnation={pagnation}
        setPagnation={setPagnation}
        submitTable={submitTable}
      >
        <TableRow >
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >test </TableCell>
          <TableCell align='center' >-</TableCell>
        </TableRow>
      </Table>
    </>
  );
}

