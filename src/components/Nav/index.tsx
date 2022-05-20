import React from "react";
import { Main } from "./style";
import logo from "../../images/logo.svg";
import { useSelector } from "react-redux";
import { ISelector } from "../AppContent/interface";

const Nav: React.FC = () => {
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  return (
    <Main>
      <img src={logo} alt="logo" />
      <p>1 EURO = {plnPrice} PLN</p>
    </Main>
  );
};

export default Nav;
