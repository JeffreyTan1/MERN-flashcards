import { createSlice } from '@reduxjs/toolkit'

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
      state.user = userStates.LOGGED_IN
      state.value = action.payload
    },
    logoutReducer: (state) => {
      state.user = userStates.LOGGED_OUT
      state.value = null
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer