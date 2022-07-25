import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import plateSize from "../features/plateSizeSlice"
import isMultiPlates from "../features/isMultiPlateSlice"
import sortWells from "../features/sortWellsSlice"
import showOutput from "../features/showOutput"
import inputWells from '../features/inputWellsSlice';
import wellFormat from "../features/outputWellFormat"
import plateNames from "../features/inputPlateNamesSlice"
import inputPlateNumber from '../features/inputPlateNumber';
import detectedPlateNumber from '../features/detectedPlateNumber';
import plateNamePrefix from "../features/plateNamePrefixSlice"
import plateNamePadding from "../features/plateNamePaddingSlice"
import renamedPlates from '../features/renamedPlatesSlice';
export const store = configureStore({
  reducer: {
    plateSize,
    isMultiPlates,
    sortWells,
    showOutput,
    inputWells,
    wellFormat,
    plateNames,
    inputPlateNumber,
    plateNamePrefix,
    plateNamePadding,
    detectedPlateNumber,
    renamedPlates
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
