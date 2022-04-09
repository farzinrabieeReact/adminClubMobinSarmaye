import React from "react";
import { Route, Switch } from "react-router-dom";
import Education from "./insertEducation";
import RegisterHuman from "./registerPerson/index";
import EducationSelect from "./selectEducation";
import Brochures from "./brochures";
import Application from "./application";
import Videos from './video'

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/education/Courses/newCourse"}>
          <Education />
        </Route>
        <Route path={"/education/Courses/registerPerson"}>
          <RegisterHuman />
        </Route>
        <Route path={"/education/Courses/List"}>
          <EducationSelect />
        </Route>
        <Route path={"/education/Courses/brochures"}>
          <Brochures />
        </Route>
        <Route path={"/education/Courses/application"}>
          <Application />
        </Route>
        <Route path={"/education/videos"}>
          <Videos />
        </Route>
      </Switch>
    </>
  );
};

export default Index;
