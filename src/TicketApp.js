import React from 'react'
// import { UiProvider } from './context/UiContext';
import { Provider } from 'react-redux'
import { RouterPage } from './pages/RouterPage';
import { store } from './store/store';

export const TicketApp = () => {
    return (
        <Provider store={store}>
            <RouterPage />
        </Provider>
    )
}

// <UiProvider>
        //     <RouterPage />
        // </UiProvider>