
import { onlyUnique } from "./onlyUnique"


export const createRenameMap = (plateNames: string[]) => {

    let uniquePlateNames = plateNames.filter(onlyUnique)
    let dict: Record<string, string> = {}

    uniquePlateNames.forEach(platename => {
        dict[platename] = platename
    })
    return dict
}