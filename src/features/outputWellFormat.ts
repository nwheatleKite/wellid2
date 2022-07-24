import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type WellFormatType = "padded" | "unpadded" | "number" | "row" | "column"
const initialState = "padded" as WellFormatType

export const wellFormatSlice = createSlice({
    name: 'wellFormat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setWellFormat: (state, action: PayloadAction<WellFormatType>) => {
            let format = action.payload;
            return format
        },
    }
});

export const { setWellFormat } = wellFormatSlice.actions;

export default wellFormatSlice.reducer;
