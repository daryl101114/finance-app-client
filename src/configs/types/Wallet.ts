export interface IWalletCreationType {
  accountName: string;
  walletTypeId: number;
  balance: number;
  currency: string;
  emoji: string;
}

export interface IWalletType {
  id: string;
  accountName: string;
  accountType: string;
  balance: number;
  currency: string;
  emoji: string;
}
