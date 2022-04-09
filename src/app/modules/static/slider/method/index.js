export const handelIsNewPage = (key) => {
    switch (key) {
        case false:
            return 'داخلی';
        case true:
            return "خارجی"
        default:
            return '-';
    }
}
export const handelshowSlider = (key) => {
    switch (key) {
        case true:
            return 'فعال';
        case false:
            return "غیر فعال"
        default:
            return '-';
    }
}