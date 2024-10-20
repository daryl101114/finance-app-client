import axios, { AxiosResponse } from 'axios';
import { TransactionCategoriesTypes } from '@/configs/types/Transaction';
import { ITransaction } from '@/configs/types/Transaction';

export const getTransactionCategories = async (): Promise<
  TransactionCategoriesTypes[]
> => {
  console.log('API REQUEST');
  const res = await axios.get(
    'https://localhost:7126/api/transaction/transactioncategories',
  );
  return res.data || [];
};

export const addTransaction = async (transaction: ITransaction) => {
  await axios.post(
    'https://localhost:7126/api/transaction/createTransaction',
    transaction,
  );
};
