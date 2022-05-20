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
import { v4 as uuid } from "uuid";
import deleteButton from "../../images/delete-button.svg";
import { useSelector } from "react-redux";
import { ISelector } from "./interface";

const AppContent: React.FC = () => {
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  const [transactionData, setTransationData] = useState<TransationData>({
    transactionName: "",
    euro: 0,
    id: "",
  });

  const [allTransactions, setAllTransactions] = useState<
    ConvertedTransaction[]
  >([]);

  const [highestValue, setHighestValue] = useState<ConvertedTransaction>({
    transactionName: "",
    euro: 0,
    pln: 0,
    id: "",
  });

  const getHighestValue = () => {
    if (allTransactions.length > 0) {
      const highestTransaction = allTransactions.reduce((prev, current) =>
        prev.euro > current.euro ? prev : current
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

  const handleTransactionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransationData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEuroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransationData((prevState) => ({
      ...prevState,
      [e.target.id]: +e.target.value,
    }));
  };

  const addTransaction = () => {
    const { transactionName, euro } = transactionData;

    if (!transactionName || euro === 0) return;

    setAllTransactions((prevState) => [
      ...prevState,
      {
        transactionName,
        euro,
        pln: euro * plnPrice,
        id: uuid(),
      },
    ]);
  };

  const deleteTransaction = (id: string) => {
    setAllTransactions((prevState) =>
      prevState.filter((transaction) => transaction.id !== id)
    );
  };

  useEffect(() => {
    getHighestValue();
  }, [allTransactions]);

  return (
    <Main>
      <LeftSide>
        <Input
          type="text"
          id="transactionName"
          placeholder="Transaction name"
          value={transactionData.transactionName}
          onChange={handleTransactionNameChange}
        />
        <Input
          type="number"
          id="euro"
          placeholder="Amount in euros"
          value={transactionData.euro}
          onChange={handleEuroChange}
        />
        <Button onClick={() => addTransaction()}>ADD TRANSACTION</Button>

        {highestValue.euro > 0 && (
          <>
            <p>The transaction with the largest amount:</p>
            <LargestAmmountBox>
              <div>
                <p>{highestValue.transactionName}</p>
                <p>{` ${Intl.NumberFormat("de").format(
                  highestValue.euro
                )}  €`}</p>
              </div>
              <div>
                <p>{`${Intl.NumberFormat("de").format(
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
                    <td>{`${Intl.NumberFormat("de").format(
                      Math.round(euro * 100) / 100
                    )} .-`}</td>
                    <td>
                      {`${Intl.NumberFormat("de").format(
                        Math.round(pln * 100) / 100
                      )} .-`}
                      <img
                        src={deleteButton}
                        alt="delete"
                        onClick={() => deleteTransaction(id)}
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
                  {`${Intl.NumberFormat("de").format(
                    Math.round(getEuroSum() * 100) / 100
                  )} .-`}
                </td>
                <td>
                  {`${Intl.NumberFormat("de").format(
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
