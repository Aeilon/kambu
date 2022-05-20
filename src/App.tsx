import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { AppBox } from "./style";
import AppContent from "./components/AppContent";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import { useDispatch } from "react-redux";
import { changePlnPrice } from "./actions/plPriceAction";

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <AppBox>
      <Nav />
      <AppContent />
    </AppBox>
  );
};

export default App;
