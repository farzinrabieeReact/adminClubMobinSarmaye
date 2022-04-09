import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from "@material-ui/lab";
import { actionTypes } from "./../../../../redux/gift/gift_select";
import { CardGift } from "./Card";
import CardNoData from "./../../../common/components/cardNoData"
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../common/method/handleNotificationAlert';
import { gift_activate_dispatch } from '../../../../redux/gift/gift_activate';
import { gift_deactivate_dispatch } from '../../../../redux/gift/gift_deactivate';
import { CircularProgress } from "@material-ui/core";
import Header from "./header/index"
import { typeGift, typeGiftSwitch } from '../../../../redux/gift/type_gift';
import { actionTypes as actionTypesCategory } from "../../../../redux/gift/gift_category_select";
import { actionTypes as actionTypesSubCategory } from "../../../../redux/gift/gift_subCategory_select";
import { handleNull, handleIsActive } from '../../../common/method/displayData';



const useStyles = makeStyles(() => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        width: "100%",
        borderRadius: 8,
        margin: "15px auto 0 auto",
        display: "inline-block",
        overflow: "auto",
    },
    box: {
        width: "100%",
        margin: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        overflow: "auto",
    },
    stickyPagination: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        direction: "ltr",
    },
}))

export function SelectGift() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const ReducerGift = useSelector((state) => state.gift_select_Reducer);
    const [pagination, setPagination] = useState(1)
    const [flagApi, setflagApi] = useState(false)
    const [stateTable, setStateTable] = useState({});

    ////////////////////////////////Categories & subCategories////////////////////////////////////
    const reducerCategories = useSelector(
        (state) => state.gift_select_Reducer_categories.data
    );
    const reducerSubcategories = useSelector(
        (state) => state.gift_select_Reducer_subCategories.data
    );

    useEffect(() => {
        dispatch({ type: actionTypesCategory.giftSelectActiveCategorisAsync })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        stateTable.gift_sub_category &&
            setStateTable((prev) => ({ ...prev, gift_sub_category: "" }));

        callApiSelectSubCategory()
    }, [stateTable.gift_category])// eslint-disable-line react-hooks/exhaustive-deps

    const callApiSelectSubCategory = () => {
        let isFilter = stateTable.gift_category ? { gift_category: stateTable.gift_category } : {};

        dispatch({ type: actionTypesSubCategory.giftSelectActiveSubCategoryAsync, payload: isFilter })
    };
    //////////////////////////////////////////////////////////////////////////////

    const getDataForSelectApi = () => {
        let obj = {};

        Object.keys(stateTable).forEach((element) => {
            if (stateTable[element]) {
                obj[element] = stateTable[element];
            }
        });

        return {
            data: obj,
            from: (pagination - 1) * ReducerGift.size,
            size: ReducerGift.size
        }
    }

    const apiCallGift = () => {
        let payload = getDataForSelectApi()
        dispatch({ type: actionTypes.giftSelectAsync, payload })
    }

    useEffect(() => {
        apiCallGift() // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [flagApi])

    const handleChangePagination = (event, value) => {
        setPagination(value);
    };

    /////////////////////////////// apiCallSelectAfterApdate //////////////////////////////
    const apiCallSelectAfterApdate = () => {
        setflagApi(prev => !prev)
    };
    //////////////////////////////////////////////////////////////////////////////

    /////////////////////////////// api gift active //////////////////////////////
    const apiGiftActive = (id) => {
        let obj = {
            _id: id,
        };

        gift_activate_dispatch(obj)
            .then(res => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    apiCallSelectAfterApdate()
                }
            })
            .catch(err => {
                handleNotificationAlertCatch()
            })
    };
    //////////////////////////////////////////////////////////////////////////////

    /////////////////////////////// api gift deactive //////////////////////////////
    const apiGiftDeactivate = (id) => {
        let obj = {
            _id: id,
        };

        gift_deactivate_dispatch(obj)
            .then(res => {
                let isOk = handleNotificationAlertTryUpdate(res)
                if (isOk) {
                    apiCallSelectAfterApdate()
                }
            })
            .catch(err => {
                handleNotificationAlertCatch()
            })
    };
    //////////////////////////////////////////////////////////////////////////////

    const handelRefresh = () => {
        setStateTable({})
        setPagination(1)
        setflagApi(prev => !prev)
    }

    let headForFilter = [
        {
            id: 1,
            label: "ردیف",
            title: null,
            active: true,
            type: ""
          },
        {
            id: 2,
            label: "گروه",
            title: "gift_category",
            active: false,
            type: "option",
            option: reducerCategories.map(item => (
                { title: item.body.gift_category, value: item.body.gift_category }
            )),
            format: handleNull
        },
        {
            id: 3,
            label: "زیر گروه",
            title: "gift_sub_category",
            active: false,
            type: "option",
            option: reducerSubcategories.map(item => (
                { title: item.body.gift_sub_category, value: item.body.gift_sub_category }
            )),
            format: handleNull
        },
        {
            id: 4,
            label: "نوع",
            title: "type",
            active: false,
            type: "option",
            option: typeGift
                .map((item) => (
                    { title: item.name, value: item.value }
                )),
            format: typeGiftSwitch
        },
        {
            id: 5,
            label: "وضعیت",
            title: "is_active",
            active: false,
            type: "option",
            option: [
                { title: "فعال", value: "TRUE" },
                { title: "غیر فعال", value: "FALSE" },
            ],
            format: handleIsActive
        },
        {
            id: 6,
            label: "کد کالا",
            title: "gift_code",
            active: false,
            type: "text",
            format: handleNull
        },
    ]


    return (

        <div
            className={classes.root}
        >

            <Header
                stateTable={stateTable}
                setStateTable={setStateTable}
                Head={headForFilter}
                submitTable={() => setflagApi(prev => !prev)}
                handelRefresh={handelRefresh}
            />
            {
                ReducerGift.loading && (
                    <Box position="fixed" top="50%" left="50%" zIndex="100">
                        <CircularProgress />
                    </Box>
                )
            }
            {ReducerGift.data.length ? (
                <>
                    <div className={classes.box}>
                        {ReducerGift.data.map((item, ind) => (
                            <CardGift
                                key={ind}
                                data={item}
                                apiCallSelectAfterApdate={apiCallSelectAfterApdate}
                                apiGiftActive={apiGiftActive}
                                apiGiftDeactivate={apiGiftDeactivate}
                            />
                        ))}
                    </div>
                    <div className={classes.stickyPagination}>
                        <Pagination
                            shape="rounded"
                            variant="outlined"
                            count={Math.ceil(
                                ReducerGift.total / ReducerGift.size
                            )}
                            page={pagination}
                            onChange={(event, value) => {
                                handleChangePagination(event, value)
                                setflagApi(prev => !prev)
                            }}
                        />
                    </div>
                </>
            ) : (
                    !ReducerGift.loading && <CardNoData />
                )}
        </div>

    )
}
