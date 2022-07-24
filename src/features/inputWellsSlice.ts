import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const inputWellsSlice = createSlice({
    name: 'inputWells',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputWells: (state, action: PayloadAction<string[]>) => {
            let wells = action.payload;
            return wells
        },
    }
});

export const { setInputWells } = inputWellsSlice.actions;

export default inputWellsSlice.reducer;
