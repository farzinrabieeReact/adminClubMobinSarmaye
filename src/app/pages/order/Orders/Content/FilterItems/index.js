// import React, { useEffect } from "react";
// // import DatePicker from "../../../../../Common/Components/DatePicker";
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch } from "react-redux";

// import TextField from "@material-ui/core/TextField";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";

// // import moment from 'moment-jalaali'
// // import { convertDigitToEnglish } from '../../../../../Common/method/convertDigitToEnglish';

// const useStyles = makeStyles((theme) => ({
//   filter: {
//     width: "96.5%",
//     height: "auto",
//     backgroundColor: "white",
//     margin: "auto",
//     marginTop: "-10px",
//     border: "1px solid rgba(0, 0, 0, 0.2)",
//     borderRadius: "5px",
//   },
//   buttons: {
//     textAlign: "right",
//     marginTop: 25,
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 200,
//   },
//   grid: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
// }));

// export default function Category({
//   handelData,
//   data,
//   setData,
//   flagFilter,
//   apiSubmitAggregates,
//   apiSubmitDetails,
//   pageTab1,
//   setPageTab1,
// }) {
//   let dispatch = useDispatch();
//   const classes = useStyles();

//   let { report, ...filterData } = data;

//   const handleChange = (data, type) => {
//     setData((prev) => ({ ...prev, [type]: data }));
//   };

//   useEffect(() => {
//     setData({
//       time: "",
//       report: "تجمیعی",
//       checkedSales: false,
//       checkedBuy: false,
//     });
//   }, [flagFilter]); //eslint-disable-line  react-hooks/exhaustive-deps

//   const handleSubmit = () => {
//     let obj = handelData();
//     if (!obj) {
//       dispatch({
//         type: "ALERT",
//         payload: {
//           status: true,
//           textAlert: "لطفا فیلد کد ملی را وارد نمایید",
//           typeAlert: "info",
//         },
//       });
//       return;
//     }
//     if (data.report === "تجمیعی") {
//       if (pageTab1 !== 1) {
//         setPageTab1(1);

//         return;
//       }
//       let data = {
//         ...obj,
//       };

//       apiSubmitAggregates(null, data);
//     }
//     if (data.report === "عمومی") {
//       if (pageTab1 !== 1) {
//         setPageTab1(1);
//         return;
//       }
//       let data = {
//         ...obj,
//       };

//       apiSubmitDetails(null, data);
//     }
//   };

//   return (
//     <>
//       {flagFilter ? (
//         <div className={classes["filter"]}>
//           <Box p={1}>
//             <h3>فیلتر اطلاعات</h3>
//           </Box>
//           <Box className={classes["grid"]}>
//             <Box display="flex">
//               <Box width={150} style={{ margin: "0 50px" }}>
//                 <DatePicker label="تاریخ">
//                   {(data) => handleChange(data, "time")}
//                 </DatePicker>
//               </Box>
//               <Box width={200}>
//                 <TextField
//                   id="standard-select-currency"
//                   select
//                   label={"نوع گزارش"}
//                   value={data.report}
//                   size="small"
//                   fullWidth
//                   variant="outlined"
//                   margin="dense"
//                 >
//                   <MenuItem
//                     value={"تجمیعی"}
//                     onClick={() => handleChange("تجمیعی", "report")}
//                   >
//                     تجمیعی
//                   </MenuItem>
//                   <MenuItem
//                     value={"عمومی"}
//                     onClick={() => handleChange("عمومی", "report")}
//                   >
//                     عمومی
//                   </MenuItem>
//                 </TextField>
//               </Box>
//               <Box width={200} ml={3} mt={1}>
//                 <FormGroup row>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={data.checkedBuy}
//                         onChange={() =>
//                           handleChange(!data.checkedBuy, "checkedBuy")
//                         }
//                         icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
//                         checkedIcon={<CheckBoxIcon fontSize="small" />}
//                         name="checkedBuy"
//                       />
//                     }
//                     label="خرید"
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={data.checkedSales}
//                         onChange={() =>
//                           handleChange(!data.checkedSales, "checkedSales")
//                         }
//                         icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
//                         checkedIcon={<CheckBoxIcon fontSize="small" />}
//                         name="checkedSales"
//                       />
//                     }
//                     label="فروش"
//                   />
//                 </FormGroup>
//               </Box>
//             </Box>

//             <Box p={2}>
//               <div className={classes.buttons}>
//                 <button onClick={handleSubmit} className="btnBlueFilter">
//                   بازخوانی{" "}
//                 </button>
//               </div>
//             </Box>
//           </Box>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }
import React from "react";

const Index = () => {
  return <div>farhad</div>;
};

export default Index;
