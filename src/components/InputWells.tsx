import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setInputWells } from "../features/inputWellsSlice";
import { parsePastedWells } from "../utils/parsePastedWells";
import { plateWeller } from "../utils/PlateWeller";
import Wells from "./Wells";

const InputWells = () => {
    const dispatch = useAppDispatch();
    const inputWells = useAppSelector((state) => state.inputWells);
    const plateSize = useAppSelector((state) => state.plateSize);

    const clearWells = () => {
        dispatch(setInputWells([]));
    };

    const autofillWells = () => {
        let plate = plateWeller(plateSize);
        let wells = plate.padded;
        dispatch(setInputWells(wells));
    };

    const pasteWells = (e: any) => {
        navigator.clipboard.readText().then(
            (clipText) => {
                if (clipText.trim() === "") return
                let wells = parsePastedWells(clipText)
                dispatch(setInputWells(wells))
            });
    }



    return (
        <div>
            <div className="f jcc">
                <div className="m10 fc aic">
                    <div className="button" onClick={pasteWells}>Paste</div>
                    <div className="wellInputContainer">
                        {inputWells.map((well) => (
                            <div>{well}</div>
                        ))}
                    </div>
                </div>
                <div className="m10">
                    <div className="button" onClick={clearWells}>
                        Clear
                    </div>
                    <div className="button" onClick={autofillWells}>
                        Autofill Wells
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputWells;
