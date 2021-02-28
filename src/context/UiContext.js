import React, { createContext, useState } from 'react';
// primero creamos el context
export const UiContext = createContext();

export const UiProvider = ({ children }) => {

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const showMenu = () => {
        setOcultarMenu(false);
    }
    const hideMenu = () => {
        setOcultarMenu(true);
    }
    return (
        <UiContext.Provider value={{
            ocultarMenu,
            showMenu,
            hideMenu
        }} >
            {children}
        </UiContext.Provider>


    )
}
