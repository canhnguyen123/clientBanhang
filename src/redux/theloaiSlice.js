import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theloaiData: [], // Dữ liệu thể loại
};

const theloaiSlice = createSlice({
  name: 'theloai',
  initialState,
  reducers: {
    setTheloaiData: (state, action) => {
      state.theloaiData = action.payload;
    },
  },
});

export const { setTheloaiData } = theloaiSlice.actions;
export const selectTheloaiData = (state) => state.theloai.theloaiData;
export default theloaiSlice.reducer;
