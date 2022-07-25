import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 1;

export const inputPlateNumberSlice = createSlice({
    name: 'inputPlateNumber',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputPlateNumber: (state, action: PayloadAction<number>) => {
            let PlateNumber = action.payload;
            return PlateNumber
        },
    }
});

export const { setInputPlateNumber } = inputPlateNumberSlice.actions;

export default inputPlateNumberSlice.reducer;
