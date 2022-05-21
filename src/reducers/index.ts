import { combineReducers } from "redux";
import { allTransactionsReducer } from "./allTransactionsReducer";
import { plnPriceReducer } from "./plnPriceReducer";

const allReducers = combineReducers({
  plnPrice: plnPriceReducer,
  allTransactions: allTransactionsReducer,
});

export default allReducers;
