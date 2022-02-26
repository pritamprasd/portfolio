import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'


export interface NavbarState {
  opened: boolean;
}

const initialState: NavbarState = {
  opened: false,
}

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    closeNavbar: (state) => {
      console.log('redux: updating state opened: false')
      state.opened = false
    },
    openNavbar: (state) => {
      console.log('redux: updating state opened: true')
      state.opened = true
    },
    toogleNavbar: (state) => {
      console.log('redux: updating state opened: '+ !state.opened)
      state.opened = !state.opened
    },
  },
})

export const { closeNavbar, openNavbar, toogleNavbar} = navbarSlice.actions

export default navbarSlice