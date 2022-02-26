import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface VsCodeEditorState {
  content: string
}

const initialValue = '<></>';
const initialState: VsCodeEditorState = {
  content: initialValue,
}

export const codeEditorSlice = createSlice({
  name: 'vseditor',
  initialState,
  reducers: {
    updateCodeEditorContent: (state, action: PayloadAction<string>) => {
      console.log(`Gonna update: vseditor.content ${action.payload}`)
      state.content = action.payload
    },
  },
})

export const { updateCodeEditorContent } = codeEditorSlice.actions;

export default codeEditorSlice;