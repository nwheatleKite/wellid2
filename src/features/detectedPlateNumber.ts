import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 1;

export const detectedPlateNumberSlice = createSlice({
    name: 'detectedPlateNumber',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDetectedPlateNumber: (state, action: PayloadAction<number>) => {
            let PlateNumber = action.payload;
            return PlateNumber
        },
    }
});

export const { setDetectedPlateNumber } = detectedPlateNumberSlice.actions;

export default detectedPlateNumberSlice.reducer;
