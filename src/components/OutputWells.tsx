import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WellFormatType } from "../features/outputWellFormat";
import { plateWeller } from "../utils/PlateWeller";
import { reorderPlates, reorderWells } from "../utils/reorderWells";

const OutputWells = () => {
    const [outputWells, setOutputWells] = useState<string[]>([]);
    const [outputPlates, setOutputPlates] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const inputWells = useAppSelector((state) => state.inputWells);
    const plateNames = useAppSelector((state) => state.plateNames);
    const wellFormat = useAppSelector((state) => state.wellFormat);
    const plateSize = useAppSelector((state) => state.plateSize);
    const sortWells = useAppSelector((state) => state.sortWells);
    const isMultiPlates = useAppSelector((state) => state.isMultiPlates);
    const renamedPlates = useAppSelector((state) => state.renamedPlates);

    useEffect(() => {
        let weller = plateWeller(plateSize);
        let detectedFormat = weller.detectWellFormat(inputWells) as WellFormatType;
        let sortedWells = reorderWells(inputWells, detectedFormat, sortWells, weller, plateNames);
        let sortedPlates = reorderPlates(inputWells, detectedFormat, sortWells, weller, plateNames);
        let formattedWells = weller.arrayToFrom(wellFormat, detectedFormat, sortedWells);
        setOutputWells(formattedWells);
        let renamedSortedPlates = sortedPlates.map(d => renamedPlates[d])
        setOutputPlates(renamedSortedPlates);

    }, [inputWells, wellFormat, sortWells, plateSize, plateNames, renamedPlates]);


    const copyWells = () => {
        navigator.clipboard.writeText(outputWells.join("\n"))
    }

    const copyNames = () => {
        navigator.clipboard.writeText(outputPlates.join("\n"))

    }
    return (
        <div>
            <div className="m10 fc aic">
                <div className="f jcsb">
                    {isMultiPlates ?
                        <div className="button " onClick={copyNames}>
                            Copy Plates
                        </div> : null}
                    <div className="button " onClick={copyWells}>
                        Copy Wells
                    </div>
                </div>
                {isMultiPlates ? (
                    <div className="f wellInputContainer">
                        <div className='f jcc'>
                            <div className="mr6">
                                {outputPlates.map((plateName) => (
                                    <div>{plateName}</div>
                                ))}
                            </div>
                            <div className="ml6">
                                {outputWells.map((well) => (
                                    <div>{well}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="wellInputContainer">
                        {outputWells.map((well) => (
                            <div>{well}</div>
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
};

export default OutputWells;
