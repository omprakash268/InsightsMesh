import { createSlice } from '@reduxjs/toolkit';
import { getUserFromStorage } from '../../utils/utils';



const authSlice = createSlice({
  name: 'auth',
  initialState: getUserFromStorage(),
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userName = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  }
});

export const { login, logout } = authSlice.actions;
export const getUsername = (state) => state.auth;
export const authReducer = authSlice.reducer;
