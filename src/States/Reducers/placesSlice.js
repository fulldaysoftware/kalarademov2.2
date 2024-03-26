import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
    name:"place",
    initialState: [],
    reducers: {
        addPlace:(state, action) => { return [ ...action.payload]},
        removePlace:(state) => { return []}
    }
})


export default placeSlice.reducer
export const {addPlace, removePlace} = placeSlice.actions;