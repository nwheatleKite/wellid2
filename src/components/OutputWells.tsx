import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WellFormatType } from "../features/outputWellFormat";
import { plateWeller } from "../utils/PlateWeller";
import { reorderWells } from "../utils/reorderWells";

const OutputWells = () => {
    const [outputWells, setOutputWells] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const inputWells = useAppSelector((state) => state.inputWells);
    const wellFormat = useAppSelector((state) => state.wellFormat);
    const plateSize = useAppSelector((state) => state.plateSize);
    const sortWells = useAppSelector((state) => state.sortWells);

    useEffect(() => {
        let weller = plateWeller(plateSize);
        let detectedFormat = weller.detectWellFormat(inputWells) as WellFormatType;
        let sortedWells = reorderWells(inputWells, detectedFormat, sortWells, weller);
        let formattedWells = weller.arrayToFrom(wellFormat, detectedFormat, sortedWells);
        setOutputWells(formattedWells);
    }, [inputWells, wellFormat, sortWells, plateSize]);


    const copyWells = () => {
        navigator.clipboard.writeText(outputWells.join("\n"))
    }
    return (
        <div>
            <div className="m10 fc aic">
                <div className="button" onClick={copyWells}>Copy</div>
                <div className="wellInputContainer">
                    {outputWells.map((well) => {
                        return <div>{well}</div>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default OutputWells;
