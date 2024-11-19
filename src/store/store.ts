import { configureStore } from '@reduxjs/toolkit'
import { WalletSlice } from './features/walletSlice'

export const store = configureStore({
    reducer: {
        wallets: WalletSlice.reducer
    },
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch