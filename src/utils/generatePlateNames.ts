import { PaddingType } from "../features/plateNamePaddingSlice";

export const generatePlateNames = (prefix: string, padding: PaddingType, numberPlates: number) => {
    let plates = new Array(numberPlates)
        .fill("")
        .map((d, i) => getPlatename(prefix, i + 1, "-", padding.length));
    return plates;
};


export const getPlatename = (prefix: string, suffix: number, separator: string, padding: number) => {
    return `${prefix}${separator}${`${suffix}`.padStart(padding, "0")}`
}