import React from "react";
import {TableIntroduction} from './components/tableIntroduction';
import { TableIntroducingMember } from './components/tableIntroducingMember';

export function ProfileOverview({ user }) {


  return (
    <div className="row">
      <div className="col-lg-12">
        <TableIntroducingMember
          className="card-stretch gutter-b"
          user = {user}
          />

      </div>
      <div className="col-lg-12">
        <TableIntroduction
          className="card-stretch gutter-b"
          user={user}
          />
      </div>
    </div>
  );
}
