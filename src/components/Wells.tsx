import React from 'react'
import InputWells from './InputWells'
import OutputWells from './OutputWells'
import PlateSize from "./PlateSize"
import OutputOptions from "./ShowOutput"
import SortWells from './SortWells'
import WellFormat from './WellFormat'

const Wells = () => {
    return (
        <div className="mainapp">
            <div className="fsxxl">Wells</div>
            <div className="f jcsa aic">
                <PlateSize />
                <InputWells />
                <OutputWells />
                <div className="fc">
                    <WellFormat />
                    <SortWells />
                    <OutputOptions />
                </div>
            </div>
        </div>
    )
}

export default Wells