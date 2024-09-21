import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Transaction = {
  id: number;
  total: number;
  transactionName: string;
  transactionType: "income" | "expenses";
  note: undefined | string;
  date: Date;
};

type TransactionState = {
  transactions: Transaction[];
};

type TransactionAction =
  | { type: "INITIAL_TRANSACTION"; payload: Array<Transaction> }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "REMOVE_TRANSACTION"; payload: number };

type TransactionContextValue = {
  state: TransactionState;
  dispatch: React.Dispatch<TransactionAction>;
};

const _storeData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

const _retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    return error;
  }
};

const TransactionContext = createContext<TransactionContextValue | undefined>(
  undefined
);

const initialState: TransactionState = {
  transactions: [],
};

const transactionReducer = (
  state: TransactionState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case "INITIAL_TRANSACTION": {
      return {
        ...state,
        transactions: action.payload.map((x) => ({
          ...x,
          date: new Date(x.date),
        })),
      };
    }
    case "ADD_TRANSACTION": {
      const newTransactions = [...state.transactions, action.payload];
      _storeData("transactions", newTransactions);
      return {
        ...state,
        transactions: newTransactions,
      };
    }
    case "UPDATE_TRANSACTION": {
      const newTransactions = [
        ...state.transactions.filter(
          (transaction) => +transaction.id !== action.payload.id
        ),
        action.payload,
      ];
      _storeData("transactions", newTransactions);
      return {
        ...state,
        transactions: newTransactions,
      };
    }
    case "REMOVE_TRANSACTION": {
      const newTransactions = state.transactions.filter(
        (transaction) => +transaction.id !== +action.payload
      );
      console.log("newTransactions", newTransactions);
      _storeData("transactions", newTransactions);
      return {
        ...state,
        transactions: newTransactions,
      };
    }
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    const setData = async () => {
      const payload =
        ((await _retrieveData("transactions")) as Array<Transaction>) || [];
      dispatch({ type: "INITIAL_TRANSACTION", payload });
    };
    setData();
  }, []);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};
