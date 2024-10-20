export interface TransactionCategoriesTypes {
  id: string;
  transactionCategoryName: string;
  isFixed: boolean;
}

export interface ITransaction {
  walletId: string;
  transactionName: string;
  transactionDescription: string;
  amount: number;
  transactionDate: Date;
  createdAt: Date;
  isRecurring: boolean;
  transactionType: string;
  transactionCategoryId: string;
}
