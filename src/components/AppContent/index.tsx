import React, { useState, useEffect } from "react";
import {
  Main,
  LeftSide,
  RightSide,
  Button,
  Input,
  Table,
  LargestAmmountBox,
} from "./style";
import { TransationData, ConvertedTransaction } from "./interface";
import deleteButton from "../../images/delete-button.svg";
import { useSelector, useDispatch } from "react-redux";
import { ISelector } from "./interface";
import {
  addTransaction,
  deleteTransaction,
  refreshPlnPrice,
} from "../../actions/allTransactionAction";

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  const [transactionData, setTransationData] = useState<TransationData>({
    transactionName: "",
    euro: 0,
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

  const getEuroSum = () => {
    return allTransactions.reduce((acc, next) => {
      return acc + next.euro;
    }, 0);
  };

  const getPlnSum = () => {
    return allTransactions.reduce((acc, next) => {
      return acc + next.pln;
    }, 0);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const addTransactionFn = (
    transactionName: string,
    euro: number,
    plnPrice: number
  ) => {
    const calculatedPln = euro * plnPrice;

    if (transactionName && euro > 0) {
      dispatch(addTransaction(transactionName, euro, calculatedPln));
    }
  };

  const deleteTransactionFn = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  useEffect(() => {
    getHighestValue();
  }, [allTransactions]);

  useEffect(() => {
    dispatch(refreshPlnPrice(plnPrice));
  }, [plnPrice]);

  return (
    <Main>
      <LeftSide>
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
        <Button
          onClick={() =>
            addTransactionFn(
              transactionData.transactionName,
              transactionData.euro,
              plnPrice
            )
          }
        >
          ADD TRANSACTION
        </Button>

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
      </LeftSide>
      <RightSide>
        <p>List of all transactions ({allTransactions.length}):</p>
        {allTransactions.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>transaction name</th>
                <th>price in EURO</th>
                <th>price in PLN</th>
              </tr>
            </thead>

            <tbody>
              {allTransactions.map((transaction) => {
                const { transactionName, euro, pln, id } = transaction;
                return (
                  <tr key={id}>
                    <td>{transactionName}</td>
                    <td>{`${Intl.NumberFormat("pl").format(
                      Math.round(euro * 100) / 100
                    )} .-`}</td>
                    <td>
                      {`${Intl.NumberFormat("pl").format(
                        Math.round(pln * 100) / 100
                      )} .-`}
                      <img
                        src={deleteButton}
                        onClick={() => deleteTransactionFn(id)}
                        alt="delete"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td>sum of transactions</td>
                <td>
                  {`${Intl.NumberFormat("pl").format(
                    Math.round(getEuroSum() * 100) / 100
                  )} .-`}
                </td>
                <td>
                  {`${Intl.NumberFormat("pl").format(
                    Math.round(getPlnSum() * 100) / 100
                  )} .-`}
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </RightSide>
    </Main>
  );
};

export default AppContent;
