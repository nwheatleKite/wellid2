

export const autoDetectPlates = (inputWells: string[]) => {
    let plates: string[][] = []
    if (inputWells.length === 0) return plates //there are no plates
    plates.push([]) //make first plate
    inputWells.forEach(well => {
        if (well === "") {
            //empty wells can be repeated
            plates[plates.length - 1].push("")
        } else {
            if (plates[plates.length - 1].includes(well)) {
                plates.push([])
            }
            plates[plates.length - 1].push(well)
        }

    })
    return plates
}