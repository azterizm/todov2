import { createSlice } from '@reduxjs/toolkit';

export const initialState: IUser = {
  _id: '',
  name: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { _id, name, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
    },
    clearUser: state => {
      state._id = '';
      state.name = '';
      state.email = '';
    }
  }
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
