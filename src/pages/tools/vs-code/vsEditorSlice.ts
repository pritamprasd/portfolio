import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface VsCodeEditorState {
  content: string;
  forceUpdate: boolean;
}

const initialValue = '<></>';
const initialState: VsCodeEditorState = {
  content: initialValue,
  forceUpdate: false,
}

export const codeEditorSlice = createSlice({
  name: 'vseditor',
  initialState,
  reducers: {
    updateCodeEditorContent: (state, action: PayloadAction<string>) => {
      console.log(`Gonna update: vseditor.content ${action.payload}`)
      state.content = action.payload;
    },
    forceUpdateCodeEditorContent: (state, action: PayloadAction<string>) => {
      console.log(`Gonna force update: vseditor.content ${action.payload}`)
      state.content = action.payload;
      state.forceUpdate = !state.forceUpdate;
    },
  },
})

export const { updateCodeEditorContent, forceUpdateCodeEditorContent } = codeEditorSlice.actions;
export const initialEditorValue = initialState.content;

export default codeEditorSlice;