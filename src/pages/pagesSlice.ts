import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface PagesState {
  visiblePage: string
}

const initialState: PagesState = {
    visiblePage: 'default',
}

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    updateVisiblePage: (state, action: PayloadAction<string>) => {
      console.log('updating state: '+ action.payload)
      state.visiblePage = action.payload
    },
  },
})

export const { updateVisiblePage } = pagesSlice.actions
export const selectVisiblePage = (state: RootState) => state.pages.visiblePage

export default pagesSlice