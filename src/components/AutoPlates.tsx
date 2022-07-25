import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { setInputPlateNames } from "../features/inputPlateNamesSlice";
import { setInputPlateNumber } from "../features/inputPlateNumber";

const AutoPlates = () => {
    // const [plateNumberInput, setPlateNumberInput] = useState<number>(1)
    const dispatch = useAppDispatch();
    const isMultiPlates = useAppSelector((state) => state.isMultiPlates);
    // const plateSize = useAppSelector((state) => state.plateSize);
    // const plateNames = useAppSelector((state) => state.plateNames);
    const inputPlateNumber = useAppSelector(state => state.inputPlateNumber)
    if (!isMultiPlates) return null

    const changePlateNumber = (e: any) => {
        let num = Math.round(+e.target.value)
        dispatch(setInputPlateNumber(num))
    }
    return (
        <div className="button f aic">
            <div>
                <input className="numberInput" type="number" value={inputPlateNumber} min={1} max={100} step={1} onChange={changePlateNumber} />
            </div>
            <div className="ml3 fsxl"> Plates</div>
        </div>
    );
};

export default AutoPlates