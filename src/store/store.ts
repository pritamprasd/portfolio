import { configureStore } from '@reduxjs/toolkit'
import pagesSlice from '../pages/pagesSlice'
import textEditorSlice from '../pages/tools/text-editor/textEditorSlice'
import codeEditorSlice from '../pages/tools/vs-code/vsEditorSlice'
import navbarSlice from '../sidebar/navbarSlice'

export const store = configureStore({
  reducer: {
    pages: pagesSlice.reducer,
    navbar: navbarSlice.reducer,
    texteditor: textEditorSlice.reducer,
    vseditor: codeEditorSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch