import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 96;

export const plateSizeSlice = createSlice({
  name: 'plateSize',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPlateSize: (state, action: PayloadAction<number>) => {
      let size = action.payload;
      return size
    },
  }
});

export const { setPlateSize } = plateSizeSlice.actions;

export default plateSizeSlice.reducer;
