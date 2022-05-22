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

  const getPlnPrice = async () => {
    const API_KEY = "03fd38522fa1f1cd0f47";
    try {
      toggleLoading(true);
      const resp = await api.get(
        `convert?q=EUR_PLN&compact=ultra&apiKey=${API_KEY}`
      );

      dispatch(changePlnPrice(resp.data.EUR_PLN));
      toggleLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // This api key should not be exposed, data should come from backend

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
