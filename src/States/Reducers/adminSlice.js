import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState: {isAdmin: false},
    reducers: {
        makeAdmin:(state) => {return { ...state, isAdmin: true,}},
        notAdmin:(state) => {return { ...state, isAdmin: false,}},
    }
})



export default adminSlice.reducer
export const {makeAdmin, notAdmin} = adminSlice.actions;