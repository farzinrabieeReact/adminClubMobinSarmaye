import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { registeration_v1_select_actions } from "../../../../../../boot/api/Definitions/EducationCourses/registeration_v1_select/action";
import {
  dateConverttShamsiToMiladi,
  dateMiladiToShamsi,
} from "../../../../../common/method/date";
import CardNoData from '../../../../../common/components/cardNoData'


const style = {
  position: "absolute",
  borderRadius: 7,
  top: "50%",
  left: "50%",
  maxHeight: 700,
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "white",
  border: "1px solid #000",
  boxShadow: 30,
  padding: 30,
};
const ModalPerson = ({ open, setopen, index }) => {
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const handelClose = () => {
    setopen({
      flag: false,
      ind: "",
      id: "",
    });
  };

  const reducer = useSelector((state) => state.course_select_registration);

  const apiCall = () => {
    let data = {
      course_id: open.id,
    };
    // dispatch(registeration_v1_select_actions(null, null, null, data, true));
  };

  useEffect(() => {
    apiCall();
  }, [open.id]);

  const handleGetTime = (time) => {
    let date = time.split(" ")[1].split(".")[0];
    return date;
  };

  return (
    <>
      <Modal
        open={open.flag}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          {reducer.data2.length != 0 && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                لیست ثبت نام کننده ها
                {""}
                <span style={{ fontSize: 14, marginRight: 30 }}>
                  {reducer?.data2[0]?.body.course_name}
                </span>
              </Typography>
              <TableContainer
                component={Paper}
                style={{ overflowY: "scroll", maxHeight: 630, marginTop: 20 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">نام و نام خانوادگی</TableCell>
                      <TableCell align="left">کد ملی</TableCell>
                      <TableCell align="left">تاریخ ثبت نام</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reducer?.data2?.map((row, ind) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.body.member_first_name}{" "}
                          {row.body.member_last_name}
                        </TableCell>

                        {/* <TableCell align="right">{row.body.course_name}</TableCell> */}
                        <TableCell align="left">
                          {row.body.member_national_id}
                        </TableCell>
                        <TableCell align="left">
                          {handleGetTime(row.body.registration_date)}{" "}
                          {dateMiladiToShamsi(
                            row.body.registration_date.split(" ")[0]
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {reducer.data2.length === 0 && (
            <CardNoData/>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalPerson;
