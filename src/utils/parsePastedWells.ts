export const parsePastedWells = (input: string): string[] => {
    let arr = input.split("\n").map(d => d.trim())
    arr = arr[arr.length - 1] === "" ? arr.slice(0, arr.length - 1) : arr
    return arr
}