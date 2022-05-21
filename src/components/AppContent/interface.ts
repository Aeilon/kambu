export interface TransationData {
  transactionName: string;
  euro: number;
  id: string;
}

export interface ConvertedTransaction {
  transactionName: string;
  euro: number;
  pln: number;
  id: string;
}

export interface ISelector {
  plnPrice: number;
  allTransactions: ConvertedTransaction[];
}

export interface AllTransactionsPayload {
  transactionName: string;
  euro: number;
  pln: number;
  id: string;
  plnPrice: number;
}
