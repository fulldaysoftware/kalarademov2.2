import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const formSlice = createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        addToFormOnce: (state, action) => {
            console.log("Type state", action.payload);
            return [...action.payload];
        },
        addToForm: (state, action) => {
            console.log("Type state", typeof state);
            console.log("Old state", state);
            console.log("New formation", [...state, {...action.payload, ...action.payload.options}]);
            return [...state, {...action.payload}];
        },
        editForm: (state, action) => {
            return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            question: action.payload.question,
            type: action.payload.type,
            required: action.payload.required,
            options: [...action.payload.options] // Create a copy of options array
          };
        }
        return item;
      });
        },
        deleteForm: (state, action) => {
            console.log("from you", action.payload);
            return state.filter(item => item.id !== action.payload.id);
        }
        ,
        removeForm: (state) => {
            return [];
        }
    }
});

export default formSlice.reducer;
export const { addToForm, editForm, deleteForm, addToFormOnce, removeForm } = formSlice.actions;
