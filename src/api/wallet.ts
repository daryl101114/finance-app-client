import axios, { AxiosResponse } from 'axios';
import { IWalletCreationType } from '@/configs/types/Wallet';

const addWallet = async (wallet: IWalletCreationType) => {
  try {
    await axios.post('https://localhost:7126/api/wallet/createwallet', wallet);
    //   return JSON.parse(JSON.stringify(result));
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to add Wallet');
  }
};

export { addWallet };
