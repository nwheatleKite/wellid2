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
        } else if (value === "plates" && isMultiPlates) {
            dispatch(setIsMultiPlates(false))
        }
    }

    return (
        <div>
            <div
                data-value="plates"
                className={isMultiPlates ? "fsxxl" : "sel"}
                onClick={changeFormat}
            >
                + Plate Names
            </div>
        </div>
    );
};

export default IsMultiPlate;
