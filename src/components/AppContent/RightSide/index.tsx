import React, { useEffect } from "react";
import { Main, Table } from "./style";
import { ISelector } from "../../AppContent/interface";
import deleteButton from "../../../images/delete-button.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTransaction,
  refreshPlnPrice,
} from "../../../actions/allTransactionAction";

const RightSide: React.FC = () => {
  const dispatch = useDispatch();
  const plnPrice = useSelector((state: ISelector) => {
    return state.plnPrice;
  });

  const allTransactions = useSelector(
    (state: ISelector) => state.allTransactions
  );

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

  const deleteTransactionFn = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  useEffect(() => {
    dispatch(refreshPlnPrice(plnPrice));
  }, [plnPrice]);

  return (
    <Main>
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
    </Main>
  );
};

export default RightSide;
