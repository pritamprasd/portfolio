import { configureStore } from '@reduxjs/toolkit'
import pagesSlice from './pages/pagesSlice'
import textEditorSlice from './pages/tools/text-editor/textEditorSlice'
import navbarSlice from './sidebar/navbarSlice'

export const store = configureStore({
  reducer: {
    pages: pagesSlice.reducer,
    navbar: navbarSlice.reducer,
    texteditor: textEditorSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch