import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Iransans from "./font/IRANSansWeb.ttf";

Font.register({
  family: "iransans",
  format: "truetype", // 1
  src: Iransans,
  fontStyle: "normal",
  fontWeight: "normal",
});
// Create styles
const styles = StyleSheet.create({
  root: {
    fontFamily: "iransans",
  },
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "70%",
    height: "55%",
    display: "flex",
    border: "1px solid black",
  },
  box1: {
    width: "100%",
    height: "50%",
    borderBottom: "1px solid black",
    paddingRight: 5,
  },
  box2: {
    width: "100%",
    height: "50%",
    paddingRight: 5,
  },
  title: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    fontSize: 10,
    marginTop: 10,
  },
  line: {
    margin: "0 10px",
  },
  addressBox1: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    fontSize: 10,
    marginTop: 10,
  },
  addressBox2: {
    width: "100%",
    height: 30,
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    fontSize: 8,
    marginTop: 10,
  },
  addressBox3: {
    width: "90%",
    display: "flex",
    margin: "10 auto 15 auto",
    // alignItems: "center",
    alignItems: "space-between",
    flexDirection: "row-reverse",
    fontSize: 9,
  },
  addressParent: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  imageParent: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    // marginBottom:5
  },
  postalCodeBox: {
    // width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  phoneBox: {
    // width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  imageSize: {
    width: "50%",
  },
  margin: {
    marginRight: 8,
  },
  // fontSize8:{
  //   height:50,
  //   fontSize:9
  // }

  // postalCodeBox: {
  //   width: "50%",
  //   display: "flex",
  //   flexDirection: "row-reverse",
  // },
  // phoneBox: {
  //   width: "50%",
  //   display: "flex",
  //   flexDirection: "row-reverse",
  // },
});

const PdfLabel = ({ row }) => {
  const [stateData, setstateData] = useState([]);
  const [statePdf, setstatePdf] = useState([]);

  const handleCustomGiftData = (data) => {
    let obj = {};
    stateData.map((itm, ind) => {
      switch (itm.name) {
        case "personName":
          obj["personName"] = itm.value;
          return;
        case "mobile":
          obj["mobile"] = itm.value;
          return;
        case "postalCode":
          obj["postalCode"] = itm.value;
          return;
        case "irancityList":
          obj["irancityList"] = itm.value;
          return;
        case "provinceList":
          obj["provinceList"] = itm.value;
          return;
        case "cityName":
          obj["cityName"] = itm.value;
          return;
        case "address":
          obj["address"] = itm.value;
          return;
        case "provinceName":
          obj["provinceName"] = itm.value;
          return;
        default:
          break;
      }
    });

    setstatePdf(obj);
  };

  useEffect(() => {
    if (row.body.gift_custom_data) {
      setstateData(JSON.parse(row.body.gift_custom_data));
    }
  }, [row]);

  useEffect(() => {
    if (stateData) {
      handleCustomGiftData();
    }
  }, [stateData]);

  return (
    <>
      <Document style={styles.root}>
        <Page size="A5" style={styles.page} orientation={"landscape"}>
          <View style={styles.section}>
            <View style={styles.box1}>
              <View style={styles.title}>
                <Text>فرستنده:</Text>
                <Text style={styles.margin}>شرکت جهت</Text>
                <View>
                  <Text style={styles.line}>|</Text>
                </View>
                <Text>هدیه باشگاه مشتریان کارگزاری مبین سرمایه</Text>
              </View>
              <View style={styles.addressBox1}>
                <View style={styles.postalCodeBox}>
                  <Text>کدپستی:</Text>
                  <Text style={styles.margin}>1586767116</Text>
                </View>
                <View style={styles.phoneBox}>
                  <Text>تلفن:</Text>
                  <Text style={styles.margin}>021-91004884</Text>
                </View>
              </View>
              <View style={styles.addressBox2}>
                <Text>آدرس:</Text>
                <Text style={styles.fontSize8}>
                  استان تهران | شهر تهران | خیابان قائم مقام فراهانی، کوچه شهید
                  میرزا حسنی، پلاک 13، طبقه 3، واحد 5
                </Text>
              </View>
            </View>

            <View style={styles.box2}>
              <View style={styles.addressBox1}>
                <View style={styles.postalCodeBox}>
                  <Text>نام گیرنده:</Text>
                  <Text style={styles.margin}>{statePdf.personName}</Text>
                </View>
                <View style={styles.phoneBox}>
                  <Text>شماره سفارش:</Text>
                  <Text style={styles.margin}>{row.body.basket_code}</Text>
                </View>
              </View>
              <View style={styles.addressBox2}>
                <Text>آدرس:</Text>
                <Text style={styles.fontSize8}>
                {" "}
                  {"|"}
                  {" "}
                  {statePdf.provinceName}
                </Text>
                <Text style={styles.fontSize8}>{" "}{"|"}{" "}{statePdf.cityName}</Text>
                <Text style={styles.fontSize8}>
                  {statePdf.address}
    
                </Text>
              </View>
              <View style={styles.addressBox3}>
                <View style={styles.addressParent}>
                  <View style={styles.postalCodeBox}>
                    <Text>کدپستی:</Text>
                    <Text style={styles.margin}>{statePdf.postalCode}</Text>
                  </View>
                  <View style={styles.phoneBox}>
                    <Text style={styles.size}>تلفن:</Text>
                    <Text style={styles.margin}>{statePdf.mobile}</Text>
                  </View>
                </View>
                <View style={styles.imageParent}>
                  <View style={styles.imageSize}>
                    <Image src={"/media/common/jahat_logo.png"}></Image>
                  </View>
                </View>
              </View>
              {/* <View style={styles.title}>
                <Text>فرستننده:</Text>
                <Text>شرکت جهت</Text>
                <View>
                  <Text style={styles.line}>|</Text>
                </View>
                <Text>هدیه باشگاه مشتریان کارگزاری مبین سرمایه</Text>
              </View>
              <View style={styles.addressBox1}>
                <View style={styles.postalCodeBox}>
                  <Text>کدپستی:</Text>
                  <Text>15168168849684</Text>
                </View>
                <View style={styles.phoneBox}>
                  <Text>تلفن:</Text>
                  <Text>021-123456789</Text>
                </View>
              </View>
              <View style={styles.addressBox2}>
                  <Text>آدرس:</Text>
                  <Text>استان تهران | شهر تهران |  خیابان قائم مقام فراهانی، کوچه شهید میرزا حسنی، پلاک 13، طبقه 3، واحد 5</Text>
              </View> */}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PdfLabel;
