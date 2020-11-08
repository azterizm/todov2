import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import listReducer from './listSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    list: listReducer
  }
});
