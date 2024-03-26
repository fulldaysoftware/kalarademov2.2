import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name:"session",
    initialState: {loggedin: false},
    reducers: {
        login:(state) => { return { ...state, loggedin: true,}},
        logout:(state) => { return { ...state, loggedin: false,}}
    }
})


export default sessionSlice.reducer
export const {login, logout} = sessionSlice.actions;