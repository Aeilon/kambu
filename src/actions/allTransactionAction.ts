export const addTransaction = (
  transactionName: string,
  euro: number,
  pln: number
) => ({
  type: "ADD_TRANSACTION",
  payload: { transactionName, euro, pln },
});

export const deleteTransaction = (id: string) => ({
  type: "DELETE_TRANSACTION",
  payload: { id },
});

export const refreshPlnPrice = (plnPrice: number) => ({
  type: "REFRESH_PLN_PRICE",
  payload: { plnPrice },
});
