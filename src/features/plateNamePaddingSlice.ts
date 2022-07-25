import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaddingType = "1" | "01" | "001" | "0001" | "00001"

const initialState = "01" as PaddingType

export const inputPlateNamePaddingSlice = createSlice({
    name: 'inputPlateNamePadding',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputPlateNamePadding: (state, action: PayloadAction<PaddingType>) => {
            let PlateNamePadding = action.payload;
            return PlateNamePadding
        },
    }
});

export const { setInputPlateNamePadding } = inputPlateNamePaddingSlice.actions;

export default inputPlateNamePaddingSlice.reducer;
