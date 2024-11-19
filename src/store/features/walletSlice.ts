import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { IWalletType } from '@/configs/types/Wallet';

// Define a type for the slice state
interface walletsState {
    wallets: IWalletType[]
  }
  
  // Define the initial state using that type
  const initialState: walletsState = {
    wallets: [],
  }

export const WalletSlice = createSlice({
    name:'wallets',
    initialState,
    reducers:{
        setWallets: (state, action: PayloadAction<IWalletType[]>) => {
             state.wallets = action.payload ?? [];
            //  console.log('WALLETS',state.wallets)
        }
    }
})

export default WalletSlice.reducer

export const { setWallets } = WalletSlice.actions