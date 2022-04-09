import { makeStyles } from '@material-ui/core/styles';

export const make_Styles=  makeStyles({
    tableContainer: {
        height: "77vh !important",
        direction: "rtl",
        // borderRadius: 10,
        maxHeight: 750,
        width: '100%',
        margin: 'auto',
        overflow: 'auto',
        position: "relative",
    },
    tableContainerWithHeader: {
        height: "65vh !important",
        // direction: "rtl",
        // borderRadius: 10,
        maxHeight: 750,
        width: '100%',
        margin: 'auto',
        overflow: 'auto',
        position: "relative",
    },
    tableContainerWithTab: {
        height: "71vh !important",
        direction: "rtl",
        // borderRadius: 10,
        maxHeight: 750,
        width: '100%',
        margin: 'auto',
        overflow: 'auto',
        position: "relative",
    },
    table: {
        minWidth: 650,
        direction: "ltr",

        // borderRadius: 10,
    },
    head: {
        fontWeight: "bold",
        cursor: "pointer",
        whiteSpace: "nowrap",
        '& svg': {
            verticalAlign: "middle",
            fill: "rgba(1,1,1,0.5)",
            margin: " 0 1px"
        },

    },
    boxEmpty: {
        width: 24,
        height: 24
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
    },
    stickyPagination: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: 0,
        backgroundColor: "whitesmoke",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        direction: "ltr",
    },
    SearchIcon: {
        cursor: 'pointer'
    },
    gridfilter: {
        position: 'sticky',
        top: 57,
        backgroundColor: 'white',
        zIndex:2
    },
    pagnation: {
        backgroundColor: '#ffff',
        paddingBottom: '15px'
    },
    CardNoData:{
        position:'absolute',
        width:'100%',
    },
    icon:{
        cursor: 'pointer',
        marginLeft:10
    }
});
