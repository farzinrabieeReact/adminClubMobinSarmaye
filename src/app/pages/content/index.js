import React from "react";
import { Route, Switch } from "react-router-dom";
import Faq from "./faq/index";
import Posts from "./posts/index";
import Category from "./category/index";
import NewPost from "./newPost/index";
import AboutUs from "./aboutUs/index";
import Slider from "./slider/index";
import SignUpHelp from "./signUpHelp";
import News from "./news/index";
import Slider1 from './slider/index';

const Index = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/content/faq"}>
          <Faq />
        </Route>
        <Route exact path={"/content/posts"}>
          <Posts />
        </Route>
        <Route exact path={"/content/category"}>
          <Category />
        </Route>
        <Route exact path={"/content/newPost"}>
          <NewPost />
        </Route>
        <Route exact path={"/content/aboutUs"}>
          <AboutUs />
        </Route>
        <Route exact path={"/content/slider"}>
          <Slider />
        </Route>
        <Route exact path={"/content/slider1"}>
          <Slider1 />
        </Route>
        <Route exact path={"/content/signUpHelp"}>
          <SignUpHelp />
          </Route>
        <Route exact path={"/content/news"}>
          <News />
        </Route>
      </Switch>{" "}
    </>
  );
};

export default Index;
