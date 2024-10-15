// export enum AccountTypes {
//     "Cash Account" = 1,
//     "Savings Account" = 2,
//     "Debt Account" = 3,
//     "Asset Account" = 4,
//   }

export const AccountTypes: { [key: string]: number } = {
  'Cash Account': 1,
  'Savings Account': 2,
  'Debt Account': 3,
  'Asset Account': 4,
};

export const WalletIcons: { [key: string]: string } = {
  'Cash Account': 'dollar',
  'Savings Account': 'moneybag',
  'Debt Account': 'credit_card',
  'Asset Account': 'gem',
};
