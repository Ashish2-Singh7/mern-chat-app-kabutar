import React from 'react';
import { IoMdSettings } from "react-icons/io";
import { useSettingsContext } from '../../context/SettingContext';

const SettingButton = () => {
    const { setShowSettings } = useSettingsContext();
    return (
        <div>
            <IoMdSettings
                className='w-6 h-6 text-white cursor-pointer'
                onClick={() => { setShowSettings(true) }}
            />
        </div>
    )
}

export default SettingButton
