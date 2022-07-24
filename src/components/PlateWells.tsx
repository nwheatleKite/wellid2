import React from 'react'
import InputPlateWells from "./InputPlateWells"
import OutputPlateWells from "./OutputPlateWells"
import PlateSize from "./PlateSize"
import OutputOptions from "./ShowOutput"
import SortWells from './SortWells'
const PlateWells = () => {
    return (
        <div>
            <div className="fsxxl">PlateWells</div>
            <PlateSize />
            <InputPlateWells />
            <OutputPlateWells />
            <OutputOptions />
            <SortWells />
        </div>
    )
}

export default PlateWells