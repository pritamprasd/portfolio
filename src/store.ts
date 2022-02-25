import { configureStore } from '@reduxjs/toolkit'
import pagesSlice from './pages/pagesSlice'
import navbarSlice from './sidebar/navbarSlice'

export const store = configureStore({
  reducer: {
    pages: pagesSlice.reducer,
    navbar: navbarSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch