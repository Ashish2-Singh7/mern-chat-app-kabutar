import React, { createContext, useContext, useState } from "react";

export const SettingsContext = createContext();

export const useSettingsContext = () => {
    return useContext(SettingsContext);
};

export const SettingsContextProvider = ({ children }) => {
    const [showSettings, setShowSettings] = useState(false);

    return <SettingsContext.Provider value={{ showSettings, setShowSettings }}>
        {children}
    </SettingsContext.Provider>
}
