import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: undefined,
    firstName: undefined,
    lastName: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { token, firstName, lastName } = action.payload;
            state.token = token;
            state.firstName = firstName;
            state.lastName = lastName;

            localStorage.setItem('token', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
        },
        logout(state) {
            state.token = undefined;
            state.firstName = undefined;
            state.lastName = undefined;

            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
        },
        updateUserName(state, action) {
            const { firstName, lastName } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
        },
    }
});

export const { login, logout , updateUserName } = authSlice.actions;
export default authSlice.reducer;
