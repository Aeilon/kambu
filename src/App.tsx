import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { AppBox } from "./style";
import AppContent from "./components/AppContent";
import api from "./services/axiosConfig";
import Loading from "./components/Loading/Loading";
import { useDispatch } from "react-redux";
import { changePlnPrice } from "./actions/plPriceAction";

const App = () => {
  const [loading, toggleLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // This api key should not be exposed, data should come from backend

  const API_KEY = "2sEb8LdyK1jh1r158gBPSyxMcYwyn1QAMcLTGGhT";
  const BASE_CURRENCY = "EUR";
  const CURRENCIES = "PLN";

  const getPlnPrice = async () => {
    try {
      toggleLoading(true);
      const resp = await api.get(
        `latest?apikey=${API_KEY}&currencies=${CURRENCIES}&base_currency=${BASE_CURRENCY}`
      );

      dispatch(changePlnPrice(resp.data.data.PLN.value));
      toggleLoading(false);
    } catch (err) {
      console.error(err);
      dispatch(changePlnPrice(4.556));
      toggleLoading(false);
      alert("too many requests, api doesn't work");
    }
  };

  useEffect(() => {
    getPlnPrice();
  }, []);

  if (loading) return <Loading />;

  return (
    <AppBox>
      <Nav />
      <AppContent />
    </AppBox>
  );
};

export default App;
