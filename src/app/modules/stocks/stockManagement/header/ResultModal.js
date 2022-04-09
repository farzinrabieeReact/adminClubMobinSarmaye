import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';

const formatGiftType = (value) => {
  switch (value) {
    case "PHYSICAL":
      return "تحویل فیزیکی";
    case "OFF_CODE":
      return "کد تخفیف";
    case "NO_TYPE":
      return "عمومی";
    case "ONLINE_CHARGE":
      return "شارژ آنلاین";
    case "BIMEH_SAMAN":
      return "بیمه سامان";
    case "UP":
      return "آپ";
    case "DG":
      return "دیجی کالا";
    default:
      return "نامشخص"
  }
}

const formatResult = (value) => {
  switch (value) {
    case "INVALID_REGISTRATION_STATUS":
      return "نمی توان وضعیت جایزه را تغییر داد";
    case "CAN_NOT_FINALIZE_BONUS":
      return "نمی توان امتیاز آن را تغییر داد";
    case "updated":
      return "آپدیت شده";
    case "noop":
      return "تغییری نکرده";
    default:
      return "نامشخص"
  }
}

const columns = [
  { id: 'gift_type', label: 'نوع جایزه', minWidth: 170, format: formatGiftType },
  { id: 'member_first_name', label: 'نام', minWidth: 100 },
  {
    id: 'member_last_name',
    label: 'نام خانوادگی',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'member_national_id',
    label: 'کدملی',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'result',
    label: 'نتیجه',
    minWidth: 170,
    align: 'center',
    format: formatResult,
  },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: 20
  },
  container: {
    maxHeight: "70vh",
  },
});

export function ResultModal({ rows }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="inline-block">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد نمایش سطر"
        />
      </Box>
    </Paper>
  );
}