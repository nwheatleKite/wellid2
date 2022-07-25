import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WellFormatType, setWellFormat } from "../features/outputWellFormat";

export const formats: WellFormatType[] = ["padded", "unpadded", "number", "row", "column"];

const WellFormat = () => {
    const dispatch = useAppDispatch();
    const wellFormat = useAppSelector((state) => state.wellFormat);

    const changeWellFormat = (e: any) => {
        let value = e.currentTarget.dataset.value;
        if (wellFormat !== value) {
            dispatch(setWellFormat(value));
        }
    };
    return (
        <div>
            <div className="fsxxl">WellFormat</div>
            {formats.map((format) => {
                return (
                    <div
                        key={format}
                        data-value={format}
                        onClick={changeWellFormat}
                        className={wellFormat === format ? "bold" : "sel"}
                    >
                        {format}
                    </div>
                );
            })}
        </div>
    );
};

export default WellFormat;
