import React from "react";
import { Main } from "./style";
import logo from "../../images/logo.svg";
import { useSelector } from "react-redux";
import { ISelector } from "../AppContent/interface";
import ChangePlnValueComponent from "./ChangePlnValueComponent";

const Nav: React.FC = () => {
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  return (
    <Main>
      <img src={logo} alt="logo" />
      <ChangePlnValueComponent />
      <p>
        1 EURO ={" "}
        {Intl.NumberFormat("pl").format(Math.round(plnPrice * 100) / 100)} PLN
      </p>
    </Main>
  );
};

export default Nav;
