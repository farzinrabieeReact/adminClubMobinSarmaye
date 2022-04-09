import React, { useEffect, useState } from "react";
import Content from "../posts/content/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesPost } from "../../../../redux/content/posts/post_select";
import { actionTypes as actionTypesPostReject } from "../../../../redux/content/posts/post_select_reject";
import { actionTypes as actionTypesPostApprove } from "../../../../redux/content/posts/post_select_approve";
import { actionTypes as actionTypesPostSubComment } from "../../../../redux/content/posts/post_select_subComment";
import { actionTypes } from "../../../../redux/content/faq/faq_select";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer";
import PostShow from "./postShow/PostShow";
import Comments from "./comments/Comments";
import { ArrowBack } from "@material-ui/icons";
import PostReport from "./postReport/PostReport";

interface Pagination {
  number: number;
  count: number;
}
const head = [
  {
    id: 1,
    label: "نام گروه",
    title: "forum_name",
    active: false,
    type: "text"
  },
  {
    id: 2,
    label: "نام زیر گروه",
    title: "subgroup_name",
    active: false,
    type: "text"
  },

  {
    id: 3,
    label: "نام خانوادگی کاربر ثبت کننده",
    title: "author_last_name",
    active: false,
    type: "text"
  },
  {
    id: 4,
    label: "عنوان",
    title: "title",
    active: false,
    type: "text"
  },
  {
    id: 5,
    label: "خلاصه",
    title: "abstract",
    active: false,
    type: "text"
  }
];
let flag = false;
const Posts = () => {
  ////////////////////////////////////////////////////////////////////////////////////state
  const [flagFilter, setFlagFilter] = useState(false);
  const [flagContent, setFlagContent] = useState("CONTENT");
  const [post_id, setparent_post_id] = useState(null);
  const [sort, setSort] = useState({});
  // const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({
    forum_name: "",
    subgroup_name: "",
    is_visible: "",
    author_last_name: "",
    title: "",
    abstract: ""
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [pagnation1, setPagnation1] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [pagnation2, setPagnation2] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [stateFilter, setStateFilter] = useState({
    forum_name: "",
    subgroup_name: "",
    is_visible: "",
    author_last_name: "",
    title: "",
    abstract: ""
  });

  const [value, setValue] = React.useState(0);

  ////////////////////////////////////////////////////////////////////////////////selector

  const stateReducerPost = useSelector(
    (state: any) => state.post_select_reducer
  );
  const stateReducerPostReject = useSelector(
    (state: any) => state.post_select_reject_reducer
  );
  const stateReducerPostApprove = useSelector(
    (state: any) => state.post_select_approve_reducer
  );

  ////////////////////////////////////////////////////////////////////////////////hook
  const dispatch = useDispatch();

  useEffect(() => {
    if (value === 0) {
      if (flag) {
        apiSubmitSelectPostReject();
      }
      flag = true;
    }
    if (value === 2) {
      apiSubmitSelectPost();
    }
    if (value === 1) {
      apiSubmitSelectPostApprove();
    }
  }, [value]);

  useEffect(() => {
    if (value === 0) {
      apiSubmitSelectPostReject();
    }
    if (value === 2) {
      apiSubmitSelectPost();
    }
    if (value === 1) {
      apiSubmitSelectPostApprove();
    }
  }, [flagApi]);

  useEffect(() => {
    setPagnation2((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducerPost.total / stateReducerPost.size)
    }));
  }, [stateReducerPost]);

  useEffect(() => {
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(
        stateReducerPostReject.total / stateReducerPostReject.size
      )
    }));
  }, [stateReducerPostReject]);

  useEffect(() => {
    setPagnation1((prev: any) => ({
      ...prev,
      count: Math.ceil(
        stateReducerPostApprove.total / stateReducerPostApprove.size
      )
    }));
  }, [stateReducerPostApprove]);
  ///////////////////////////////////////////////////////////////////////////////functionsapi

  const apiSubmitSelectPost = (idd?: any) => {
    let obj: any = {};
    let { size } = stateReducerPost;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    // handleData()

    if (flagContent === "POST_SHOW") {
      obj = { ...obj, _id: post_id };
    } else if (flagContent === "COMMENTS") {
      if (idd) {
        obj = { ...obj, parent_post_id: idd };
        let _data = {
          data: obj,
          from: pagnation2.number,
          size: size,
          sort_by: sortRes
        };
        dispatch({
          type: actionTypesPostSubComment.selectPostAsyncSubComment,
          payload: _data
        });
        return;
      } else {
        obj = { ...obj, parent_post_id: post_id };
      }
    } else if (flagContent === "EDIT") {
      obj = { ...obj, _id: post_id };
    } else {
      obj = { ...obj, is_visible: "FALSE" };
    }

    let _data = {
      data: obj,
      from: pagnation2.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypesPost.selectPostAsync, payload: _data });
  };
  const apiSubmitSelectPostReject = () => {
    let obj: any = {};
    let { size } = stateReducerPost;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    // handleData()
    obj = { ...obj, is_visible: "TRUE" };

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: actionTypesPostReject.selectPostRejectAsync,
      payload: _data
    });
  };

  const apiSubmitSelectPostApprove = () => {
    let obj: any = {};
    let { size } = stateReducerPost;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    // handleData()
    obj = { ...obj, is_visible: "TRUE" };

    let _data = {
      data: obj,
      from: pagnation1.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: actionTypesPostApprove.selectPostApproveAsync,
      payload: _data
    });
  };
  ///////////////////////////////////////////////////////////////////////////////functions
  const handleChangeValue = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handelRefresh = () => {
    // setSort({});
    // setStateTable({});
    setStateTable({
      forum_name: "",
      subgroup_name: "",
      is_visible: "",
      author_last_name: "",
      title: "",
      abstract: ""
    });
    setPagnation({ number: 1, count: 0 });
    if (value !== 0) {
      setValue(0);
    } else if (value === 0) {
      setflagApi((prev: any) => !prev);
    }
  };
  const handleClickBack = () => {
    setFlagContent("CONTENT");
    setflagApi((prevState: any) => !prevState);
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        {flagContent !== "CONTENT" ? (
          <ArrowBack onClick={handleClickBack} style={{ cursor: "pointer" }} />
        ) : null}
        {flagContent === "CONTENT" ? (
          <>
            <Drawer
              children={null}
              tableHead={head}
              stateFilter={stateTable}
              setStateFilter={setStateTable}
              apiSubmit={() => submitTable()}
            />
            <RefreshIcon
              className={"btnIcon"}
              onClick={() => handelRefresh()}
            />
          </>
        ) : null}
      </div>
      {flagContent === "CONTENT" && (
        <Content
          flagApi={flagApi}
          setflagApi={setflagApi}
          setPagnation={setPagnation}
          pagnation={pagnation}
          flagFilter={flagFilter}
          flagContent={flagContent}
          setFlagContent={setFlagContent}
          setparent_post_id={setparent_post_id}
          value={value}
          setValue={setValue}
          stateReducerPost={stateReducerPost}
          stateReducerPostReject={stateReducerPostReject}
          stateReducerPostApprove={stateReducerPostApprove}
          handleChange={handleChangeValue}
          pagnation1={pagnation1}
          setPagnation1={setPagnation1}
          pagnation2={pagnation2}
          setPagnation2={setPagnation2}
          apiSubmitSelectPost={apiSubmitSelectPost}
        />
      )}
      {flagContent === "POST_SHOW" && (
        <PostShow
          setFlagContent={setFlagContent}
          post_id={post_id}
          stateReducerPost={stateReducerPost}
          apiSubmitSelectPost={apiSubmitSelectPost}
        />
      )}
      {flagContent === "COMMENTS" && (
        <Comments
          post_id={post_id}
          apiSubmitSelectPost={apiSubmitSelectPost}
          stateReducerPost={stateReducerPost}
        />
      )}
      {flagContent === "POST_Report" && (
        <PostReport post_id={post_id} setFlagContent={setFlagContent} />
      )}
    </>
  );
};

export default Posts;
