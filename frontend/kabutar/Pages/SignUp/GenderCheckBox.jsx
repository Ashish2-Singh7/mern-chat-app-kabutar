import React from 'react'

const GenderCheckBox = ({ handleCheckBoxChange, selectedValue }) => {
    return (
        <div className='flex my-2 space-x-2'>
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedValue === "male" ? "selected" : ""}`}>
                    <span className='label-text'>Male</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedValue === "male"}
                        onChange={() => { handleCheckBoxChange("male") }}
                    />
                </label>
            </div>
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedValue === "female" ? "selected" : ""}`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedValue === "female"}
                        onChange={() => { handleCheckBoxChange("female") }}
                    />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckBox
