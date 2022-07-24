import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ShowOutputType = "show missing wells only" | "fill in missing wells" | "show input wells only"

const initialState = "show input wells only" as ShowOutputType;

export const showOutputSlice = createSlice({
    name: 'showOutput',
    initialState,
    reducers: {
        setShowOutput: (state, action: PayloadAction<ShowOutputType>) => {
            let showOutput = action.payload;
            return showOutput
        },
    }
});

export const { setShowOutput } = showOutputSlice.actions;

export default showOutputSlice.reducer;
