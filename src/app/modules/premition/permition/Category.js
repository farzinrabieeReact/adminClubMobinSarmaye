// import React, { useState } from "react";
// import { Clear } from "@material-ui/icons";
//
// const Category = ({ classes, setOpenModal, clickBtn, setClickBtn }) => {
//   const [show, setShow] = useState({
//     flag: false,
//     id: ""
//   });
//   const handleClick = id => {
//     setClickBtn(id);
//   };
//   const handleShow = id => {
//     setShow({
//       flag: true,
//       id: id
//     });
//   };
//   const handelNone = id => {
//     setShow({
//       flag: false,
//       id: id
//     });
//   };
//   return (
//     <>
//       <div className="col-2">
//         <div className="bg-white rounded-lg " style={{ height: "700px" }}>
//           <div className="p-5 mb-5">
//             <span
//               className={`${classes.btnAdd} shadow`}
//               onClick={() => setOpenModal(true)}
//             >
//               افزودن
//             </span>
//           </div>
//           <div>
//             <span
//               className={clickBtn === 1 ? classes.btnsActive : classes.btns}
//               onMouseEnter={() => handleShow(1)}
//               onMouseLeave={() => handelNone(1)}
//               onClick={() => handleClick(1)}
//             >
//               <div className="mx-auto"> مدیر سیستم</div>
//               <div
//                 className={
//                   show.flag && show.id === 1
//                     ? classes.clearBtn
//                     : classes.clearBtnNone
//                 }
//               >
//                 <Clear />
//               </div>
//             </span>
//             <span
//               className={clickBtn === 2 ? classes.btnsActive : classes.btns}
//               onClick={() => handleClick(2)}
//               onMouseEnter={() => handleShow(2)}
//               onMouseLeave={() => handelNone(2)}
//             >
//               <div className="mx-auto"> مدیر سیستم</div>
//               <div
//                 className={
//                   show.flag && show.id === 2
//                     ? classes.clearBtn
//                     : classes.clearBtnNone
//                 }
//               >
//                 <Clear />
//               </div>
//             </span>
//             <span
//               className={clickBtn === 3 ? classes.btnsActive : classes.btns}
//               onMouseEnter={() => handleShow(3)}
//               onMouseLeave={() => handelNone(3)}
//               onClick={() => handleClick(3)}
//             >
//               <div className="mx-auto"> مدیر سیستم</div>
//               <div
//                 className={
//                   show.flag && show.id === 3
//                     ? classes.clearBtn
//                     : classes.clearBtnNone
//                 }
//               >
//                 <Clear />
//               </div>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default Category;

import React, { useState } from "react";
import { Clear } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

const Category = ({
  classes,
  setOpenModal,
  clickBtn,
  setClickBtn,
  handleClickCategory,
  reducerRole,
  handleClickDelete
}) => {
  const [show, setShow] = useState({
    flag: false,
    id: ""
  });

  const handleShow = id => {
    setShow({
      flag: true,
      id: id
    });
  };
  const handelNone = id => {
    setShow({
      flag: false,
      id: id
    });
  };
  return (
    <>
      <div className="col-2">
        <div
          className="bg-white rounded-lg scrollNoneAuto"
          style={{
            position: "sticky",
            top: 135,
            height: "calc(100vh - 210px)"
          }}
        >
          <div className="p-5 mb-5">
            <span
              className={`${classes.btnAdd} shadow`}
              onClick={() => setOpenModal(true)}
              style={{ cursor: "pointer" }}
            >
              افزودن
            </span>
          </div>
          <div>
            {reducerRole?.data?.length !== 0 &&
              reducerRole?.data?.map((itm, ind) => (
                <span
                  style={{ cursor: "pointer" }}
                  className={
                    clickBtn === itm.id ? classes.btnsActive : classes.btns
                  }
                  onMouseEnter={() => handleShow(itm.id)}
                  onMouseLeave={() => handelNone(itm.id)}
                  onClick={() =>
                    handleClickCategory(itm.id, itm.body.permitted_methods)
                  }
                  key={ind}
                >
                  <div className="mx-auto">{itm?.body?.role_name}</div>
                  <div
                    onClick={() => handleClickDelete(itm.id)}
                    className={
                      show.flag && show.id === itm.id
                        ? classes.clearBtn
                        : classes.clearBtnNone
                    }
                  >
                    <Clear />
                  </div>
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
