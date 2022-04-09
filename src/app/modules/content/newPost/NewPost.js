// import React, { useEffect, useState } from "react";
// // import * as Yup from "yup";
// import { useFormik } from "formik";
// import { timeCurrent } from "../../../common/method/date";
// import {
//   handleNotificationAlertCatch,
//   handleNotificationAlertTryUpdate
// } from "../../../common/method/handleNotificationAlert";
// import {
//   FormControl,
//   InputLabel,
//   LinearProgress,
//   MenuItem,
//   Select,
//   TextField
// } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import { CkEditor } from "../../../common/components/ckeditor";
// import { useLocation } from "react-router-dom";
// import { distinctMethod } from "../../../common/method/distinctMethod";
//
// // import {useHistory} from "react-router-dom";
//
// function FormInsertPost(props) {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [state, setState] = useState();
//   const [category, setCategory] = useState();
//   const { intl } = props;
//   // const { push } = useHistory();
//   const stateReducer = location.state.data;
//   console.log("stateeeeeeeeeeeeeeeReducerrrlocatikonr", location.state.data);
//   let initialValues = {
//     subgroup_name: props.valueSubgroup_name ? props.valueSubgroup_name.id : "",
//     symbol: null,
//     title: "",
//     abstract: "",
//     content: "",
//     tags: []
//   };
//   useEffect(() => {
//     if (stateReducer?.data.length !== 0) setState(stateReducer.data.data);
//   }, [stateReducer]);
//   // useEffect(() => {
//   //   const distincName = distinctMethod(state, ["body", "name"]);
//   //   setCategory(distincName);
//   // }, [state]);
//
//   // const schema = Yup.object().shape({
//   //   subgroup_name: Yup.string().required(
//   //     intl.formatMessage({
//   //       id: "AUTH.VALIDATION.REQUIRED_FIELD"
//   //     })
//   //   ),
//   //   title: Yup.string().required(
//   //     intl.formatMessage({
//   //       id: "AUTH.VALIDATION.REQUIRED_FIELD"
//   //     })
//   //   ),
//   //   abstract: Yup.string().required(
//   //     intl.formatMessage({
//   //       id: "AUTH.VALIDATION.REQUIRED_FIELD"
//   //     })
//   //   )
//   // });
//
//   const setDataSymbol = value => {
//     let result = "";
//     if (!value.length) return null;
//     value.forEach(elem => {
//       result += `,${elem}`;
//     });
//     return result.trim();
//   };
//
//   const formik = useFormik({
//     initialValues,
//     // validationSchema: schema,
//     onSubmit: (values, { setSubmitting, resetForm }) => {
//       setSubmitting(true);
//       setLoading(true);
//       let data = {
//         title: values.title,
//         body: values.content,
//         abstract: values.abstract,
//         // create_date: `${dateCurrentMiladi()} ${timeCurrent()}`,
//         subgroup_id: values.subgroup_name,
//         isin: values.symbol ? values.symbol.body.isin : null,
//         tags: setDataSymbol(values.tags)
//       };
//       // registerPost(data)
//       //   .then((res: any) => {
//       //     setLoading(false);
//       //     setSubmitting(false);
//       //     let resOk = handleNotificationAlertTryUpdate(res);
//       //     if (resOk)
//       //       // push("/posts");
//       //       resetForm(values);
//       //   })
//       //   .catch(() => {
//       //     setLoading(false);
//       //     setSubmitting(false);
//       //     handleNotificationAlertCatch();
//       //   });
//     }
//   });
//
//   // useEffect(() => {
//   //     console.log(`values.tags`, setDataSymbol(formik.values.tags));
//   // }, [formik.values.tags])
//
//   const getInputClasses = fieldname => {
//     // if (formik.touched[fieldname] && formik.errors[fieldname]){
//     //     return "is-invalid";
//     // }
//     //
//     // if (formik.touched[fieldname] && !formik.errors[fieldname]) {
//     //     return "is-valid";
//     // }
//
//     return "";
//   };
//
//   const handleItemSubgroupName = () => {
//     var lastCategory = null;
//     var elemCategory = null;
//     var elem = null;
//     var contents = [];
//
//     return location.state.data.data.map((item, ind) => {
//       if (lastCategory !== item.body.name) {
//         elemCategory = <MenuItem disabled>{item.body.name}</MenuItem>;
//       } else {
//         elemCategory = null;
//       }
//
//       elem = (
//         <MenuItem key={ind} className="ml-5" value={item.id}>
//           {item.body.subgroup_name}
//         </MenuItem>
//       );
//
//       if (elemCategory) {
//         contents = [elemCategory, elem];
//       } else {
//         contents = [elem];
//       }
//
//       lastCategory = item.body.name;
//
//       return contents;
//     });
//   };
//
//   return (
//     <form className="card card-custom" onSubmit={formik.handleSubmit}>
//       {loading && <LinearProgress />}
//
//       <div className="card-header my-2">
//         <div className="card-title align-items-center justify-content-center">
//           <h3 className="card-label font-weight-bolder text-dark">
//             ایجاد پست جدید
//           </h3>
//         </div>
//       </div>
//
//       <div className="form mt-10">
//         <div className="row w-75 mx-auto">
//           <div className="form-group col-lg-6">
//             <FormControl variant="outlined" fullWidth>
//               <InputLabel id="demo-simple-select-outlined-label-newpost-subgroup_name">
//                 موضوع
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
//                 id="demo-simple-select-outlined-newpost-subgroup_name"
//                 label="موضوع"
//                 className={`${getInputClasses("subgroup_name")}`}
//                 {...formik.getFieldProps("subgroup_name")}
//               >
//                 {handleItemSubgroupName()}
//               </Select>
//               {formik.touched.subgroup_name && formik.errors.subgroup_name ? (
//                 <div className="invalid-feedback">
//                   {formik.errors.subgroup_name}
//                 </div>
//               ) : null}
//             </FormControl>
//           </div>
//
//           <div className="form-group col-lg-6">
//             <Autocomplete
//               fullWidth
//               id="combo-box-demo-newPost-symbol"
//               options={props.symbol}
//               // getOptionLabel={option => option?.body?.short_name}
//               renderInput={params => (
//                 <TextField {...params} label="نماد" variant="outlined" />
//               )}
//               className={`${getInputClasses("symbol")}`}
//               value={formik.values.symbol}
//               onChange={(e, val) => formik.setFieldValue("symbol", val)}
//             />
//           </div>
//
//           <div className="form-group col-lg-12">
//             <FormControl variant="outlined" fullWidth>
//               <TextField
//                 variant="outlined"
//                 label="عنوان پست"
//                 type="text"
//                 {...formik.getFieldProps("title")}
//                 className={`${getInputClasses("title")}`}
//               />
//               {formik.touched.title && formik.errors.title ? (
//                 <div className="invalid-feedback">{formik.errors.title}</div>
//               ) : null}
//             </FormControl>
//           </div>
//
//           <div className="form-group col-lg-12">
//             <FormControl variant="outlined" fullWidth>
//               <TextField
//                 variant="outlined"
//                 label="خلاصه پست"
//                 type="text"
//                 {...formik.getFieldProps("abstract")}
//                 className={`${getInputClasses("abstract")}`}
//               />
//               {formik.touched.abstract && formik.errors.abstract ? (
//                 <div className="invalid-feedback">{formik.errors.abstract}</div>
//               ) : null}
//             </FormControl>
//           </div>
//
//           <div className="form-group col-lg-12">
//             <CkEditor
//               value={formik.values.content}
//               setValue={data => formik.setFieldValue("content", data)}
//             />
//           </div>
//
//           <div className="form-group col-lg-12">
//             <Autocomplete
//               multiple
//               limitTags={5}
//               id="tags"
//               options={[]}
//               size="small"
//               value={formik.values.tags}
//               onChange={(event, value) => formik.setFieldValue("tags", value)}
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   variant="outlined"
//                   label="کلمات کلیدی"
//                   placeholder="بیشتر"
//                 />
//               )}
//               freeSolo
//             />
//           </div>
//
//           <div className="mt-3 mb-5 d-flex justify-content-between flex-row-reverse w-100">
//             <button
//               type="submit"
//               className="btn btn-success mr-2"
//               disabled={
//                 formik.isSubmitting || (formik.touched && !formik.isValid)
//               }
//             >
//               ذخیره تغییرات
//               {formik.isSubmitting}
//             </button>
//
//             {/*<Link className="btn btn-light mr-2" to="/posts">*/}
//             {/*  بازگشت*/}
//             {/*</Link>*/}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
//
// export default FormInsertPost;
