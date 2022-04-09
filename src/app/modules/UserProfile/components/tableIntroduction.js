/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalChangeIntroducing } from './ModalChangeIntroducing';
import { actionTypes as actionProfile } from './../../../../redux/clubmember/clubmember_select_with_profile_picture';
import TableRow from './tableRowProfile/index';
import Table from "./../../../common/components/componentCustomTable/index";
import AlertDialogSlide from "./../../../common/components/AlertDialogSlide";
import { clubmember_deleted_introducing_dispatch } from "../../../../redux/clubmember/clubmember_deleted_introducing";
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from "../../../common/method/handleNotificationAlert";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 5),
    borderRadius: 5,
  },
}));


export function TableIntroduction({ className, user }) {

  let classes = useStyles()
  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState([]);
  const [flagApi, setflagApi] = useState(false);
  const [stateTable, setStateTable] = useState({});
  const [pagnation, setPagnation] = useState({ number: 1, count: 2 });

  const [showDeleteIntroduced, setshowDeleteIntroduced] = useState(false);
  const [openModalChangeIntroducing, setOpenChangeIntroducing] = useState(false);


  const stateReducer = useSelector(state => state.select_clubmember_with_profile_picture_reducer)

  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },
    {
      id: 2,
      label: "نام",
      title: "first_name",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 3,
      label: "نام خانوادگی",
      title: "last_name",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 4,
      label: "کد ملی",
      title: "national_id",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
    {
      id: 5,
      label: "تلفن همراه",
      title: "phone",
      active: false,
      type: "text",
      format: (data) => handelNull(data)
    },
  ]

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev) => !prev)
  };

  const apiSubmit = () => {
    let obj = {};
    let { size } = stateReducer;
    let { id, ...sortRes } = sort;

    Object.keys(stateTable).forEach((element) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({ type: actionProfile.selecClubmemberWithProfilePictureAsync, payload: _data })

  };

  const handelNull = (key) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  }

  const handleOkDeleteIntroduced = () => {
    let data = {
      _id: user.id,
      introducing_member_id: null,
      introducing_member_national_id: null,
      introducing_member_automation_id: null,
    }

    clubmember_deleted_introducing_dispatch(data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res)
        if (isOk) {
          setStateTable((prev) => ({ ...prev, _id: user.body.introducing_member_id }))
          setflagApi((prev) => !prev)
          setshowDeleteIntroduced(false)
        }
      })
      .catch(err => {
        handleNotificationAlertCatch()
      })

  }

  useEffect(() => {
    setStateTable((prev) => ({ ...prev, _id: user.body.introducing_member_id }))
    setflagApi((prev) => !prev)
  }, [user])


  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (stateTable._id) {
      apiSubmit();
    }
  }, [flagApi])//eslint-disable-line react-hooks/exhaustive-deps




  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">اطلاعات معرف</span>
          {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> */}
        </h3>
        <div className="card-toolbar">
          {/* <a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">New Report</a> */}
          <div
            className="btn btn-primary font-weight-bolder font-size-sm m-2  "
            onClick={() => setOpenChangeIntroducing(!openModalChangeIntroducing)}>
            ثبت معرف
              </div>
          <div
            className="btn btn-danger font-weight-bolder font-size-sm m-2"
            onClick={() => setshowDeleteIntroduced(!openModalChangeIntroducing)}>
            حذف معرف
              </div>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive" style={{minHeight: 155,position: "relative"}}>
            {
              stateReducer.loading && (<LinearProgress />)
            }
            <Table
              height={''}
              head={head}
              filterTable={stateTable}
              setFilterTable={setStateTable}
              sort={sort}
              setSort={setSort}
              pagnation={pagnation}
              setPagnation={setPagnation}
              submitTable={submitTable}
              setflagApi={setflagApi}
              disable={true}
              loading={stateReducer.loading}
            >
              {state.map((item, index) => {
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


            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openModalChangeIntroducing}
              onClose={() => setOpenChangeIntroducing(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModalChangeIntroducing}>
                <div className={classes.paper}>
                  <ModalChangeIntroducing
                    memberId={user.id}
                    selectApiProfilePicture={() => setflagApi((prev) => !prev)}
                    setClose={setOpenChangeIntroducing}
                    setStateTable={setStateTable}
                  />
                </div>
              </Fade>
            </Modal>

            {
              <AlertDialogSlide
                flagShow={showDeleteIntroduced}
                handleCloseAlert={setshowDeleteIntroduced}
                handleOkAlert={handleOkDeleteIntroduced}
                data={{
                  title: "حذف معرف",
                  description: "آیا از حذف معرف اطمینان دارید؟",
                }}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
