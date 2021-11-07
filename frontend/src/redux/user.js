import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userStates = {
  LOGGED_IN: 'logged in',
  LOGGED_OUT: 'logged_out'
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userStates.LOGGED_OUT
  },
  reducers: {
    loginReducer: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state = userStates.LOGGED_IN
    },
    logoutReducer: (state) => {
      localStorage.setItem('user', null)
      state = userStates.LOGGED_OUT
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer