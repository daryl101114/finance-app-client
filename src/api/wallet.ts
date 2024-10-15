import axios, { AxiosResponse } from 'axios';
import { IWalletCreationType } from '@/configs/types/Wallet';

const addWallet = async (wallet: IWalletCreationType) => {
  try {
    await axios.post('https://localhost:7126/api/wallet/createwallet', wallet);
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to add Wallet');
  }
};

const getUserWallets = async (): Promise<AxiosResponse> => {
  return await axios.get('https://localhost:7126/api/wallet');
};

export { addWallet, getUserWallets };
