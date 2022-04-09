import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { Box, FormControl, TextField } from "@material-ui/core";
import FreeSoloCreateOption from "./CreateOption";
import { CkEditor } from "../../../../common/components/ckeditor";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
import { faq_insert } from "../../../../../redux/content/faq/insert_faq/faq_insert";
const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10
  },

  table: {
    minWidth: 650,
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold"
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  icons: {
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    minWidth: "931px",
    borderRadius: 10,
    background: "white",
    padding: "20px"
  },
  textEditor: {
    width: "100%",
    height: "400px"
  },
  buttonsAdded: {
    float: "right"
  }
}));
// const DataEdit = {
//     answer: "<p>\r\n                                                                               حین افزایش سرمایه از محل آورده نقدی، شرکت‌ها سهام جدید برای فروش عرضه می‌کنند؛\r\n                                                                               که سهام‌داران فعلی شرکت در اولویت خرید آن قرار دارند.\r\n                                                                               بنابراین پس از برگزاری مجمع، به تمام سهام‌داران شرکت اوراقی به نام «حق‌تقدم» اختصاص می‌یابد.\r\n                                                                               اوراق حق‌تقدم به سه روش قابل استفاده می‌باشند:\r\n                                                                       </p>\r\n                                                                       <ul>\r\n                                                                               <li>\r\n                                                                                       تبدیل سهام اصلی\r\n                                                                                       <p>\r\n                                                                                               سهام‌داران باید پس از تماس با واحد امور سهام شرکت ناشر و\r\n                                                                                               دریافت شماره حساب بانکی، قیمت اسمی (100 تومان) را به ازای هر برگه حق‌تقدم به حساب شرکت واریز نمایند؛\r\n                                                                                               تا پس از طی فرآیند اداری امور صدور سهام اصلی انجام شود.\r\n                                                                                       </p>\r\n                                                                               </li>\r\n                                                                               <li>\r\n                                                                                       فروش حق‌ تقدم\r\n                                                                                       <p>\r\n                                                                                               فروش اوراق طی مدت دو ماهه باز بودن نماد آن در بازار سهام، با قیمت‌گذاری بر اساس عرضه و تقاضا امکان‌پذیر است.\r\n                                                                                       </p>\r\n                                                                               </li>\r\n                                                                               <li>\r\n                                                                                       عدم استفاده از حق‌تقدم\r\n                                                                                       <p>\r\n                                                                                               در این صورت پس از پایان دوره پذیره‌نویسی سهام، شرکت از طریق حراج اقدام به فروش حق‌تقدم‌های استفاده نشده می‌نماید\r\n                                                                                               و مبلغ حاصل از آن (پس از کسر کارمزد) به حساب سرمایه‌گذاران واریز خواهد شد.\r\n                                                                                       </p>\r\n                                                                               </li>\r\n                                                                       </ul>\r\n                                                                       <p>\r\n                                                                               صاحبان سهام می‌توانند، اخبار و اطلاعات مربوط به مجامع و حق‌تقدم سهام را از سامانه کدال مشاهده و پیگیری نمایند.\r\n                                                                       </p>",
//     category: "سرمایه‌گذاری مستقیم در اوراق بهادار",
//     question: "حق‌تقدم چیست و به چه کسانی تعلق می‌گیرد؟"
// }

export default function ModalAdd({ categotyFAQ, setflagClose, setflagApi }) {



  const [DataEdit, setDataEdit] = useState({
    answer: "",
    category: [],
    question: ""
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const refCategory = useRef(null);
  const refQuestion = useRef(null);
  const refAnsware = useRef(null);
  //
  // useEffect(() => {
  //   if (type === "EDIT_REQUEST") {
  //     let newVal = data.map(item => {
  //       return { ...item };
  //     });
  //
  //     newVal.map(item => {
  //       if (item.id === selectedItem) {
  //         setDataEdit(item);
  //       }
  //       return item;
  //     });
  //   } //eslint-disable-line react-hooks/exhaustive-deps
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    let data = {
      category: DataEdit.category,
      question: DataEdit.question,
      answer: DataEdit.answer
    };
    faq_insert(data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
        setTimeout(() => {
          setflagApi(prev => !prev);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setflagClose(false);
  };

  //   if (type === "EDIT_REQUEST") {
  //     let data = {
  //       _id: selectedItem,
  //       category: refCategory.current,
  //       question: refQuestion.current,
  //       answer: refAnsware.current
  //     };
  //   }
  //
  //   setflagClose(false);
  // };

  // useEffect(() => {
  //   if (type === "EDIT_REQUEST") refQuestion.current = DataEdit.question;
  // }, [DataEdit]); //eslint-disable-line react-hooks/exhaustive-deps
  //
  // if (type === "EDIT_REQUEST") {
  //   if (!DataEdit.answer) {
  //     return <div></div>;
  //   }
  // }
  const handleEdit = (value, type) => {
    setDataEdit(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className={classes.paper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <FreeSoloCreateOption
          stateReducerCategory={categotyFAQ}
          forwardValue={data => (refCategory.current = data?.title)}
          categoryDataEdit={null}
          DataEdit={DataEdit}
          setDataEdit={setDataEdit}
        />
      </FormControl>

      <Box>
        <TextField
          label="عنوان سوال"
          id="titleNewButton"
          // value={type === "INSERT_REQUEST" ? "" : DataEdit.question}
          defaultValue={""}
          variant="outlined"
          // size="small"
          style={{ margin: "20px 0", width: "100%" }}
          onChange={e => handleEdit(e.target.value, "question")}
        />
      </Box>

      <div className={classes.textEditor}>
        <CkEditor
          value={DataEdit.answer}
          setValue={data => handleEdit(data, "answer")}
        ></CkEditor>
        {/*<TextEditorQuill*/}
        {/*  answerDataEdit={type === "INSERT_REQUEST" ? null : DataEdit.answer}*/}
        {/*>*/}
        {/*  {data => (refAnsware.current = data)}*/}
        {/*</TextEditorQuill>*/}
      </div>

      <Box mt={3} className={classes.buttonsAdded}>
        <button className="btnsGreen" onClick={handleSubmit}>
          ذخیره
        </button>
        <button onClick={() => setflagClose(false)} className="btnsRed">
          انصراف
        </button>
      </Box>
    </div>
  );
}
