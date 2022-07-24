import { SortWellType } from "../features/sortWellsSlice"
import { PlateWells } from "./PlateWellsClass"
// import { orderBy } from "lodash"

export const reorderWells = (
    inputWells: string[],
    detectedFormat: string,
    sortWell: SortWellType,
    weller: PlateWells
): string[] => {
    if (sortWell === "unsorted") {
        return inputWells
    } else if (sortWell === "1 10") {
        let numberWells = weller.arrayToFrom("number", detectedFormat, inputWells);
        let sortedNumbers = numberWells.sort()
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, 'number', sortedNumbers)
        return sortedOriginalFormat
    } else if (sortWell === "A1 A10") {
        let unpaddedWells = weller.arrayToFrom("unpadded", detectedFormat, inputWells);
        debugger
        let sortedUnpadded = unpaddedWells.sort()
        debugger
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, 'unpadded', sortedUnpadded)
        return sortedOriginalFormat
    } else if (sortWell === "A1 A2") {
        let numberWells = weller.arrayToFrom("number", detectedFormat, inputWells);
        let sortedNumbers = numberWells.sort((a, b) => +a - +b)
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, 'number', sortedNumbers)
        return sortedOriginalFormat
        // } else if (sortWell === "A1 B1") {
        //     let rows = weller.arrayToFrom('row', detectedFormat, inputWells);
        //     let columns = weller.arrayToFrom('columns', detectedFormat, inputWells);
        //     let objs = rows.map((row, index) => ({ row, col: +columns[index] }))
        //     let sortedObject = orderBy(objs, ['row', 'col'], ['asc', 'asc'])
        //     let unpadded = sortedObject.map(d => `${d.row}${d.col}`)
        //     let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, 'unpadded', unpadded)
        //     return sortedOriginalFormat
    } else {
        throw Error(`Cannot re-order wells by ${sortWell}, only "1 10", "A1 A10", "A1 A2", "A1 B1" or "unsorted"`)
    }
}