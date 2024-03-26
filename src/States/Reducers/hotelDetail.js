import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
    name:"hotel",
    initialState: {},
    reducers: {
        addHotel:(state, action) => { return { ...action.payload}},
        removeHotel:(state) => { return { }}
    }
})


export default hotelSlice.reducer
export const {addHotel, removeHotel} = hotelSlice.actions;