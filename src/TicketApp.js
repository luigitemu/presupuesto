import React from 'react'
// import { UiProvider } from './context/UiContext';
import { Provider } from 'react-redux'
// import { RouterPage } from './pages/RouterPage';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';

export const TicketApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

// <UiProvider>
        //     <RouterPage />
        // </UiProvider>