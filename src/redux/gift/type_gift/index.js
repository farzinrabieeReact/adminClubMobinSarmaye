export const typeGift = [
  { name: "بیمه سامان", value: "BIMEH_SAMAN" },
  { name: "تحلیل", value: "TAHLIL" },
  { name: "آپ", value: "UP" },
  { name: "دیجی کالا", value: "DG" },
  { name: "کد تخفیف", value: "OFF_CODE" },
  { name: "تحویل فیزیکی", value: "PHYSICAL" },
  { name: "عمومی", value: "NO_TYPE" },
  { name: "شارژ آنلاین", value: "ONLINE_CHARGE" },
];

export let typeGiftSwitch = (value) => {
  switch (value) {
    case "BIMEH_SAMAN":
      return "بیمه سامان"
    case "TAHLIL":
      return "تحلیل"
    case "UP":
      return "آپ"
    case "DG":
      return "دیجی کالا"
    case "OFF_CODE":
      return "کد تخفیف"
    case "PHYSICAL":
      return "تحویل فیزیکی"
    case "NO_TYPE":
      return "عمومی"
    case "ONLINE_CHARGE":
      return "شارژ آنلاین"
    default:
      return "نامعلوم"
  }
}
