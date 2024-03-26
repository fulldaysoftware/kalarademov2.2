import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './Reducers/sessionSlice';
import adminSlice from './Reducers/adminSlice';
import formSlice from './Reducers/FormSlice';
import tenantSlice from './Reducers/tenatId';
import UserSlice from './Reducers/UserSlice';
import placesSlice from './Reducers/placesSlice';
import hotelDetail from './Reducers/hotelDetail';
import reviewFormSlice from './Reducers/reviewFormReducer';

// import {  } from ''
// saveState.js

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log("some Error", err);
  }
};

// loadState.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();



const rootReducer = combineReducers({
    session: sessionSlice,
    admin: adminSlice,
    form: formSlice,
    tenant: tenantSlice,
    user: UserSlice,
    places: placesSlice,
    hotels: hotelDetail,
    reviewForm: reviewFormSlice,
})
const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
})

store.subscribe(() => {
  saveState(store.getState()); // Save state to localStorage on every Redux store update
});

export default store