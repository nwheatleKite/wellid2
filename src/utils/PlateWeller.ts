import { PlateWells } from "./PlateWellsClass";

export const plateWeller = (plateSize: number): PlateWells => {

    switch (plateSize) {
        case 6:
            return new PlateWells(["A", "B", "C"], [1, 2, 3])
        case 12:
            return new PlateWells(["A", "B", "C"], [1, 2, 3, 4])
        case 24:
            return new PlateWells(["A", "B", "C", "D",], [1, 2, 3, 4, 5, 6])
        case 48:
            return new PlateWells(["A", "B", "C", "D", "E", "F"], [1, 2, 3, 4, 5, 6, 7, 8])
        case 96:
            return new PlateWells(["A", "B", "C", "D", "E", "F", "G", "H"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        case 384:
            return new PlateWells(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
        default:
            return new PlateWells(["A", "B", "C", "D", "E", "F", "G", "H"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

    }
}

