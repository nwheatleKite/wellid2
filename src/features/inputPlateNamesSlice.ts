import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const inputPlateNamesSlice = createSlice({
    name: 'inputPlateNames',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputPlateNames: (state, action: PayloadAction<string[]>) => {
            let PlateNames = action.payload;
            return PlateNames
        },
    }
});

export const { setInputPlateNames } = inputPlateNamesSlice.actions;

export default inputPlateNamesSlice.reducer;
