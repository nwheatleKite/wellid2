export const parsePastedWells = (input: string): string[] => {
    let arr = input.split("\n").map(d => d.trim())
    return arr
}