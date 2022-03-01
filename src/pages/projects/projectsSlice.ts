import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export interface ProjectsState {
  githubUsername: string
}

const initialState: ProjectsState = {
  githubUsername: 'pritamprasd',
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateGithubUsername: (state, action: PayloadAction<string>) => {
      state.githubUsername = action.payload
    },
  },
})

export const { updateGithubUsername } = projectsSlice.actions;
export const githubUsername = (state: RootState) => state.projects.githubUsername;

export default projectsSlice