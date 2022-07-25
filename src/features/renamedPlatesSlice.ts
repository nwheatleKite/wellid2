import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RenamedPlatesType = Record<string, string>

const initialState: RenamedPlatesType = {};

export const renamedPlatesSlice = createSlice({
    name: 'renamedPlates',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setRenamedPlates: (state, action: PayloadAction<RenamedPlatesType>) => {
            let renamedPlates = action.payload;
            return renamedPlates
        },
    }
});

export const { setRenamedPlates } = renamedPlatesSlice.actions;

export default renamedPlatesSlice.reducer;
