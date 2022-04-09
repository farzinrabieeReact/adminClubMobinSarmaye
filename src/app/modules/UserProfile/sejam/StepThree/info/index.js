import React from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";
// import { FormattedMessage } from 'react-intl';

let useStyles = makeStyles({
  grid: {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap"
  },
  card: {
    width: "30%",
    minWidth: 280,
    display: "flex",
    alignItems: "center",
    margin: 10
  },

  title: {
    width: 86
  },
  gridAddress: {
    width: "100%",
    display: "flex"
  },
  Address: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    margin: 10
  },
  width: {
    width: "100%"
  },
  postalCode: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    margin: 10
  }
});

export default function Index({
  setFieldValue,
  values,
  touched,
  errors,
  textError
}) {
  let classes = useStyles();

  return (
    <div>
      <div>
        <h3>بروزرسانی اطلاعات </h3>
      </div>
      <hr />
      <div className={classes["grid"]}>
        <Box className={classes["card"]}>
          <p className={`${classes["title"]} mr-5`}>نام:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.firstName}
              // onChange={event => setFieldValue('firstName', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.firstName && errors.firstName && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>نام خانوادگی:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.lastName}
              // onChange={event => setFieldValue('lastName', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.lastName && errors.lastName && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>کدملی:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.uniqueIdentifier}
              // onChange={event => setFieldValue('uniqueIdentifier', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.uniqueIdentifier && errors.uniqueIdentifier && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>تلفن همراه:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.mobile}
              // onChange={event => setFieldValue('mobile', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.mobile && errors.mobile && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>جنسیت:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.gender === "Male" ? "مرد" : "زن"}
              // onChange={event => setFieldValue('gender', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.gender && errors.gender && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>نام پدر:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.fatherName}
              // onChange={event => setFieldValue('fatherName', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.fatherName && errors.fatherName && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>سریال شناسنامه:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.serial}
              // onChange={event => setFieldValue('serial', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.serial && errors.serial && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>شماره شناسنامه:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.shNumber}
              // onChange={event => setFieldValue('shNumber', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.shNumber && errors.shNumber && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>محل تولد:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.placeOfBirth}
              // onChange={event => setFieldValue('placeOfBirth', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.placeOfBirth && errors.placeOfBirth && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={`d-flex align-items-center m-3  ${classes["card"]} `}>
          <p className={`${classes["title"]} mr-5`}>محل صدور:</p>
          <div>
            <TextField
              className={classes["TextField"]}
              value={values.placeOfIssue}
              // onChange={event => setFieldValue('placeOfIssue', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.placeOfIssue && errors.placeOfIssue && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
      </div>
      <div className={classes["gridAddress"]}>
        <Box className={classes["Address"]}>
          <p className={classes["title"]}>آدرس :</p>
          <div className={classes["width"]}>
            <TextField
              className={classes["width"]}
              value={values.addresses}
              // onChange={event => setFieldValue('addresses', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.addresses && errors.addresses && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
        <Box className={classes["postalCode"]}>
          <p className={`${classes["title"]} mr-5`}>کد پستی :</p>
          <div className={classes["width"]}>
            <TextField
              className={classes["width"]}
              value={values.postalCode}
              // onChange={event => setFieldValue('postalCode', event.target.value)}
              margin="normal"
              variant="outlined"
            />
            {touched.postalCode && errors.postalCode && (
              <div className={"text-danger"}>
                {/* <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" /> */}
                {textError}
              </div>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
