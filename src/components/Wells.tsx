import React from 'react'
import AutoPlates from './AutoPlates'
import InputWells from './InputWells'
import IsMultiPlate from './IsMultiplate'
import OutputWells from './OutputWells'
import PlateSize from "./PlateSize"
import RenamePlates from './RenamePlates'
import OutputOptions from "./ShowOutput"
import SortWells from './SortWells'
import WellFormat from './WellFormat'

const Wells = () => {
    return (
        <div className="mainapp">
            <div className="f jcsa aic">
                <div className="fc dmt0">
                    <PlateSize />
                    <IsMultiPlate />
                    <AutoPlates />
                </div>
                <InputWells />
                <OutputWells />
                <div className="fc">
                    <WellFormat />
                    <SortWells />
                    <OutputOptions />
                    <RenamePlates />
                </div>
            </div>
        </div>
    )
}

export default Wells