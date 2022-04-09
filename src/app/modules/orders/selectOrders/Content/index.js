import React from "react";

import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import TableAggregeated from './tableAggregated';
import TableDetailes from './tableDetailes';


const useStyles = makeStyles((theme) => ({
    grid: {
        height: "75vh",
    },
    root: {
        width: "96%",
        borderRadius: 8,
        margin: "15px 0 0 2%",
        display: "inline-block",
    },
    appBar: {
        backgroundColor: "white",
    },
    LinkTab: {
        color: "black",
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function Index({ valueTab, setValueTab, checkIsin, memberId , setMemberId }) {


    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <div>
            <AppBar position="sticky" style={{ zIndex: 0 }}>
                <Tabs
                    value={valueTab}
                    onChange={handleChange}
                    aria-label="wrapped label tabs"
                    className={classes.appBar}
                >
                    <LinkTab
                        className={classes["LinkTab"]}
                        label="تجمیعی"
                        href="/"
                        {...a11yProps(1)}
                    />

                    <LinkTab
                        className={classes["LinkTab"]}
                        label="عمومی"
                        href="/"
                        {...a11yProps(0)}
                    />

                </Tabs>
            </AppBar>

            <TabPanel value={valueTab} index={0}>
                <TableAggregeated checkIsin={checkIsin} memberId={memberId} setMemberId={setMemberId} />
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
                <TableDetailes checkIsin={checkIsin} memberId={memberId} setMemberId={setMemberId} />
            </TabPanel>
        </div>
    );
}
