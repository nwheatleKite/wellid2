import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setPlateSize } from '../features/plateSizeSlice'

export const PlateSize = () => {
    const dispatch = useAppDispatch()
    const plateSize = useAppSelector(state => state.plateSize)
    const inputWells = useAppSelector(state => state.inputWells)

    const changePlateSize = (e: any) => {
        let size = e.currentTarget.dataset.size;
        if (plateSize !== +size) {
            if (inputWells.length) {
                alert("Please Clear wells prior to changing plate size!")
            } else {
                dispatch(setPlateSize(+size))
            }
        }
    }

    return (
        <div>
            <div className="fsxxl">PlateSize</div>
            {[6, 12, 24, 48, 96, 384].map(ps => {
                return (
                    <div
                        className={plateSize === +ps ? "bold" : ""}
                        key={ps}
                        data-size={ps}
                        onClick={changePlateSize}>{ps}</div>)
            })}
        </div>
    )
}
export default PlateSize