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

export interface IWalletTransactionType {
  id: '66e10820-65ac-4924-52c0-08dcf07e80ec';
  walletId: string;
  transactionName: string;
  transactionDescription?: string;
  amount: Number;
  transactionDate: Date;
  createdAt: Date;
  isRecurring: boolean;
  transactionType: string;
  transactionCategory: TransactionCategoriesTypes;
  transactionCategoryId: string;
}
