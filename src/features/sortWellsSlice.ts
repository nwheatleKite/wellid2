import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortWellType = "A1 A2" | "A1 A10" | "A1 B1" | "1 10" | "unsorted"

const initialState = "unsorted" as SortWellType;

export const wellSortSlice = createSlice({
    name: 'wellSort',
    initialState,
    reducers: {
        setSortWells: (state, action: PayloadAction<SortWellType>) => {
            let sortMethod = action.payload;
            return sortMethod
        },
    }
});

export const { setSortWells } = wellSortSlice.actions;

export default wellSortSlice.reducer;
