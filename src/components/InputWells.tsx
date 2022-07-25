import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setInputWells } from "../features/inputWellsSlice";
import { parsePastedWells } from "../utils/parsePastedWells";
import { plateWeller } from "../utils/PlateWeller";
import { generatePlateNames, getPlatename } from "../utils/generatePlateNames";
import { setInputPlateNames } from "../features/inputPlateNamesSlice";
import { autoDetectPlates } from "../utils/autoDetectPlates";
const InputWells = () => {
    const dispatch = useAppDispatch();
    const inputWells = useAppSelector((state) => state.inputWells);
    const plateNames = useAppSelector((state) => state.plateNames);
    const plateSize = useAppSelector((state) => state.plateSize);
    const isMultiPlates = useAppSelector((state) => state.isMultiPlates);
    const inputPlateNumber = useAppSelector((state) => state.inputPlateNumber);
    const detectedPlateNumber = useAppSelector((state) => state.detectedPlateNumber);
    const platePrefix = useAppSelector((state) => state.plateNamePrefix);
    const plateNamePadding = useAppSelector((state) => state.plateNamePadding);

    const clearWells = () => {
        dispatch(setInputWells([]));
        dispatch(setInputPlateNames([]));

    };

    const autofillWells = () => {
        if (inputWells.length) {
            alert("Please Clear Before Autofilling");
        }
        let plate = plateWeller(plateSize);
        let wells = plate.padded;
        dispatch(setInputWells(wells));
    };

    const pasteWells = (e: any) => {
        navigator.clipboard.readText().then((clipText) => {
            if (clipText.trim() === "") return;
            let wells = parsePastedWells(clipText);
            dispatch(setInputWells(wells));
        });
    };

    const autofillPlateWells = () => {
        if (inputWells.length) {
            alert("Please Clear before Autofilling");
        } else {
            let names = generatePlateNames(platePrefix, plateNamePadding, inputPlateNumber);
            let plateNames: string[] = [];
            let wells: string[] = [];
            let weller = plateWeller(plateSize);
            names.forEach((plateName) => {
                wells.push(...weller.padded);
                plateNames.push(...new Array(plateSize).fill(plateName));
            });
            dispatch(setInputWells(wells));
            dispatch(setInputPlateNames(plateNames));
        }
    };

    const autofillPlates = () => {
        //read wellIDs and infer plate boundaries
        let plates = autoDetectPlates(inputWells)
        let platenames = plates.flatMap((plate, i) => {
            let platesNames = plate.map(d => getPlatename(platePrefix, i + 1, "-", plateNamePadding.length))
            return platesNames
        })
        dispatch(setInputPlateNames(platenames))
    };

    const pastePlates = () => { }

    return (
        <div>
            <div className="f jcc">
                <div className="m10 fc aic">
                    <div className="f jcsb">
                        {isMultiPlates ?
                            <div className="button " onClick={pastePlates}>
                                Paste Plates
                            </div> : null}
                        <div className="button " onClick={pasteWells}>
                            Paste Wells
                        </div>
                    </div>
                    {isMultiPlates ? (
                        <div className="f wellInputContainer">
                            <div className='f jcc'>
                                <div className="mr6">
                                    {plateNames.map((plateName) => (
                                        <div>{plateName}</div>
                                    ))}
                                </div>
                                <div className="ml6">
                                    {inputWells.map((well) => (
                                        <div>{well}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="wellInputContainer">
                            {inputWells.map((well) => (
                                <div>{well}</div>
                            ))}
                        </div>
                    )}


                </div>
                <div className="m10">
                    <div className="button" onClick={clearWells}>
                        Clear
                    </div>
                    {isMultiPlates ? (
                        <div>
                            <div className="button" onClick={autofillPlateWells}>
                                Autofill {inputPlateNumber} x {plateSize}well Plates
                            </div>
                            {!plateNames.length && inputWells.length ?
                                <div className="button" onClick={autofillPlates}>
                                    Autofill Plates
                                </div> : null}
                        </div>
                    ) : (
                        <div className="button" onClick={autofillWells}>
                            Autofill Wells
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputWells;
