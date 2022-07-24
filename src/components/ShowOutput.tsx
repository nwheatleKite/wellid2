import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setShowOutput, ShowOutputType } from '../features/showOutput';

export const showOptions: ShowOutputType[] = ["show input wells only", "show missing wells only", "fill in missing wells",];

const ShowOutputOptions = () => {
    const dispatch = useAppDispatch()
    const showOption = useAppSelector(state => state.showOutput)
    const changeShowOption = (e: any) => {
        let value = e.currentTarget.dataset.value;
        if (showOption !== value) {
            dispatch(setShowOutput(value))
        }
    }
    return (
        <div>
            <div className="fsxxl">ShowOutputOptions</div>
            {showOptions.map(show => {
                return <div key={show} data-value={show} onClick={changeShowOption}
                    className={showOption === show ? "bold" : "sel"}>{show}</div>
            })}
        </div>
    )
}

export default ShowOutputOptions