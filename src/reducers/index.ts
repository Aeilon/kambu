import { combineReducers } from "redux";
import { plnPriceReducer } from "./plnPriceReducer";

const allReducers = combineReducers({
  plnPrice: plnPriceReducer,
});

export default allReducers;
