import axios, { AxiosResponse } from 'axios';
import { IExpense } from '../configs/types/Expense';

const getExpenses = async () => {
  try {
    return await axios.get('http://localhost:4000/api/expense/getAllExpense');
  } catch (err) {
    console.log(err);
    throw new Error('Failed to retrieve all expense');
  }
};

const addExpense = async (expense: IExpense): Promise<AxiosResponse> => {
  try {
    const result = await axios.post(
      'http://localhost:4000/api/expense/addExpense',
      expense,
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to add expense');
  }
};

export { addExpense };
