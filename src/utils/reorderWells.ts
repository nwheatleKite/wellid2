import { SortWellType } from "../features/sortWellsSlice";
import { PlateWells } from "./PlateWellsClass";
import { groups } from "d3-array"
import PlateSize from "../components/PlateSize";

const sortWells = (
    inputWells: string[],
    detectedFormat: string,
    sortWell: SortWellType,
    weller: PlateWells
): string[] => {
    if (sortWell === "unsorted") {
        return inputWells;
    } else if (sortWell === "1 10") {
        let numberWells = weller.arrayToFrom("number", detectedFormat, inputWells);
        let sortedNumbers = numberWells.sort();
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, "number", sortedNumbers);
        return sortedOriginalFormat;
    } else if (sortWell === "A1 A10") {
        let unpaddedWells = weller.arrayToFrom("unpadded", detectedFormat, inputWells);
        let sortedUnpadded = unpaddedWells.sort();
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, "unpadded", sortedUnpadded);
        return sortedOriginalFormat;
    } else if (sortWell === "A1 A2") {
        let numberWells = weller.arrayToFrom("number", detectedFormat, inputWells);
        let sortedNumbers = numberWells.sort((a, b) => +a - +b);
        let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, "number", sortedNumbers);
        return sortedOriginalFormat;
        // } else if (sortWell === "A1 B1") {
        //     let rows = weller.arrayToFrom('row', detectedFormat, inputWells);
        //     let columns = weller.arrayToFrom('columns', detectedFormat, inputWells);
        //     let objs = rows.map((row, index) => ({ row, col: +columns[index] }))
        //     let sortedObject = orderBy(objs, ['row', 'col'], ['asc', 'asc'])
        //     let unpadded = sortedObject.map(d => `${d.row}${d.col}`)
        //     let sortedOriginalFormat = weller.arrayToFrom(detectedFormat, 'unpadded', unpadded)
        //     return sortedOriginalFormat
    } else {
        throw Error(
            `Cannot re-order wells by ${sortWell}, only "1 10", "A1 A10", "A1 A2", "A1 B1" or "unsorted"`
        );
    }
};

export const reorderWells = (
    inputWells: string[],
    detectedFormat: string,
    sortWell: SortWellType,
    weller: PlateWells,
    plateNames: string[] = []
): string[] => {
    if (plateNames.length <= 1 || sortWell === "unsorted") {
        let sortedWells = sortWells(inputWells, detectedFormat, sortWell, weller)
        return sortedWells

    } else {
        let platewells = plateNames.map((platename, index) => ({ plate: platename, well: inputWells[index] }))
        let orderedPlateWells = groups(platewells, d => d.plate).map(plate => plate[1].map(d => d.well));
        let sortedPlate = orderedPlateWells.flatMap(d => sortWells(d, detectedFormat, sortWell, weller))
        return sortedPlate
    }
};

export const reorderPlates = (
    inputWells: string[],
    detectedFormat: string,
    sortWell: SortWellType,
    weller: PlateWells,
    plateNames: string[] = []
): string[] => {
    if (plateNames.length === 0) {
        return []
    } else if (sortWell === "unsorted") {
        return plateNames
    } else {
        let platewells = plateNames.map((platename, index) => ({ plate: platename, well: inputWells[index] }))
        let orderedPlates = groups(platewells, d => d.plate).map(plate => plate[1].map(d => d.plate));
        let sortedPlates = orderedPlates.flatMap(plate => plate)
        return sortedPlates
    }


};