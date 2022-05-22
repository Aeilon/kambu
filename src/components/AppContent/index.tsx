import React from "react";
import { Main } from "./style";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

const AppContent: React.FC = () => {
  return (
    <Main>
      <LeftSide />
      <RightSide />
    </Main>
  );
};

export default AppContent;
