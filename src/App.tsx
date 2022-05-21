import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { AppBox } from "./style";
import AppContent from "./components/AppContent";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { changePlnPrice } from "./actions/plPriceAction";
import { ISelector } from "./components/AppContent/interface";

const App = () => {
  const dispatch = useDispatch();
  const plnPrice = useSelector((state: ISelector) => state.plnPrice);

  const getPlnPrice = async () => {
    try {
      const resp = await axios.get(
        "https://free.currconv.com/api/v7/convert?q=EUR_PLN&compact=ultra&apiKey=beb82c230e66d4d4282b"
      );
      dispatch(changePlnPrice(resp.data.EUR_PLN));
    } catch (err) {
      console.error(err);
    }
  };

  // This api key should not be exposed, data should come from backend

  useEffect(() => {
    getPlnPrice();
  }, []);

  if (plnPrice === 0) return <Loading />;

  return (
    <AppBox>
      <Nav />
      <AppContent />
    </AppBox>
  );
};

export default App;
