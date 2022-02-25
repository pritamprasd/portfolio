import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TextEditorState {
  content: string
}

const initialValue = '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
const initialState: TextEditorState = {
  content: initialValue,
}

export const textEditorSlice = createSlice({
  name: 'texteditor',
  initialState,
  reducers: {
    updateTextEditorContent: (state, action: PayloadAction<string>) => {
      console.log('uuu')
      state.content = action.payload
    },
  },
})

export const { updateTextEditorContent } = textEditorSlice.actions

export default textEditorSlice