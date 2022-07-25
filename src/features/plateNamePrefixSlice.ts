import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = "plate";

export const inputPlatePrefixSlice = createSlice({
    name: 'inputPlatePrefix',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputPlatePrefix: (state, action: PayloadAction<string>) => {
            let PlatePrefix = action.payload;
            return PlatePrefix
        },
    }
});

export const { setInputPlatePrefix } = inputPlatePrefixSlice.actions;

export default inputPlatePrefixSlice.reducer;
