import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import plateSize from "../features/plateSizeSlice"
import isMultiPlates from "../features/isMultiPlateSlice"
import sortWells from "../features/sortWellsSlice"
import showOutput from "../features/showOutput"
import inputWells from '../features/inputWellsSlice';
import wellFormat from "../features/outputWellFormat"
export const store = configureStore({
  reducer: {
    plateSize,
    isMultiPlates,
    sortWells,
    showOutput,
    inputWells,
    wellFormat
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
