import {
  ConvertedTransaction,
  AllTransactionsPayload,
} from "../components/AppContent/interface";
import { v4 } from "uuid";

export const allTransactionsReducer = (
  state: ConvertedTransaction[] = [],
  action: { type: string; payload: AllTransactionsPayload }
) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TRANSACTION": {
      return [
        ...state,
        {
          id: v4(),
          transactionName: payload.transactionName,
          euro: payload.euro,
          pln: payload.pln,
        },
      ];
    }

    case "DELETE_TRANSACTION": {
      return state.filter(
        (singleTransaction) => singleTransaction.id !== payload.id
      );
    }

    case "REFRESH_PLN_PRICE": {
      return state.map((singleTransaction) => ({
        ...singleTransaction,
        pln: singleTransaction.euro * payload.plnPrice,
      }));
    }

    default: {
      return state;
    }
  }
};
