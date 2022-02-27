import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { detectLanguage } from '../../../commons/utils';

export interface VsCodeEditorState {
  content: string;
  forceUpdate: boolean;
  editorLang: string;
}

const initialValue = '<></>';
const initialState: VsCodeEditorState = {
  content: initialValue,
  forceUpdate: false,
  editorLang: 'unknown',
}

export const codeEditorSlice = createSlice({
  name: 'vseditor',
  initialState,
  reducers: {
    updateCodeEditorContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    forceUpdateCodeEditorContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.editorLang = detectLanguage(action.payload)
      state.forceUpdate = !state.forceUpdate;
    },
    updateEditorLag: (state,  action: PayloadAction<string>) => {
      state.editorLang = action.payload
    }
  },
})

export const { updateCodeEditorContent, forceUpdateCodeEditorContent, updateEditorLag } = codeEditorSlice.actions;
export const initialEditorValue = initialState.content;
export const initialEditorLang = initialState.editorLang;


export default codeEditorSlice;