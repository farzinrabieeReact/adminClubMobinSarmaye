import React, { useEffect, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { stockDataManagement_update } from "../../../../../../redux/stock/stockDataManagement/stockDataManagement_update/stockDataManagement_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import DatePicker from "../../../../../common/components/datePickerWithError";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "90%",
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: "70vh",
    minWidth: 600,
    display: "flex",
    flexWrap: "wrap",
    margin: "auto"
  },
  form: {
    display: "flex",
    flexWrap: "inherit",
    "& > *": {
      width: "30%",
      margin: "10px 1%"
    }
  },
  buttons: {
    marginTop: 50,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  }
}));

export default function ModalInsertEdit({
  data,
  setNewButton,
  handleSubmitInsert,
  setflagApi
}) {
  ///////////////////////if(data) ======> edit   else===========>insert
  const classes = useStyles();
  const [state, setstate] = useState(initState);
  console.log("stateeeeeee", state);
  const dispatch = useDispatch();

  const handleSubmitEdit = (e, id) => {
    let obj = {};
    Object.keys(state).forEach(item => {
      if (item === "isin") return;
      if (!state[item].label) {
        obj[item] = null;
        return;
      }
      obj[item] = state[item].label;
    });

    stockDataManagement_update({ ...obj, _id: id })
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        setTimeout(() => {
          setflagApi(prev => !prev);
          setNewButton(false);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  // const handleSubmitInsertOrSubmit = () => {
  //   if (data) {
  //     handleSubmitEdit(state, data.id);
  //   } else {
  //     handleSubmitInsert(state);
  //   }
  // };

  useEffect(() => {
    if (data) {
      let obj = {};
      Object.keys(data.body).map(item => {
        let value = data.body[item];

        obj[item] = { label: value, value: state[item].value };
      });
      setstate(obj);
    }
  }, [data]);

  const handleChange = (e, isin) => {
    let { value } = e.target;

    setstate(prev => ({
      ...prev,
      [isin]: { label: value, value: prev[isin].value }
    }));
  };
  const handelCHnage = (data, type) => {
    let value = data;

    setstate(prev => ({
      ...prev,
      [type]: { label: value, value: prev[type].value }
    }));
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        {Object.keys(state).map((item, ind) =>
          state[item].value.includes("تاریخ معامله") ? (
            <DatePicker
              key={ind}
              label={state[item].value}
              value={state[item].label}
              setValue={data =>
                handelCHnage(
                  `${convertDigitToEnglish(
                    data?.format("YYYY/MM/DD")
                  )} 00:00:00.000000`,
                  item
                )
              }
            ></DatePicker>
          ) : (
            <TextField
              key={ind}
              label={state[item].value}
              value={state[item].label}
              variant="outlined"
              onChange={e => handleChange(e, item)}
              type={typeof state[item].label === "number" ? "number" : "text"}
            />
          )
        )}
      </form>

      <div className={classes.buttons}>
        <button
          className="btnsGreen mb-5"
          onClick={e => handleSubmitEdit(e, data.id)}
        >
          ثبت
        </button>

        <button className="btnsRed mb-5" onClick={() => setNewButton(false)}>
          کنسل
        </button>
      </div>
    </div>
  );
}

let initState = {
  ins_code: { label: "", value: "شناسه Tse" },
  trade_date: { label: "", value: "تاریخ معامله" },
  isin: { label: "", value: "شناسه نماد" },
  "5_char_latin_symbol": { label: "", value: "5کاراکتر لاتین نماد" },
  "18_char_latin_symbol": { label: "", value: "18کاراکتر لاتین نماد" },
  "5_char_latin_company_name": { label: "", value: "5کاراکتر لاتین نام شرکت" },
  "18_char_persian_symbol": { label: "", value: "نام مخفف نماد" },
  "30_char_persian_symbol": { label: "", value: "نام کامل شرکت" },
  company_isin: { label: "", value: " شناسه شرکت" },
  nominal_price: { label: "", value: "قیمت اسمی" },
  total_company_quantity: { label: "", value: "تعداد سهام" },
  symbol_change_name: { label: "", value: "تغییر نام نماد" },
  today_change_type: { label: "", value: "تغییر نوع امروز" },
  symbol_category_aio: { label: "", value: "دسته بندی نماد" },
  symbol_group_code: { label: "", value: "کد گروه نماد" },
  symbol_first_trading_date: { label: "", value: "تاریخ اولین معامله نماد " },
  price_scale: { label: "", value: "مقیاس قیمت" },
  market_category: { label: "", value: "دسته بندی بازار" },
  board_code: { label: "", value: "کد تابلو " },
  sector_code: { label: "", value: "کد صنعت" },
  sub_sector_code: { label: "", value: "کد زیرگروه" },
  settlement_delay: { label: "", value: " تاخیر تسویه حساب" },
  max_permitted_price: { label: "", value: "حداکثر قیمت مجاز" },
  min_permitted_price: { label: "", value: "حدااقل قیمت مجاز" },
  base_volume: { label: "", value: "حجم مبنا" },
  symbol_type: { label: "", value: "نوع نماد" },
  tick: { label: "", value: "تیک" },
  flow: { label: "", value: "بازار" },
  trade_count: { label: "", value: "تعداد معامله" },
  quantity: { label: "", value: "تعداد" },
  total_value: { label: "", value: "ارزش کل" },
  close_price: { label: "", value: "قیمت بسته شدن" },
  last_price: { label: "", value: "آخرین قیمت" },
  price_change: { label: "", value: "تغییر قیمت" },
  low_price: { label: "", value: " کمترین قیمت" },
  high_price: { label: "", value: " بیشترین قیمت" },
  open_price: { label: "", value: "قیمت باز شده" },
  yesterday_price: { label: "", value: "قیمت دیروز" },
  buy_volume_order_book_1: { label: "", value: "حجم سفارش خرید 1" },
  buy_count_order_book_1: { label: "", value: "تعداد سفارش خرید 1" },
  buy_price_order_book_1: { label: "", value: "قیمت سفارش خرید 1" },
  sell_price_order_book_1: { label: "", value: "قیمت سفارش فروش 1" },
  sell_count_order_book_1: { label: "", value: "تعداد سفارش فروش 1" },
  sell_volume_order_book_1: { label: "", value: "حجم سفارش فروش 1" },
  buy_volume_order_book_2: { label: "", value: "حجم سفارش خرید 2" },
  buy_count_order_book_2: { label: "", value: "تعداد سفارش خرید2" },
  buy_price_order_book_2: { label: "", value: "قیمت سفارش خرید 2" },
  sell_price_order_book_2: { label: "", value: "قیمت سفارش خرید 2" },
  sell_count_order_book_2: { label: "", value: " تعداد سفارش فروش 2" },
  sell_volume_order_book_2: { label: "", value: " حجم سفارش فروش 2" },
  buy_volume_order_book_3: { label: "", value: "حجم سفارش خرید 3" },
  buy_count_order_book_3: { label: "", value: "تعداد سفارش خرید3" },
  buy_price_order_book_3: { label: "", value: "قیمت سفارش خرید 3" },
  sell_price_order_book_3: { label: "", value: "قیمت سفارش خرید 3" },
  sell_count_order_book_3: { label: "", value: " تعداد سفارش فروش 3" },
  sell_volume_order_book_3: { label: "", value: "حجم سفارش فروش " },
  buy_count_individual: { label: "", value: "تعداد خرید حقیقی" },
  buy_count_non_individual: { label: "", value: " تعداد خرید حقوقی" },
  sell_count_individual: { label: "", value: "تعداد فروش حقیقی " },
  sell_count_non_individual: { label: "", value: "تعداد فروش حقوقی" },
  buy_volume_individual: { label: "", value: "حجم خرید حقیقی" },
  buy_volume_non_individual: { label: "", value: "حجم خرید حقوقی" },
  sell_volume_individual: { label: "", value: " حجم فروش حقیقی" },
  sell_volume_non_individual: { label: "", value: "حجم فروش حقوقی" },
  sector_name: { label: "", value: "نام صنعت" },
  sector_index_value: { label: "", value: "ارزش شناسه صنعت" },
  sector_index_value_change: { label: "", value: "تغییر ارزش شناسه صنعت" },
  non_individual_movements: { label: "", value: "حرکات حقوقی" },
  individual_buy_power: { label: "", value: "قدرت خرید حقیقی" },
  non_individual_buy_power: { label: "", value: "قدرت خرید حقوقی" },
  total_buy_power: { label: "", value: " مجموع قدرت خرید" },
  individual_sell_power: { label: "", value: "قدرت فروش حقیقی" },
  non_individual_sell_power: { label: "", value: " قدرت فروش حقوقی" },
  total_sell_power: { label: "", value: " مجموع قدرت فروش" },
  price_range: { label: "", value: "بازه قیمت" },
  daily_stock_return: { label: "", value: " بازگشت روزانه سهم" },
  daily_sector_return: { label: "", value: "بازگشت روزانه صنعت" },
  close_price_change: { label: "", value: "تغییر قیمت بسته شده" },
  abnormal_volume: { label: "", value: "حجم غیر طبیعی" }
};
