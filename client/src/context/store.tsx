"use client";
import React, { createContext, useState } from 'react'
import { ContextProps } from './interfaces/store.interfaces';

export const GlobalContext = createContext<ContextProps>({
    isLoading: true,
    loadingHandler: (loadingState: boolean): void => {  },
    errorMessage: '',
    errorHandler: (message: string): void => { }
});

type Children = {
    children: React.ReactNode
}

const GlobalContextProvider = ({ children }: Children) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const errorHandler = (message: string): void => setErrorMessage(message);
    const loadingHandler = (loadingState: boolean): void => setIsLoading(loadingState);

  return (
    <GlobalContext.Provider value={{
        isLoading,
        loadingHandler,
        errorMessage,
        errorHandler
    }}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider