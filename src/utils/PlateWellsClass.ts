const wellNotFoundError = (well: any, plate: any): string => {
  if (well === "") {
    return `Well ID was an empty string!`;
  }
  if (well === null) {
    return `Well ID provided is null!`;
  }
  if (well === "undefined") {
    return `Well ID provided is undefined!`;
  }
  return `No ${well} on ${plate}-well plate exists!`;
};

export class PlateWells {
  size: number;
  unpadded: string[];
  padded: string[];
  number: number[];
  numberString: string[];
  extendedRows: string[];
  extendedColumnNumbers: number[];
  extendedColumnStrings: string[];
  uniqueRows: string[];
  uniqueColNumbers: number[];
  uniqueColStrings: string[];
  constructor(uniqueRows: string[], uniqueColNumbers: number[]) {
    this.size = uniqueRows.length * uniqueColNumbers.length;
    this.uniqueRows = uniqueRows.map((d) => d.toUpperCase());
    this.uniqueColNumbers = uniqueColNumbers;
    this.uniqueColStrings = uniqueColNumbers.map((d) => `${d}`);
    this.unpadded = createUnpaddedWells(uniqueRows, uniqueColNumbers);
    this.padded = createPaddedWells(uniqueRows, uniqueColNumbers);
    this.number = createNumberWells(uniqueRows, uniqueColNumbers);
    this.numberString = createNumberStringWells(uniqueRows, uniqueColNumbers);
    this.extendedColumnNumbers = createExtendedColNumbers(
      uniqueRows,
      uniqueColNumbers
    );
    this.extendedColumnStrings = createExtendedColStrings(
      uniqueRows,
      uniqueColNumbers
    );
    this.extendedRows = createExtendedRows(uniqueRows, uniqueColNumbers);
  }

  detectWellFormat(wells: string[]): string {
    //if they have letters at 0 
    let nonNull = wells
      .filter(d => d && d.length && d !== "").map(d => d.trim().toUpperCase())

    let letterFirst = nonNull
      .every(d => d[0].match(/[A-P]/))

    if (letterFirst) {
      let somePadded = nonNull.some(d => d[1] === "0");
      return somePadded ? "padded" : "unpadded"
    } else {
      return "number"
    }
  }


  arrayToFrom(to: string, from: string, wells: (string | number | null)[]): string[] {
    let stringWells: string[] = wells.map(d => d ? `${d}` : "")
    switch (from) {
      case "number":
        switch (to) {
          case "number":
            return stringWells
          case "padded":
            return this.numberStringArrayPadded(stringWells)
          case "unpadded":
            return this.numberStringArrayUnpadded(stringWells)
          case "row":
            return this.numberStringArrayRow(stringWells)
          case "column":
            return this.numberStringArrayColString(stringWells)
          default:
            throw Error(`'to' must be 'number', 'padded', 'unpadded', 'row' or'column' cannot be '${to}'`)
        }
      case "padded":
        switch (to) {
          case "number":
            return this.paddedArrayNumberString(stringWells)
          case "padded":
            return stringWells
          case "unpadded":
            return this.paddedArrayUnpadded(stringWells)
          case "row":
            return this.paddedArrayRow(stringWells)
          case "column":
            return this.paddedArrayColString(stringWells)
          default:
            throw Error(`'to' must be 'number', 'padded', 'unpadded', 'row' or'column' cannot be '${to}'`)

        }
      case "unpadded":
        switch (to) {
          case "number":
            return this.unpaddedArrayNumberstring(stringWells)
          case "padded":
            return this.unpaddedArrayPadded(stringWells)
          case "unpadded":
            return stringWells
          case "row":
            return this.unpaddedArrayRow(stringWells)
          case "column":
            return this.unpaddedArrayColString(stringWells)
          default:
            throw Error(`'to' must be 'number', 'padded', 'unpadded', 'row' or'column' cannot be '${to}'`)
        }
      default:
        throw Error(`'from' must be 'number', 'padded', 'unpadded', cannot be '${from}'`)
    }


  }

  unpaddedToPadded(well: string): string {
    let res = this.padded[this.unpadded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }
  unpaddedToNumber(well: string): number {
    let res = this.number[this.unpadded.indexOf(well.trim().toUpperCase())];
    if (well === null) {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }
  unpaddedToNumberstring(well: string): string {
    let res =
      this.numberString[this.unpadded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }
  paddedToUnpadded(well: string): string {
    let res = this.unpadded[this.padded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }
  paddedToNumber(well: string): number {
    let res = this.number[this.padded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }
  paddedToNumberString(well: string): string {
    let res = this.numberString[this.padded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToPadded(well: number): string {
    let res = this.padded[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToUnpadded(well: number): string {
    let res = this.unpadded[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToNumberString(well: number): string {
    let res = this.numberString[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numbeStringrToPadded(well: string): string {
    let res = this.padded[this.numberString.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToUnpadded(well: string): string {
    let res =
      this.unpadded[this.numberString.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToPadded(well: string): string {
    let res =
      this.padded[this.numberString.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToNumber(well: string): number {
    let res = this.number[this.numberString.indexOf(well.trim().toUpperCase())];
    //@ts-ignore
    if (well === null || well.trim() === "") {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  paddedToRow(well: string): string {
    let res = this.extendedRows[this.padded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  paddedToColString(well: string): string {
    let res = this.extendedColumnStrings[this.padded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }


  paddedToColNumbers(well: string): number {
    let res = this.extendedColumnNumbers[this.padded.indexOf(well)];
    if (well.trim() === "" || well === null) {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  unpaddedToRow(well: string): string {
    let res =
      this.extendedRows[this.unpadded.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  unpaddedToColNumber(well: string): number {
    let res =
      this.extendedColumnNumbers[
      this.unpadded.indexOf(well.trim().toUpperCase())
      ];
    if (well.trim() === "" || well === null) {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  unpaddedToColString(well: string): string {
    let res =
      this.extendedColumnStrings[
      this.unpadded.indexOf(well.trim().toUpperCase())
      ];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToRow(well: number): string {
    let res = this.extendedRows[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return "";
    }
    //@ts-ignore
    if (well.trim() === "") {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToRow(well: string): string {
    let res =
      this.extendedRows[this.numberString.indexOf(well.trim().toUpperCase())];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToColNumber(well: number): number {
    let res = this.extendedColumnNumbers[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return 0;
    }
    //@ts-ignore
    if (well.trim() === "") {
      return 0;
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToColNumber(well: string): number {
    let res =
      this.extendedColumnNumbers[
      this.numberString.indexOf(well.trim().toUpperCase())
      ];
    if (well.trim() === "" || well === null) {
      return 0;
    }

    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberToColString(well: number): string {
    let res = this.extendedColumnStrings[this.number.indexOf(well)];
    //@ts-ignore
    if (well === 0 || well === null || well.trim() === "") {
      return "";
    }

    //@ts-ignore
    if (well.trim() === "") {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  numberStringToColString(well: string): string {
    let res =
      this.extendedColumnStrings[
      this.numberString.indexOf(well.trim().toUpperCase())
      ];
    if (well.trim() === "" || well === null) {
      return "";
    }
    if (res == null) {
      throw Error(wellNotFoundError(well, this.size));
    }
    return res;
  }

  unpaddedArrayPadded(wells: string[]): string[] {
    let res = wells.map((well) => this.unpaddedToPadded(well));
    return res;
  }

  unpaddedArrayNumber(wells: string[]): number[] {
    let res = wells.map((well) => this.unpaddedToNumber(well));
    return res;
  }
  unpaddedArrayNumberstring(wells: string[]): string[] {
    let res = wells.map((well) => this.unpaddedToNumberstring(well));
    return res;
  }
  paddedArrayUnpadded(wells: string[]): string[] {
    let res = wells.map((well) => this.paddedToUnpadded(well));
    return res;
  }
  paddedArrayNumber(wells: string[]): number[] {
    let res = wells.map((well) => this.paddedToNumber(well));
    return res;
  }
  paddedArrayNumberString(wells: string[]): string[] {
    let res = wells.map((well) => this.paddedToNumberString(well));
    return res;
  }

  numberArrayPadded(wells: number[]): string[] {
    let res = wells.map((well) => this.numberToPadded(well));
    return res;
  }

  numberArrayUnpadded(wells: number[]): string[] {
    let res = wells.map((well) => this.numberToUnpadded(well));
    return res;
  }

  numberArrayNumberString(wells: number[]): string[] {
    let res = wells.map((well) => this.numberToNumberString(well));
    return res;
  }

  numbeStringrArrayPadded(wells: string[]): string[] {
    let res = wells.map((well) => this.numbeStringrToPadded(well));
    return res;
  }

  numberStringArrayUnpadded(wells: string[]): string[] {
    let res = wells.map((well) => this.numberStringToUnpadded(well));
    return res;
  }
  numberStringArrayPadded(wells: string[]): string[] {
    let res = wells.map((well) => this.numberStringToPadded(well));
    return res;
  }

  numberStringArrayNumber(wells: string[]): number[] {
    let res = wells.map((well) => this.numberStringToNumber(well));
    return res;
  }

  paddedArrayRow(wells: string[]): string[] {
    let res = wells.map((well) => this.paddedToRow(well));
    return res;
  }
  paddedArrayColString(wells: string[]): string[] {
    let res = wells.map((well) => this.paddedToColString(well));
    return res;
  }
  unpaddedArrayRow(wells: string[]): string[] {
    let res = wells.map((well) => this.unpaddedToRow(well));
    return res;
  }

  unpaddedArrayColNumber(wells: string[]): number[] {
    let res = wells.map((well) => this.unpaddedToColNumber(well));
    return res;
  }



  unpaddedArrayColString(wells: string[]): string[] {
    let res = wells.map((well) => this.unpaddedToColString(well));
    return res;
  }

  numberArrayRow(wells: number[]): string[] {
    let res = wells.map((well) => this.numberToRow(well));
    return res;
  }

  numberStringArrayRow(wells: string[]): string[] {
    let res = wells.map((well) => this.numberStringToRow(well));
    return res;
  }

  numberArrayColNumber(wells: number[]): number[] {
    let res = wells.map((well) => this.numberToColNumber(well));
    return res;
  }

  numberStringArrayColNumber(wells: string[]): number[] {
    let res = wells.map((well) => this.numberStringToColNumber(well));
    return res;
  }

  numberArrayColString(wells: number[]): string[] {
    let res = wells.map((well) => this.numberToColString(well));
    return res;
  }

  numberStringArrayColString(wells: string[]): string[] {
    let res = wells.map((well) => this.numberStringToColString(well));
    return res;
  }
}

function unpaddedToPaddedGeneric(well: string): string {
  //if row has AA or AB for very large plate
  let hasTwoRowLetters = well.match(/^[a-zA-Z]{2}/);
  let row: string;
  let colNum: number;
  if (hasTwoRowLetters) {
    row = well.slice(0, 2);
    colNum = +well.slice(2);
  } else {
    row = well.slice(0, 1);
    colNum = +well.slice(1);
  }
  return `${row}${colNum}`;
}

function createExtendedRows(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): string[] {
  return uniqueRows.flatMap((row) => uniqueColNumbers.map((col) => row));
}

function createExtendedColNumbers(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): number[] {
  return uniqueRows.flatMap((row) => uniqueColNumbers.map((col) => col));
}

function createExtendedColStrings(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): string[] {
  return uniqueRows.flatMap((row) => uniqueColNumbers.map((col) => `${col}`));
}
function createUnpaddedWells(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): string[] {
  return uniqueRows.flatMap((row) =>
    uniqueColNumbers.map((col) => `${row}${col}`)
  );
}

function createPaddedWells(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): string[] {
  return uniqueRows.flatMap((row) =>
    uniqueColNumbers.map((col) => {
      return col < 10 ? `${row}0${col}` : `${row}${col}`;
    })
  );
}

function createNumberWells(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): number[] {
  let lastWell = uniqueRows.length * uniqueColNumbers.length;
  return new Array(lastWell).fill(1).map((d, i) => i + 1);
}

function createNumberStringWells(
  uniqueRows: string[],
  uniqueColNumbers: number[]
): string[] {
  let lastWell = uniqueRows.length * uniqueColNumbers.length;
  return new Array(lastWell).fill(1).map((d, i) => `${i + 1}`);
}


// const isSpecialNull(val: unknown) {
//     let valtype = typeof val;
//     if (valtype === "string") {
//         if ()
//     }
// }