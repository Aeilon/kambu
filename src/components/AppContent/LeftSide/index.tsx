import React, { useState, useEffect } from "react";
import { Main, Button, Input, LargestAmmountBox, Form } from "./style";
import {
  TransationData,
  ConvertedTransaction,
  ISelector,
} from "../../AppContent/interface";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  refreshPlnPrice,
} from "../../../actions/allTransactionAction";

const LeftSide: React.FC = () => {
  const dispatch = useDispatch();
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  const [transactionData, setTransationData] = useState<TransationData>({
    transactionName: "",
    euro: undefined,
    id: "",
  });

  const allTransactions = useSelector(
    (state: ISelector) => state.allTransactions
  );

  const [highestValue, setHighestValue] = useState<ConvertedTransaction>({
    transactionName: "",
    euro: 0,
    pln: 0,
    id: "",
  });

  const getHighestValue = () => {
    if (allTransactions.length > 0) {
      const highestTransaction = allTransactions.reduce((prev, current) =>
        +prev.euro > +current.euro ? prev : current
      );
      setHighestValue(highestTransaction);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const addTransactionFn = (
    transactionName: string,
    euro: number | undefined,
    plnPrice: number
  ) => {
    if (!euro) return;
    const calculatedPln = euro * plnPrice;

    if (transactionName && euro > 0) {
      dispatch(addTransaction(transactionName, euro, calculatedPln));
      setTransationData({
        transactionName: "",
        euro: 0,
        id: "",
      });
    }
  };

  useEffect(() => {
    getHighestValue();
  }, [allTransactions]);

  useEffect(() => {
    dispatch(refreshPlnPrice(plnPrice));
  }, [plnPrice]);

  return (
    <Main>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addTransactionFn(
            transactionData.transactionName,
            transactionData.euro,
            plnPrice
          );
        }}
      >
        <Input
          type="text"
          id="transactionName"
          placeholder="Transaction name"
          value={transactionData.transactionName}
          onChange={handleOnChange}
        />
        <Input
          type="number"
          min="1"
          id="euro"
          placeholder="Amount in euros"
          value={transactionData.euro}
          onChange={handleOnChange}
        />
        <Button type="submit">ADD TRANSACTION</Button>
      </Form>

      {allTransactions.length > 0 && (
        <>
          <p>The transaction with the largest amount:</p>
          <LargestAmmountBox>
            <div>
              <p>{highestValue.transactionName}</p>
              <p>{` ${Intl.NumberFormat("pl").format(
                highestValue.euro
              )}  €`}</p>
            </div>
            <div>
              <p>{`${Intl.NumberFormat("pl").format(
                Math.round(highestValue.pln * 100) / 100
              )}  PLN`}</p>
            </div>
          </LargestAmmountBox>
        </>
      )}
    </Main>
  );
};

export default LeftSide;
