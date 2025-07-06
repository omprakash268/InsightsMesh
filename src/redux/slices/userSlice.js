import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: 'test@test.com',
    reducers: {
        updateUser: (state, action) => {
            state = action.payload;
            return state;
        }
    }

});


export const { updateUser } = userSlice.actions;
export const getUserName = (state) => state.user;
export const userReducer = userSlice.reducer;