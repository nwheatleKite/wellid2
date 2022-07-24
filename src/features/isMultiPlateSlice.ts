import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

export const isMultiPlatesSlice = createSlice({
    name: 'isMultiPlates',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setIsMultiPlates: (state, action: PayloadAction<boolean>) => {
            let includePlateIds = action.payload;
            return includePlateIds
        },
    }
});

export const { setIsMultiPlates } = isMultiPlatesSlice.actions;

export default isMultiPlatesSlice.reducer;
