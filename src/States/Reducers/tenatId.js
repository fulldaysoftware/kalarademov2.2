import { createSlice } from "@reduxjs/toolkit";

const tenantSlice = createSlice({
  name: "tenant",
  initialState: { tenantID: "" },
  reducers: {
    addTenant: (state, action) => {
      // **Use spread operator to create a new state object**
      return { ...state, tenantID: action.payload };
    },
    removeTenant: () => {
      // Reset to the initial state
      return { tenantID: "" };
    },
  },
});

export default tenantSlice.reducer;
export const { addTenant, removeTenant } = tenantSlice.actions;
