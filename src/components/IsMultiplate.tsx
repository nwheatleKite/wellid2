import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setIsMultiPlates } from "../features/isMultiPlateSlice";

const IsMultiPlate = () => {
    const dispatch = useAppDispatch();
    const isMultiPlates = useAppSelector((state) => state.isMultiPlates);

    const changeFormat = (e: any) => {
        let value = e.currentTarget.dataset.value;
        if (value === "plates" && !isMultiPlates) {
            dispatch(setIsMultiPlates(true))
        } else if (value === "wells" && isMultiPlates) {
            dispatch(setIsMultiPlates(false))
        }
    }

    return (
        <div>
            <div data-value="wells" className={isMultiPlates ? "" : "border"} onClick={changeFormat}>
                Wells
            </div>
            <div
                data-value="plates"
                className={isMultiPlates ? "border" : ""}
                onClick={changeFormat}
            >
                Plates and Wells
            </div>
        </div>
    );
};

export default IsMultiPlate;
