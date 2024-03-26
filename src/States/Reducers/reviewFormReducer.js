import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tenantId: "",
  branchId: "",
  formElements: [],
};

const reviewFormSlice = createSlice({
  name: 'reviewForm',
  initialState,
  reducers: {
    addFormElement: (state, action) => {
        return [...action.payload.formElements]
    },
    addBranchID: (state, action) => {
        return [...action.payload.formElements]
    },
    addFormElement: (state, action) => {
        return [...action.payload.formElements]
    },
    emptyForm: (state) => {
      state.tenantId = "";
      state.branchId = "";
      state.formElements = [];
    },
  },
});

export const { addFormElement, emptyForm } = reviewFormSlice.actions;
export default reviewFormSlice.reducer;
