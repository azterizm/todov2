import { createSlice } from '@reduxjs/toolkit';

const initialState: IList = {
  _id: '',
  title: '',
  todos: {
    data: []
  }
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state: IList, action: { payload: IList }) => {
      state = action.payload;
    }
  }
});

export const { addList } = listSlice.actions;

export default listSlice.reducer;
