export const plnPriceReducer = (
  state = 0,
  action: { type: string; payload: number }
) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_PLN_PRICE": {
      return payload;
    }

    default: {
      return state;
    }
  }
};
