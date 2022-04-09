// import React from "react";
// import Box from "@material-ui/core/Box";
// import Styles from "./index.js.module.scss";
// import TextField from "@material-ui/core/TextField";
// import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles } from "@material-ui/core/styles";
// // import SearchSymbol from './../../../../Common/Components/SearchSymbol';

// const useStyles = makeStyles((theme) => ({
//   filter: {
//     width: "96.5%",
//     height: "auto",
//     backgroundColor: "white",
//     margin: "auto",
//     marginTop: "30px",
//     border: "1px solid rgba(0, 0, 0, 0.2)",
//     borderRadius: "5px",
//     padding: 30,
//   },
//   buttons: {
//     textAlign: "right",
//   },
// }));

// const FilterBox = ({
//   flagFilter,
//   stateFilter,
//   handleChangeFilter,
//   handelSubmitFilter,
// }) => {
//   const classes = useStyles();
//   return (
//     <>
//       {flagFilter ? (
//         <div className={classes["filter"]}>
//           <Box p={1}>
//             <h3>فیلتر اطلاعات</h3>
//           </Box>
//           <Box className={Styles["filter"]}>
//             {/* <Box width={193} style={{ margin: "0 50px" }} >
//                                     <DatePicker label="تاریخ ثبت">
//                                         {
//                                             data => handleChange(data, "create_date")
//                                         }
//                                     </DatePicker>
//                                 </Box> */}
//             <Box width={250} className={Styles["TextField"]}>
//               <TextField
//                 id="standard-select-currency"
//                 select
//                 label={"وضعیت درخواست"}
//                 value={stateFilter.state}
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 margin="dense"
//               >
//                 <MenuItem value={"-2"} onClick={() => handleChangeFilter("-2", "state")}>در انتظار انصراف</MenuItem>
//                 <MenuItem value={"-1"} onClick={() => handleChangeFilter("-1", "state")}>در صف انتظار</MenuItem>
//                 <MenuItem value={"1"} onClick={() => handleChangeFilter("1", "state")}>در انتظار تایید پذیرش</MenuItem>
//                 <MenuItem value={"2"} onClick={() => handleChangeFilter("2", "state")}>در انتظار تایید معامله گر</MenuItem>
//                 <MenuItem value={"3"} onClick={() => handleChangeFilter("3", "state")}>در انتظار اقدام</MenuItem>
//                 <MenuItem value={"4"} onClick={() => handleChangeFilter("4", "state")}>اقدام شده</MenuItem>
//                 <MenuItem value={"5"} onClick={() => handleChangeFilter("5", "state")}>ابطال شده</MenuItem>
//                 <MenuItem value={""} onClick={() => handleChangeFilter(null, "state")}>همه</MenuItem>
//               </TextField>

//             </Box>
//             <Box width={200}  className={Styles["TextField"]} >
//               <SearchSymbol
//                 value={stateFilter.isin?.short_name}
//                 setValue={(data) => handleChangeFilter(data , "isin")} />
//             </Box>

//             <Box width={250} className={Styles["TextField"]}>
//               <TextField
//                 id="standard-select-lastname"
//                 label={"کدملی"}
//                 value={stateFilter.national_id}
//                 onChange={(event) =>
//                   handleChangeFilter(event.target.value, "national_id")
//                 }
//                 helperText=""
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 margin="dense"
//               />
//             </Box>
//             <Box width={250} className={Styles["TextField"]}>
//               <TextField
//                 id="standard-select-lastname"
//                 label={"توضیحات"}
//                 value={stateFilter.description}
//                 onChange={(event) =>
//                   handleChangeFilter(event.target.value, "description")
//                 }
//                 helperText=""
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 margin="dense"
//               />
//             </Box>
//           </Box>

//           <Box p={2}>
//             <div className={classes.buttons}>
//               <button
//                 className="btnBlueFilter"
//                 onClick={() => handelSubmitFilter()}
//               >
//                 بازخوانی
//               </button>
//             </div>
//           </Box>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default FilterBox;
