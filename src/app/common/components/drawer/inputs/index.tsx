import React, { FC } from "react";
import StractuerInputs from './../../stractuerInputs'

interface Props {
  data?: {
    id?: number;
    label?: string | null;
    title?: null | string;
    active?: boolean;
    type?: string;
  };
  state?: any | null;
  handelChangeState?: any;
  handelSubmit?: any;
  flag: boolean;
}

const Index: FC<Props> = ({
  data,
  state,
  handelChangeState,
  handelSubmit,
  flag,
}: any): any => {




  return <StractuerInputs
    data={data}
    state={state}
    handelChangeState={handelChangeState}
    handelSubmit={handelSubmit}
    flag={flag}
    isLabel={true}
  />
};
export default Index;
