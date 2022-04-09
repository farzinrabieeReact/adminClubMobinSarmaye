import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "../brochures/tableRow/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesBrochures } from "../../../../redux/education/educationBrochures_static_select/index";
import { actionTypes } from "../../../../redux/content/faq/faq_select";
import { brochure_update_static } from "../../../../redux/education/brochures_update_static/brochure_update_static";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { Backdrop, Fade, LinearProgress, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ModalAdd from "./modalAdd/ModalAdd";
interface Pagination {
  number: number;
  count: number;
}
const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}));
const Brochures = () => {
  const classes = useStles();
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
      label: "عنوان بروشور",
      title: "title",
      active: false,
      type: "text"
    },
    {
      id: 3,
      label: "لینک",
      title: "PdfUrl",
      active: false,
      type: "text"
      // format: (data: any) => handleData(data)
    }
    // {
    //   id: 4,
    //   label: "ضمائم",
    //   title: "PdfUrl",
    //   active: false,
    //   type: "text"
    //   // format: (data: any) => handleData(data)
    // }
  ];
  /////////////////////////////////////////////////////////////////state
  // const stateReducer=useSelector((state:any)=>state.faq_select_reducer)
  const stateReducer = useSelector(
    (state: any) => state.brochures_static_select_reducer
  );

  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [flagAddModal, setFlagAddModal] = useState<any>(false);
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////hook
  const dispatch = useDispatch();

  useEffect(() => {
    apiSubmit();
  }, [flagApi]);

  useEffect(() => {
    if (stateReducer.data.length !== 0) {
      setstate(JSON.parse(stateReducer.data[0]?.body.content));
    }
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////function
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  /////////////////////////////////////////////////////////////////////edit
  const handelSubmitUpdate = (value: any, index: number) => {
    // let id = Brochures_reducer.response.data.results[0].id;
    let id = stateReducer.data[0]?.id;
    let content = JSON.parse(stateReducer.data[0]?.body.content);
    let res = content.map((itm: any, ind: any) => {
      if (ind === index) return value;
      return itm;
    });
    let obj = {
      name: "education_brochure",
      _id: id,
      content: JSON.stringify(res)
    };

    brochure_update_static(obj)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
        setTimeout(() => {
          setflagApi((prevState: any) => !prevState);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };
  /////////////////////////////////////////////////////////////////////add
  const handleSubmitAdd = (value: any) => {
    let id = stateReducer.data[0]?.id;
    let content = JSON.parse(stateReducer.data[0]?.body.content);
    let res = [value, ...content];
    let obj = {
      name: "education_brochure",
      _id: id,
      content: JSON.stringify(res)
    };

    brochure_update_static(obj)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
        setTimeout(() => {
          setflagApi((prevState: any) => !prevState);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };
  /////////////////////////////////////////////////////////////////////delete
  const handleSubmitDelete = (index: number) => {
    let id = stateReducer.data[0]?.id;
    let content = JSON.parse(stateReducer.data[0]?.body.content);
    let res = content.filter((itm: any, ind: number) => ind !== index);
    let obj = {
      name: "education_brochure",
      _id: id,
      content: JSON.stringify(res)
    };
    brochure_update_static(obj)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
        setTimeout(() => {
          setflagApi((prevState: any) => !prevState);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////functionApi
  const apiSubmit = () => {
    let { id, ...sortRes }: any = sort;
    let obj = {
      name: "education_brochure"
    };
    // handleData()

    let _data = {
      data: obj,
      sort_by: sortRes
    };

    dispatch({
      type: actionTypesBrochures.borchuresStaticSelectAsync,
      payload: _data
    });
  };
 
  return (
    <>
      <div>
        <button
          className="btnsGreen mb-5"
          onClick={() => setFlagAddModal(true)}
        >
          افزودن لینک
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description11"
          className={classes.modal}
          open={flagAddModal}
          onClose={() => setFlagAddModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={flagAddModal}>
            <ModalAdd
              setNewButton={setFlagAddModal}
              handelSubmitAdd={handleSubmitAdd}
            />
          </Fade>
        </Modal>
      </div>
      {stateReducer.loading ? <LinearProgress /> : null}

      <Table
        height={"tab"}
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
      >
        {state?.map((item: any, index: any) => {
          return (
            <TableRow
              key={index}
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
              // stateReducerCategory={stateReducerCategory}
              setflagApi={setflagApi}
              handelSubmitUpdate={handelSubmitUpdate}
              handleSubmitDelete={handleSubmitDelete}
            />
          );
        })}
      </Table>
    </>
  );
};

export default Brochures;
